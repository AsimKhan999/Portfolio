import { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';

function Contact() {
  const { data } = useSiteData();
  const settings = data?.settings;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false, message: '' });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: settings?.web3forms_key || "",
          ...formData
        }),
      });
      const result = await response.json();
      if (result.success) {
        try {
          await fetch('/api/contact', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
        } catch (err) {
          // Storing a copy is optional; the email is already sent via web3forms.
          console.warn('Could not store message copy:', err);
        }
        setStatus({ submitting: false, success: true, error: false, message: "Message sent successfully! I'll get back to you soon." });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ submitting: false, success: false, error: true, message: result.message || "Something went wrong." });
      }
    } catch {
      setStatus({ submitting: false, success: false, error: true, message: "Network error. Please try again later." });
    }
  };

  const email = settings?.email || 'iasimkhan2005@gmail.com';
  const location = settings?.location || 'Available for Remote Work';

  return (
    <div className="page-container page-transition">
      <div className="section-title">
        <h1>Contact</h1>
      </div>

      <div className="contact-wrapper">
        <div className="contact-info stagger-1">
          <p>
            Have a project in mind or need help improving your website? I'd be glad to discuss your goals and propose a clear, actionable plan.
          </p>

          <div className="info-item">
            <div className="info-icon"><i className="fas fa-envelope"></i></div>
            <div className="info-text">
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><i className="fas fa-map-marker-alt"></i></div>
            <div className="info-text">
              <span>{location}</span>
            </div>
          </div>
        </div>

        <div className="contact-form-container stagger-2">
          <div className="glass-card contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder=" "
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status.submitting}
                />
                <label htmlFor="name">Your Name</label>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder=" "
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status.submitting}
                />
                <label htmlFor="email">Your Email</label>
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  placeholder=" "
                  required
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status.submitting}
                ></textarea>
                <label htmlFor="message">How can I help?</label>
              </div>

              {status.message && (
                <div style={{
                  padding: '10px',
                  marginBottom: '15px',
                  borderRadius: '6px',
                  backgroundColor: status.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: status.success ? '#10b981' : '#ef4444',
                  border: `1px solid ${status.success ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                }}>
                  {status.message}
                </div>
              )}

              <button type="submit" className="btn" disabled={status.submitting}>
                {status.submitting ? 'Sending...' : 'Send Message'}
                {!status.submitting && <i className="fas fa-paper-plane" style={{ marginLeft: '8px' }}></i>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
