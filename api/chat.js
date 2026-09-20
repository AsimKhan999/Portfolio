export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body || {};
  const groqKey = process.env.GROQ_API_KEY;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages are required.' });
  }

  if (!groqKey) {
    console.error('Chat: missing GROQ_API_KEY server environment variable.');
    return res.status(500).json({ error: 'Server is not configured.' });
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error('Chat: Groq error', groqRes.status, data.error?.message || data);
      return res.status(groqRes.status).json({ error: data.error?.message || 'Upstream error.' });
    }

    return res.status(200).json({ content: data.choices?.[0]?.message?.content || '' });
  } catch (err) {
    console.error('Chat: request failed', err.message || err);
    return res.status(500).json({ error: 'Could not reach the AI service.' });
  }
}