import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('Contact: missing server environment configuration.');
    return res.status(500).json({ error: 'Server is not configured.' });
  }

  const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  try {
    const { error } = await admin.from('messages').insert({ name, email, message });
    if (error) throw error;
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact storage failed:', err.message || err);
    return res.status(500).json({ error: 'Could not store the message.' });
  }
}
