import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Asim's AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: "You are Asim Khan's personal AI assistant. Asim is a Full-Stack Developer specializing in MERN Stack, PHP, and MySQL. Be professional, friendly, and helpful. Answer questions about his skills, experience, and projects based on his portfolio. If you don't know something, suggest they contact Asim via the contact form."
            },
            ...messages,
            userMessage
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      const data = await response.json();
      const assistantMessage = { role: 'assistant', content: data.choices[0].message.content };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again later!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return createPortal(
    <div className="ai-chatbot-container" style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 2000 }}>
      {/* Chat Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="btn"
        style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          padding: '0', 
          fontSize: '1.5rem',
          boxShadow: '0 10px 25px rgba(220, 38, 38, 0.4)',
        }}
      >
        <i className={isOpen ? 'fas fa-times' : 'fas fa-robot'}></i>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="glass-card chat-window" style={{ 
          position: 'absolute', 
          bottom: '80px', 
          right: '0', 
          width: '350px', 
          height: '450px', 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          <div className="chat-header" style={{ padding: '15px', borderBottom: '1px solid var(--glass-border)', background: 'var(--accent-primary)', color: 'white' }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>Asim AI Assistant</h3>
          </div>

          <div className="chat-messages" style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                padding: '10px 15px',
                borderRadius: '15px',
                fontSize: '0.9rem',
                background: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--chat-bubble-bg)',
                color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                border: msg.role === 'user' ? 'none' : '1px solid var(--glass-border)'
              }}>
                {msg.content}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>AI is thinking...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} style={{ padding: '15px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ 
                flex: 1, 
                background: 'var(--chat-bubble-bg)', 
                border: '1px solid var(--glass-border)', 
                borderRadius: '20px', 
                padding: '8px 15px',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <button type="submit" style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '1.2rem' }}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>,
    document.body
  );
}

export default AIChatbot;
