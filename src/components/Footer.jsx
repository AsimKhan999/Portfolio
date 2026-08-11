import { useSiteData } from '../context/SiteDataContext';

function Footer() {
  const currentYear = new Date().getFullYear();
  const { data } = useSiteData();
  const settings = data?.settings;

  const socials = settings?.socials || [];
  const email = settings?.email || 'iasimkhan2005@gmail.com';
  const name = settings?.name || 'Asim Khan';
  const copyright = settings?.copyright || 'All Rights Reserved';

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
          {socials.map((social, i) => (
            <a href={social.url} key={i} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={social.label}>
              <i className={social.icon}></i>
            </a>
          ))}
        </div>

        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>

      <div className="copyright">
        <p>
          Developed By: <a href={`mailto:${email}`}>{name}</a> | &copy; {currentYear} {copyright}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
