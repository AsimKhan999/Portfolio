function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer>
      <div className="footer-content">
        <div className="social-links">
          <a href="https://github.com/AsimKhan999" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/asim-khan-3258bb3a2/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="mailto:iasimkhan2005@gmail.com" className="social-link" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
      
      <div className="copyright">
        <p>
          Developed By: <a href="mailto:iasimkhan2005@gmail.com">Asim Khan</a> | &copy; {currentYear} All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
