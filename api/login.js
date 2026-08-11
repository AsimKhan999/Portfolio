import { createClient } from '@supabase/supabase-js';

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

  const userOk = username === expectedUser;
  const passOk = password === expectedPass;

  if (!userOk || !passOk) {
    console.error(`[login] mismatch -> expectedUserLen=${(expectedUser || '').length} expectedPassLen=${(expectedPass || '').length} userOk=${userOk} passOk=${passOk} receivedUserLen=${(username || '').length}`);
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  try {
    const auth = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

    const { data, error } = await auth.auth.signInWithPassword({
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
