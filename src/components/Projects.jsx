import { useSiteData } from '../context/SiteDataContext';
import { getPublicImageUrl } from '../lib/supabaseClient';

function Projects() {
  const { data, loading } = useSiteData();
  const projects = data?.projects || [];

  if (loading) {
    return (
      <>
        <div className="section-title">
          <h1>My Projects</h1>
        </div>
        <section>
          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {[1, 2, 3].map(i => (
              <div className="glass-card" key={i} style={{ overflow: 'hidden' }}>
                <div className="skeleton" style={{ width: '100%', aspectRatio: '16/9' }}></div>
                <div style={{ padding: '1.5rem' }}>
                  <div className="skeleton" style={{ height: '1.5rem', width: '70%' }}></div>
                  <div className="skeleton" style={{ height: '1rem', width: '100%', marginTop: '1rem' }}></div>
                  <div className="skeleton" style={{ height: '1rem', width: '80%', marginTop: '0.5rem' }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="section-title">
        <h1>My Projects</h1>
      </div>

      <section>
        <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          {projects.map((project, i) => (
            <div className={`glass-card project-card stagger-${(i % 8) + 1}`} key={project.id} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

              <div className="project-img-wrapper" style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {project.image_url ? (
                  <img
                    src={getPublicImageUrl(project.image_url)}
                    alt={project.title}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: project.image_position || 'center center',
                      transformOrigin: 'center center',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--glass-bg)', color: 'var(--text-secondary)', fontSize: '3rem' }}>
                    <i className="fas fa-code"></i>
                  </div>
                )}
              </div>

              <div className="project-content" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>{project.description}</p>

                <div className="tech-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {(project.tags || []).map(tag => (
                    <span className="tech-tag" key={tag} style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', border: '1px solid var(--glass-border)' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-links" style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '0.85rem', flex: 1, textAlign: 'center' }}>
                    <i className="fas fa-external-link-alt" style={{ marginRight: '6px' }}></i> Live Demo
                  </a>
                  <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '8px 16px', fontSize: '0.85rem', flex: 1, textAlign: 'center' }}>
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
