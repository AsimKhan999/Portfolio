import { useState } from 'react';
import Projects from '../components/Projects';

function Portfolio() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const services = [
    {
      icon: 'fab fa-chrome',
      title: 'Web Development',
      desc: 'I build fast, accessible, and scalable websites with clean, modern code. From landing pages to full web apps, I focus on performance, semantics, and a smooth user experience.',
    },
    {
      icon: 'fas fa-cube',
      title: 'Web Design',
      desc: 'Human‑centered interfaces that balance clarity, brand, and conversion. I design pixel‑perfect layouts that feel intuitive on every device.',
    },
    {
      icon: 'fas fa-code',
      title: 'Unique Layouts',
      desc: 'Distinctive layouts that stand out without sacrificing usability. I craft grid‑smart compositions and thoughtful typography for a memorable first impression.',
    },
    {
      icon: 'fas fa-paint-brush',
      title: 'Logo Design',
      desc: 'Memorable marks crafted with strategy, simplicity, and versatility. Your logo will scale beautifully from a favicon to a billboard.',
    },
  ];

  const experience = [
    {
      title: 'Frontend Developer',
      desc: 'I translate designs into performant, accessible interfaces using modern frameworks and standards. My focus is predictable UI, maintainable code, and measurable results.',
    },
    {
      title: 'UI & UX Designer',
      desc: 'I craft user journeys that are clear and purposeful. From wireframes to high‑fidelity prototypes, I design experiences that align user needs with business goals.',
    },
    {
      title: 'Full Stack Developer',
      desc: 'I deliver end‑to‑end solutions, from robust APIs to polished frontends. I prioritize reliability, security, and clean architecture for long‑term sustainability.',
    },
  ];

  const faqs = [
    {
      id: 'contact',
      question: 'How can you contact me?',
      answer: (
        <>
          Email is the quickest way:{' '}
          <a href="mailto:iasimkhan2005@gmail.com" style={{color: 'var(--text-primary)'}}>iasimkhan2005@gmail.com</a>.
          You can also reach out via the contact form or connect on LinkedIn for
          project inquiries and collaborations.
        </>
      ),
    },
    {
      id: 'time',
      question: 'How much time does it take to build a website?',
      answer:
        'Timelines vary by scope. A simple landing page may take 3–5 days, while a custom multi‑page site or web app can take 2–6 weeks. I provide a detailed schedule after a brief requirements call.',
    },
    {
      id: 'guarantee',
      question: 'Do you offer any guarantee on your services?',
      answer:
        'Yes. Every project includes milestone reviews, cross‑browser testing, and a 14‑day post‑launch support window for refinements and bug fixes aligned with the agreed scope.',
    },
  ];

  return (
    <div className="page-container page-transition">
      <Projects />

      <div className="section-title">
        <h1>My Services</h1>
      </div>

      <section>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className={`glass-card service-card stagger-${(i % 8) + 1}`} key={i}>
              <div className="service-icon">
                <i className={s.icon}></i>
              </div>
              <h2>{s.title}</h2>
              <p>{s.desc}</p>
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
            <div className={`timeline-item stagger-${(i % 8) + 1}`} key={i}>
              <div className="timeline-dot"></div>
              <div className="glass-card timeline-content">
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
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
