import CrudManager from '../components/CrudManager';

const fields = [
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea', rows: 4 },
];

function ExperienceSection() {
  return (
    <CrudManager
      table="experience"
      title="Experience"
      icon="fas fa-briefcase"
      fields={fields}
      renderSummary={(item) => (
        <div>
          <div className="admin-row-title">{item.title}</div>
          <div className="admin-row-meta">{item.description.slice(0, 90)}...</div>
        </div>
      )}
    />
  );
}

export default ExperienceSection;
