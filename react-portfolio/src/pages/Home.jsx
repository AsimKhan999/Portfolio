import { Link } from 'react-router-dom';
import logo from '../assets/Logo2.png';

function Home() {
  return (
    <div className="home-container page-transition">
      <div className="hero-content">
        <div className="intro">
          <h1>Hi, I'm <span className="gradient-text">Asim</span></h1>
          <div className="typewriter-container">
            <h2>Full-Stack Developer</h2>
          </div>
          <p>
            I specialize in technologies like HTML, CSS, JavaScript, PHP, MySQL, and the MERN Stack (MongoDB, Express, React, Node.js). My passion lies in building responsive, accessible, and visually appealing websites that provide a seamless user experience.
          </p>
          <div className="hero-btns">
            <Link to="/portfolio" className="btn">View Portfolio</Link>
            <Link to="/contact" className="btn btn-ghost">Contact Me</Link>
          </div>
        </div>
        
        <div className="hero-image">
          <img src={logo} alt="Asim Khan logo" />
        </div>
      </div>
    </div>
  );
}

export default Home;
