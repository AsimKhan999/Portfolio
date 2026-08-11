import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const { data } = useSiteData();
  const settings = data?.settings;
  const name = settings?.name || 'Asim Khan';
  const email = settings?.email || '';

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${scrolled ? 'scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className="name">
          <h1>{name}<span className="gradient-text">.</span></h1>
        </div>

        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle theme"
          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '1.2rem', cursor: 'pointer', zIndex: 1001 }}
        >
          <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`nav-container ${menuOpen ? 'active' : ''}`}>
        <ul className="menu">
          <li>
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="email">
          <a href={`mailto:${email}`}>
            <i className="fa far fa-envelope"></i> {email}
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
