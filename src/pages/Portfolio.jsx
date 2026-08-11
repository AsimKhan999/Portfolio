import { useState } from 'react';
import Projects from '../components/Projects';
import { useSiteData } from '../context/SiteDataContext';

function Portfolio() {
  const [openFaq, setOpenFaq] = useState(null);
  const { data, loading } = useSiteData();

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const services = data?.services || [];
  const experience = data?.experience || [];
  const faqs = data?.faqs || [];

  if (loading) {
    return (
      <div className="page-container page-transition">
        <Projects />
        <div className="section-title"><h1>My Services</h1></div>
        <section>
          <div className="services-grid">
            {[1, 2, 3, 4].map(i => (
              <div className="glass-card" key={i} style={{ padding: '2rem' }}>
                <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '12px' }}></div>
                <div className="skeleton" style={{ height: '1.25rem', width: '60%', marginTop: '1rem' }}></div>
                <div className="skeleton" style={{ height: '1rem', width: '100%', marginTop: '1rem' }}></div>
                <div className="skeleton" style={{ height: '1rem', width: '80%', marginTop: '0.5rem' }}></div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-title"><h1>My Experience</h1></div>
        <section>
          <div className="timeline">
            {[1, 2, 3].map(i => (
              <div className="timeline-item" key={i}>
                <div className="timeline-dot"></div>
                <div className="glass-card timeline-content">
                  <div className="skeleton" style={{ height: '1.1rem', width: '55%' }}></div>
                  <div className="skeleton" style={{ height: '1rem', width: '90%', marginTop: '0.75rem' }}></div>
                  <div className="skeleton" style={{ height: '1rem', width: '70%', marginTop: '0.5rem' }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-title"><h1>Frequently Asked Questions</h1></div>
        <section className="faq-container">
          {[1, 2, 3].map(i => (
            <div className="glass-card" key={i} style={{ padding: '1.25rem' }}>
              <div className="skeleton" style={{ height: '1rem', width: '75%' }}></div>
            </div>
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="page-container page-transition">
      <Projects />

      <div className="section-title">
        <h1>My Services</h1>
      </div>

      <section>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className={`glass-card service-card stagger-${(i % 8) + 1}`} key={s.id}>
              <div className="service-icon">
                <i className={s.icon}></i>
              </div>
              <h2>{s.title}</h2>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-title">
        <h1>My Experience</h1>
      </div>

      <section>
        <div className="timeline">
          {experience.map((e, i) => (
            <div className={`timeline-item stagger-${(i % 8) + 1}`} key={e.id}>
              <div className="timeline-dot"></div>
              <div className="glass-card timeline-content">
                <h3>{e.title}</h3>
                <p>{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-title">
        <h1>Frequently Asked Questions</h1>
      </div>

      <section className="faq-container">
        {faqs.map((faq, i) => (
          <div className={`glass-card faq-item stagger-${(i % 8) + 1}`} key={faq.id}>
            <div
              className={`faq-header ${openFaq === faq.id ? 'active-faq' : ''}`}
              onClick={() => toggleFaq(faq.id)}
            >
              {faq.question} <i className="fas fa-chevron-down"></i>
            </div>
            <div className={`faq-data ${openFaq === faq.id ? 'open' : ''}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Portfolio;
