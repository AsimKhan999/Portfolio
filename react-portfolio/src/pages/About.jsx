import mypic from '../assets/mypic.jpeg';

function About() {
  const techStack = [
    {
      icon: '🌐',
      title: 'Frontend',
      desc: 'Building modern, responsive, and accessible user interfaces with pixel-perfect precision.',
      tags: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive', 'WCAG'],
    },
    {
      icon: '⚛️',
      title: 'React.js',
      desc: 'Component-based UI development with hooks, state management, and React Router for SPAs.',
      tags: ['React', 'JSX', 'Hooks', 'Router', 'Context API'],
    },
    {
      icon: '🟢',
      title: 'Node.js & Express',
      desc: 'Server-side JavaScript for building RESTful APIs, middleware, and backend services.',
      tags: ['Node.js', 'Express', 'REST APIs', 'JWT', 'Middleware'],
    },
    {
      icon: '🍃',
      title: 'MongoDB',
      desc: 'NoSQL database design with Mongoose ODM for flexible, document-based data modeling.',
      tags: ['MongoDB', 'Mongoose', 'Aggregation', 'CRUD'],
    },
    {
      icon: '🐘',
      title: 'PHP',
      desc: 'Server-side scripting for dynamic web pages, form handling, sessions, and logic.',
      tags: ['PHP', 'OOP', 'Sessions', 'File Handling'],
    },
    {
      icon: '🗄️',
      title: 'SQL & MySQL',
      desc: 'Relational database design, complex queries, joins, and data management.',
      tags: ['MySQL', 'SQL', 'Joins', 'Procedures'],
    },
    {
      icon: '🛠️',
      title: 'Tools',
      desc: 'Modern development tools and CSS frameworks for professional-grade development.',
      tags: ['Tailwind', 'Git', 'GitHub', 'Vite', 'npm'],
    },
    {
      icon: '⚡',
      title: 'Performance',
      desc: 'Optimizing web apps for speed, SEO, and reliability through best practices.',
      tags: ['Code Splitting', 'Lazy Loading', 'Caching'],
    },
  ];

  const education = [
    {
      title: 'Computer Science',
      desc: 'Fundamentals of programming, data structures, web technologies, and UI/UX.',
    },
    {
      title: 'Professional Development',
      desc: 'Continuous learning through documentation, courses, and real‑world projects.',
    },
  ];

  return (
    <div className="page-container page-transition">
      <div className="section-title" style={{ marginTop: '50px' }}>
        <h1>About Me</h1>
      </div>

      <section className="about-hero">
        <div className="about-image stagger-1">
          <img src={mypic} alt="Asim Khan" />
        </div>
        <div className="about-text stagger-2">
          <p>
            I am a Full-Stack Developer focused on building fast, accessible, and visually consistent web experiences. I combine clean code with clear design to deliver interfaces that are reliable, maintainable, and user‑friendly across devices.
          </p>
          <p>
            My process is collaborative and transparent: discovery, design, development, and iteration. I value performance, semantics, and long‑term maintainability so your product scales with confidence.
          </p>
          <p>
            I work across the full MERN Stack (MongoDB, Express, React, Node.js), as well as PHP and MySQL, delivering end-to-end solutions from database design to polished frontends.
          </p>
        </div>
      </section>

      <div className="section-title">
        <h1>Tech Stack & Skills</h1>
      </div>

      <section>
        <div className="tech-grid">
          {techStack.map((tech, i) => (
            <div className={`glass-card tech-card stagger-${(i % 8) + 1}`} key={i}>
              <span className="tech-card-icon">{tech.icon}</span>
              <h3>{tech.title}</h3>
              <p>{tech.desc}</p>
              <div className="tech-tags">
                {tech.tags.map((tag, j) => (
                  <span className="tech-tag" key={j}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-title">
        <h1>Education</h1>
      </div>

      <section>
        <div className="timeline">
          {education.map((edu, i) => (
            <div className={`timeline-item stagger-${(i % 8) + 1}`} key={i}>
              <div className="timeline-dot"></div>
              <div className="glass-card timeline-content">
                <h3>{edu.title}</h3>
                <p>{edu.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
