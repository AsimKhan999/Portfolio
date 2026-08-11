import { createClient } from '@supabase/supabase-js';

const LOCKOUT_THRESHOLD = 5;
const BASE_LOCKOUT_SECONDS = 30;
const MAX_LOCKOUT_SECONDS = 3600;

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

function lockoutSecondsFor(failCount) {
  if (failCount < LOCKOUT_THRESHOLD) return 0;
  const exponent = failCount - LOCKOUT_THRESHOLD;
  return Math.min(BASE_LOCKOUT_SECONDS * 2 ** exponent, MAX_LOCKOUT_SECONDS);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  const adminEmail = process.env.SUPABASE_ADMIN_EMAIL;
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!expectedUser || !expectedPass || !adminEmail || !supabaseUrl || !serviceKey) {
    console.error('Admin login: missing server environment configuration.');
    return res.status(500).json({ error: 'Server is not configured.' });
  }

  const adminClient = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  const ip = getClientIp(req);
  const now = new Date();

  let attempts;
  try {
    const { data } = await adminClient
      .from('login_attempts')
      .select('*')
      .eq('ip', ip)
      .maybeSingle();
    attempts = data;
  } catch (err) {
    console.error('login_attempts read failed:', err.message || err);
    return res.status(503).json({ error: 'Lockout service unavailable. Contact the site owner.' });
  }

  if (attempts && attempts.lockout_until && new Date(attempts.lockout_until).getTime() > now.getTime()) {
    const retryAfter = Math.max(1, Math.ceil((new Date(attempts.lockout_until).getTime() - now.getTime()) / 1000));
    return res.status(429).json({
      error: `Too many failed attempts. Try again in ${retryAfter}s.`,
      retry_after: retryAfter,
    });
  }

  const userOk = username === expectedUser;
  const passOk = password === expectedPass;

  if (!userOk || !passOk) {
    const failCount = (attempts?.fail_count || 0) + 1;
    const lockSeconds = lockoutSecondsFor(failCount);
    const lockoutUntil = lockSeconds > 0
      ? new Date(now.getTime() + lockSeconds * 1000).toISOString()
      : null;

    try {
      await adminClient.from('login_attempts').upsert(
        { ip, fail_count: failCount, lockout_until: lockoutUntil, updated_at: now.toISOString() },
        { onConflict: 'ip' }
      );
    } catch (err) {
      console.error('login_attempts write failed:', err.message || err);
      return res.status(503).json({ error: 'Lockout service unavailable. Contact the site owner.' });
    }

    if (lockSeconds > 0) {
      return res.status(429).json({
        error: `Too many failed attempts. Try again in ${lockSeconds}s.`,
        retry_after: lockSeconds,
      });
    }

    return res.status(401).json({
      error: 'Invalid username or password.',
      remaining: LOCKOUT_THRESHOLD - failCount,
    });
  }

  try {
    await adminClient.from('login_attempts').delete().eq('ip', ip);
  } catch (err) {
    console.error('login_attempts reset failed:', err.message || err);
  }

  try {
    const { data, error } = await adminClient.auth.signInWithPassword({
      email: adminEmail,
      password: expectedPass,
    });

    if (error) {
      console.error('Admin signInWithPassword failed:', error.message || error);
      return res.status(500).json({ error: 'Unable to create admin session.' });
    }

    return res.status(200).json({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
    });
  } catch (err) {
    console.error('Admin login failed:', err.message || err);
    return res.status(500).json({ error: 'Unable to create admin session.' });
  }
}
