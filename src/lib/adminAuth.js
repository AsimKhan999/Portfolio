import { supabase } from './supabaseClient';

export async function loginAdmin(username, password) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const raw = await res.text();
  let parsed = null;
  try { parsed = JSON.parse(raw); } catch { /* not json */ }

  if (!res.ok) {
    const hint = parsed?.error || (raw ? raw.slice(0, 200) : '(empty response)');
    const err = new Error(`Login failed (HTTP ${res.status}): ${hint}`);
    err.status = res.status;
    if (parsed) {
      err.retryAfter = parsed.retry_after;
      err.remaining = parsed.remaining;
    }
    throw err;
  }

  if (!parsed?.access_token) {
    throw new Error(`Login failed: server returned no access_token (HTTP ${res.status}). Raw: ${raw.slice(0, 200)}`);
  }

  const { error } = await supabase.auth.setSession({
    access_token: parsed.access_token,
    refresh_token: parsed.refresh_token,
  });
  if (error) throw new Error('Could not start admin session.');
  return true;
}

export async function getAdminSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function refreshSession() {
  const { data } = await supabase.auth.refreshSession();
  return data.session;
}

export async function logoutAdmin() {
  await supabase.auth.signOut();
}

export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange((_event, session) => callback(session));
}
