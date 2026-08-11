import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="home-container page-transition">
      <div className="hero-content notfound-content">
        <div className="intro notfound-intro">
          <h1 className="notfound-code">404</h1>
          <h2>Page <span className="gradient-text">Not Found</span></h2>
          <p>The page you are looking for doesn't exist or has been moved.</p>
          <div className="hero-btns">
            <Link to="/" className="btn">Back to Home</Link>
            <Link to="/portfolio" className="btn btn-ghost">View Portfolio</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
