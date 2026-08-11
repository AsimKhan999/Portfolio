import { useState, useEffect } from 'react';
import { fetchOne, updateRow } from '../../../lib/api';
import { AdminFormSkeleton } from '../components/LoadingSkeleton';

const emptySettings = {
  name: '',
  role: '',
  tagline: '',
  email: '',
  location: '',
  hero_intro: '',
  about_paragraphs: [],
  socials: [],
  web3forms_key: '',
  copyright: '',
};

function SettingsSection() {
  const [form, setForm] = useState(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    (async () => {
      try {
        const row = await fetchOne('site_settings', 1);
        if (row) setForm({ ...emptySettings, ...row });
      } catch (err) {
        setStatus({ type: 'error', message: err.message });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const setSocial = (i, key, value) => {
    const socials = [...(form.socials || [])];
    socials[i] = { ...socials[i], [key]: value };
    set('socials', socials);
  };

  const addSocial = () => {
    set('socials', [...(form.socials || []), { label: '', url: '', icon: 'fab fa-github' }]);
  };

  const removeSocial = (i) => {
    set('socials', (form.socials || []).filter((_, idx) => idx !== i));
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus({ type: '', message: '' });
    try {
      await updateRow('site_settings', 1, form);
      setStatus({ type: 'success', message: 'Settings saved. Your site is updated.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const text = (label, key, opts = {}) => (
    <div className="admin-form-group">
      <label className="admin-label">{label}</label>
      {opts.textarea ? (
        <textarea className="admin-input" rows={opts.rows || 3} value={form[key] || ''} onChange={(e) => set(key, e.target.value)} />
      ) : (
        <input className="admin-input" type={opts.type || 'text'} value={form[key] || ''} onChange={(e) => set(key, e.target.value)} />
      )}
    </div>
  );

  if (loading) {
    return (
      <div>
        <div className="admin-section-head">
          <h2><i className="fas fa-cog"></i> Site Settings</h2>
        </div>
        <div className="glass-card admin-settings-card">
          <AdminFormSkeleton lines={6} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-section-head">
        <h2><i className="fas fa-cog"></i> Site Settings</h2>
        <button className="btn" onClick={handleSave} disabled={saving}>
          {saving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>} Save Changes
        </button>
      </div>

      {status.message && (
        <div className={`admin-alert ${status.type === 'success' ? 'admin-alert-success' : 'admin-alert-error'}`}>
          {status.message}
        </div>
      )}

      <div className="glass-card admin-settings-card">
        <h3>Profile</h3>
        <div className="admin-form admin-form-grid">
          {text('Your Name', 'name')}
          {text('Role / Title', 'role')}
          {text('Tagline', 'tagline')}
          {text('Email', 'email', { type: 'email' })}
          {text('Location / Availability', 'location')}
          {text('Copyright text', 'copyright')}
          {text('Hero intro (home page)', 'hero_intro', { textarea: true, rows: 4 })}
        </div>
      </div>

      <div className="glass-card admin-settings-card">
        <h3>About Paragraphs</h3>
        <p className="admin-hint">One paragraph per line. These appear on the About page.</p>
        <textarea
          className="admin-input"
          rows={6}
          value={(form.about_paragraphs || []).join('\n')}
          onChange={(e) => set('about_paragraphs', e.target.value.split('\n').filter(p => p.trim()))}
        />
      </div>

      <div className="glass-card admin-settings-card">
        <h3>Social Links</h3>
        {(form.socials || []).map((social, i) => (
          <div className="admin-social-row" key={i}>
            <input className="admin-input" placeholder="Label (e.g. GitHub)" value={social.label} onChange={(e) => setSocial(i, 'label', e.target.value)} />
            <input className="admin-input" placeholder="URL" value={social.url} onChange={(e) => setSocial(i, 'url', e.target.value)} />
            <input className="admin-input" placeholder="Icon class (e.g. fab fa-github)" value={social.icon} onChange={(e) => setSocial(i, 'icon', e.target.value)} />
            <button type="button" className="admin-icon-btn admin-icon-danger" onClick={() => removeSocial(i)}><i className="fas fa-trash-alt"></i></button>
          </div>
        ))}
        <button type="button" className="btn btn-ghost" onClick={addSocial}><i className="fas fa-plus"></i> Add Social Link</button>
      </div>

      <div className="glass-card admin-settings-card">
        <h3>Contact Form</h3>
        {text('Web3Forms Access Key', 'web3forms_key')}
        <p className="admin-hint">This key powers the contact form email delivery. Get yours at web3forms.com</p>
      </div>

      <div style={{ textAlign: 'right', marginTop: '1rem' }}>
        <button className="btn" onClick={handleSave} disabled={saving}>
          {saving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>} Save Changes
        </button>
      </div>
    </div>
  );
}

export default SettingsSection;
