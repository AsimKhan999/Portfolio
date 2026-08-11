import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAll } from '../../../lib/api';
import { AdminStatSkeleton } from '../components/LoadingSkeleton';

function Dashboard() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const tables = ['projects', 'services', 'experience', 'faqs', 'tech_stack', 'education'];
        const results = await Promise.all(tables.map(t => fetchAll(t)));
        const messages = await fetchAll('messages');
        const unread = messages.filter(m => !m.read).length;
        const entries = {};
        tables.forEach((t, i) => { entries[t] = results[i].length; });
        entries.messages = messages.length;
        entries.unread = unread;
        setCounts(entries);
      } catch (err) {
        setCounts({ error: err.message });
      }
    })();
  }, []);

  const cards = [
    { label: 'Projects', value: counts?.projects, to: '/admin/projects', icon: 'fas fa-folder-open' },
    { label: 'Services', value: counts?.services, to: '/admin/services', icon: 'fas fa-th-large' },
    { label: 'Experience', value: counts?.experience, to: '/admin/experience', icon: 'fas fa-briefcase' },
    { label: 'FAQs', value: counts?.faqs, to: '/admin/faqs', icon: 'fas fa-question-circle' },
    { label: 'Tech Stack', value: counts?.tech_stack, to: '/admin/tech-stack', icon: 'fas fa-layer-group' },
    { label: 'Education', value: counts?.education, to: '/admin/education', icon: 'fas fa-graduation-cap' },
    { label: 'Messages', value: counts?.messages, to: '/admin/messages', icon: 'fas fa-envelope-open-text', badge: counts?.unread },
  ];

  return (
    <div>
      <div className="admin-section-head">
        <h2><i className="fas fa-tachometer-alt"></i> Dashboard</h2>
      </div>

      {counts?.error && <div className="admin-alert admin-alert-error">{counts.error}</div>}

      {!counts && !counts?.error && <AdminStatSkeleton />}

      {counts && !counts.error && (
      <div className="admin-stat-grid">
        {cards.map(card => (
          <Link to={card.to} className="glass-card admin-stat-card" key={card.label}>
            <div className="admin-stat-icon"><i className={card.icon}></i></div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{card.value}</span>
              <span className="admin-stat-label">{card.label}</span>
            </div>
            {card.badge > 0 && <span className="admin-stat-badge">{card.badge} unread</span>}
          </Link>
        ))}
      </div>
      )}

      <div className="glass-card admin-welcome">
        <h3>Welcome to your dashboard</h3>
        <p>
          Edit any content below and changes appear on your live site instantly. Content is stored in your Supabase
          database no coding required.
        </p>
        <a href="/" target="_blank" rel="noopener noreferrer" className="btn">
          <i className="fas fa-external-link-alt"></i> Open your site
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
