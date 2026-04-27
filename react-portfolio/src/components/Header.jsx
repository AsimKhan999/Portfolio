import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Handle theme switch
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Handle scroll event for sticky header blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="name">
        <h1>Asim Khan<span className="gradient-text">.</span></h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button 
          onClick={toggleTheme} 
          className="theme-toggle" 
          aria-label="Toggle theme"
          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '1.2rem', cursor: 'pointer', zIndex: 1001 }}
        >
          <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
        </button>

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
          <a href="mailto:iasimkhan2005@gmail.com">
            <i className="fa far fa-envelope"></i> iasimkhan2005@gmail.com
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
