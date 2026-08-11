import { useSiteData } from '../context/SiteDataContext';
import { getTechIcon } from '../lib/techIcons';
import mypic from '../assets/mypic.jpeg';

function About() {
  const { data, loading } = useSiteData();

  const techStack = data?.techStack || [];
  const education = data?.education || [];
  const paragraphs = data?.settings?.about_paragraphs || [];

  if (loading) {
    return (
      <div className="page-container page-transition">
        <div className="section-title" style={{ marginTop: '50px' }}><h1>About Me</h1></div>
        <section className="about-hero">
          <div className="about-image">
            <div className="skeleton" style={{ width: '300px', height: '360px', borderRadius: '16px' }}></div>
          </div>
          <div className="about-text">
            <div className="skeleton" style={{ height: '1rem', width: '100%' }}></div>
            <div className="skeleton" style={{ height: '1rem', width: '100%', marginTop: '0.75rem' }}></div>
            <div className="skeleton" style={{ height: '1rem', width: '75%', marginTop: '0.75rem' }}></div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-container page-transition">
      <div className="section-title" style={{ marginTop: '50px' }}>
        <h1>About Me</h1>
      </div>

      <section className="about-hero">
        <div className="about-image stagger-1">
          <img src={mypic} alt={`${data?.settings?.name || 'Asim Khan'}`} />
        </div>
        <div className="about-text stagger-2">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <div className="section-title">
        <h1>Tech Stack & Skills</h1>
      </div>

      <section>
        <div className="tech-grid">
          {techStack.map((tech, i) => {
            const iconEntry = getTechIcon(tech.icon);
            return (
              <div className={`glass-card tech-card stagger-${(i % 8) + 1}`} key={tech.id}>
                <span className="tech-card-icon">
                  {iconEntry ? <iconEntry.Icon /> : tech.icon}
                </span>
                <h3>{tech.title}</h3>
                <p>{tech.description}</p>
                <div className="tech-tags">
                  {(tech.tags || []).map((tag, j) => (
                    <span className="tech-tag" key={j}>{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="section-title">
        <h1>Education</h1>
      </div>

      <section>
        <div className="timeline">
          {education.map((edu, i) => (
            <div className={`timeline-item stagger-${(i % 8) + 1}`} key={edu.id}>
              <div className="timeline-dot"></div>
              <div className="glass-card timeline-content">
                <h3>{edu.title}</h3>
                <p>{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
