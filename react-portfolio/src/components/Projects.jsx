function Projects() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with user authentication, product management, shopping cart, and Stripe payment integration.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demoUrl: '#',
      repoUrl: 'https://github.com/AsimKhan999'
    },
    {
      id: 2,
      title: 'Admin Dashboard',
      description: 'A comprehensive analytics dashboard with real-time data visualization, user management, and detailed reporting features.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'PHP', 'MySQL', 'Chart.js'],
      demoUrl: '#',
      repoUrl: 'https://github.com/AsimKhan999'
    },
    {
      id: 3,
      title: 'Social Media App',
      description: 'A responsive social platform allowing users to post content, follow others, and interact through likes and comments in real-time.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['MERN Stack', 'Socket.io', 'Tailwind'],
      demoUrl: '#',
      repoUrl: 'https://github.com/AsimKhan999'
    }
  ];

  return (
    <>
      <div className="section-title">
        <h1>My Projects</h1>
      </div>

      <section>
        <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          {projects.map((project, i) => (
            <div className={`glass-card project-card stagger-${(i % 8) + 1}`} key={project.id} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              
              <div className="project-img-wrapper" style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              <div className="project-content" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>{project.description}</p>
                
                <div className="tech-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {project.tags.map(tag => (
                    <span className="tech-tag" key={tag} style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', border: '1px solid var(--glass-border)' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-links" style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '0.85rem', flex: 1, textAlign: 'center' }}>
                    <i className="fas fa-external-link-alt" style={{ marginRight: '6px' }}></i> Live Demo
                  </a>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '8px 16px', fontSize: '0.85rem', flex: 1, textAlign: 'center' }}>
                    <i className="fab fa-github" style={{ marginRight: '6px' }}></i> Code
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Projects;
