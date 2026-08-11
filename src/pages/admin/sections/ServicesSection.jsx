import CrudManager from '../components/CrudManager';

const fields = [
  { name: 'icon', label: 'Icon', type: 'icon' },
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea', rows: 4 },
];

function ServicesSection() {
  return (
    <CrudManager
      table="services"
      title="Services"
      icon="fas fa-th-large"
      fields={fields}
      renderSummary={(item) => (
        <div className="admin-row-summary">
          <div className="admin-row-icon"><i className={item.icon}></i></div>
          <div>
            <div className="admin-row-title">{item.title}</div>
            <div className="admin-row-meta">{item.description.slice(0, 90)}...</div>
          </div>
        </div>
      )}
    />
  );
}

export default ServicesSection;
