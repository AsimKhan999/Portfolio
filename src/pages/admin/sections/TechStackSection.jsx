import CrudManager from '../components/CrudManager';
import { getTechIcon } from '../../../lib/techIcons';

const fields = [
  { name: 'icon', label: 'Icon', type: 'techicon' },
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
  { name: 'tags', label: 'Tags', type: 'tags' },
];

function TechStackSection() {
  return (
    <CrudManager
      table="tech_stack"
      title="Tech Stack"
      icon="fas fa-layer-group"
      fields={fields}
      renderSummary={(item) => {
        const iconEntry = getTechIcon(item.icon);
        return (
          <div className="admin-row-summary">
            <div className="admin-row-icon">{iconEntry ? <iconEntry.Icon /> : item.icon}</div>
            <div>
              <div className="admin-row-title">{item.title}</div>
              <div className="admin-row-meta">{(item.tags || []).slice(0, 5).join(' · ')}</div>
            </div>
          </div>
        );
      }}
    />
  );
}

export default TechStackSection;
