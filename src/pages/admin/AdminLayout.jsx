import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getAdminSession, refreshSession, logoutAdmin } from '../../lib/adminAuth';

function AdminLayout() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== 'undefined' && window.innerWidth > 768);

  useEffect(() => {
    (async () => {
      let session = await getAdminSession();
      if (!session) {
        session = await refreshSession().catch(() => null);
      }
      if (!session) {
        navigate('/admin/login', { replace: true });
        return;
      }
      setAuthChecked(true);
    })();
  }, [navigate]);

  useEffect(() => {
    const original = document.title;
    document.title = 'Asim Khan | Dashboard';
    return () => { document.title = original; };
  }, []);

  if (!authChecked) {
    return <div className="admin-page-loading"><i className="fas fa-spinner fa-spin"></i></div>;
  }

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  const links = [
    { to: '/admin', end: true, icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { to: '/admin/projects', icon: 'fas fa-folder-open', label: 'Projects' },
    { to: '/admin/services', icon: 'fas fa-th-large', label: 'Services' },
    { to: '/admin/experience', icon: 'fas fa-briefcase', label: 'Experience' },
    { to: '/admin/faqs', icon: 'fas fa-question-circle', label: 'FAQs' },
    { to: '/admin/tech-stack', icon: 'fas fa-layer-group', label: 'Tech Stack' },
    { to: '/admin/education', icon: 'fas fa-graduation-cap', label: 'Education' },
    { to: '/admin/messages', icon: 'fas fa-envelope-open-text', label: 'Messages' },
    { to: '/admin/settings', icon: 'fas fa-cog', label: 'Site Settings' },
  ];

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="admin-close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
          <i className="fas fa-times"></i>
        </button>
        <div className="admin-brand">
          <img src="/favicon 2.png" alt="Asim Khan" className="admin-brand-logo" />
        </div>      

        <nav className="admin-nav">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <i className={link.icon}></i>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)}></div>}

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-icon-btn admin-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
            <i className="fas fa-bars"></i>
          </button>
          <div className="admin-topbar-actions">
            <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost admin-topbar-btn">
              <i className="fas fa-external-link-alt"></i> View Site
            </a>
            <button className="btn admin-topbar-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
