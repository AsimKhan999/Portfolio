import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import logoNew from '../assets/logo_new.png';

function Home() {
  const { data, loading, error } = useSiteData();
  const settings = data?.settings;
  const name = settings?.name?.split(' ')[0] || 'Asim';

  if (error && !data) {
    return (
      <div className="home-container page-transition">
        <div className="hero-content">
          <div className="intro">
            <h1>Something went <span className="gradient-text">wrong</span></h1>
            <p>Could not load site content. Make sure the Supabase schema is set up.</p>
            <div className="admin-alert admin-alert-error" style={{ marginBottom: '1rem' }}>
              {error.message}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !settings) {
    return (
      <div className="home-container page-transition">
        <div className="hero-content">
          <div className="intro">
            <div className="skeleton" style={{ height: '3rem', width: '60%' }}></div>
            <div className="skeleton" style={{ height: '2rem', width: '40%', marginTop: '1rem' }}></div>
            <div className="skeleton" style={{ height: '1rem', width: '90%', marginTop: '1.5rem' }}></div>
            <div className="skeleton" style={{ height: '1rem', width: '70%', marginTop: '0.5rem' }}></div>
            <div className="hero-btns">
              <div className="skeleton" style={{ height: '3rem', width: '140px', borderRadius: '30px' }}></div>
              <div className="skeleton" style={{ height: '3rem', width: '120px', borderRadius: '30px' }}></div>
            </div>
          </div>
          <div className="hero-image">
            <div className="skeleton" style={{ width: '320px', height: '320px', borderRadius: '50%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container page-transition">
      <div className="hero-content">
        <div className="intro">
          <h1>Hi, I'm <span className="gradient-text">{name}</span></h1>
          <div className="typewriter-container">
            <h2>{settings.role || 'Full-Stack Developer'}</h2>
          </div>
          <p>
            {settings.hero_intro}
          </p>
          <div className="hero-btns">
            <Link to="/portfolio" className="btn">View Portfolio</Link>
            <Link to="/contact" className="btn btn-ghost">Contact Me</Link>
          </div>
        </div>

        <div className="hero-image">
          <img src={logoNew} alt={`${name} logo`} className="hero-logo" />
        </div>
      </div>
    </div>
  );
}

export default Home;
