import http from 'node:http';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import loginHandler from './login.js';
import contactHandler from './contact.js';

const here = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(here, '../.env');

for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
}

function jsonResponse(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function withHelpers(req, res) {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (body) => jsonResponse(res, res.statusCode, body);
  return { req, res };
}

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  const { req: r, res: w } = withHelpers(req, res);

  if (req.method !== 'POST') {
    return jsonResponse(w, 405, { error: 'Method not allowed' });
  }

  let body = '';
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', async () => {
    try { req.body = body ? JSON.parse(body) : {}; }
    catch { return jsonResponse(w, 400, { error: 'Invalid JSON body.' }); }

    try {
      if (pathname === '/api/login') return await loginHandler(r, w);
      if (pathname === '/api/contact') return await contactHandler(r, w);
      return jsonResponse(w, 404, { error: `Not found: ${pathname}` });
    } catch (err) {
      console.error('Local API error:', err);
      return jsonResponse(w, 500, { error: 'Internal server error.' });
    }
  });
});

const PORT = process.env.PORT || 8787;
server.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
  console.log('Routes: POST /api/login, POST /api/contact');
  console.log(`Env check -> ADMIN_USERNAME: ${process.env.ADMIN_USERNAME ? 'set (' + process.env.ADMIN_USERNAME.length + ' chars)' : 'MISSING'}, ADMIN_PASSWORD: ${process.env.ADMIN_PASSWORD ? 'set (' + process.env.ADMIN_PASSWORD.length + ' chars)' : 'MISSING'}, SERVICE_ROLE_KEY: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? process.env.SUPABASE_SERVICE_ROLE_KEY.length + ' chars' : 'MISSING'}, ADMIN_EMAIL: ${process.env.SUPABASE_ADMIN_EMAIL ? 'set' : 'MISSING'}`);
});
