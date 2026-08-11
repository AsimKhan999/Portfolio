import CrudManager from '../components/CrudManager';
import { getPublicImageUrl } from '../../../lib/supabaseClient';

const fields = [
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea', rows: 4 },
  { name: 'image_url', label: 'Project Image', type: 'image' },
  { name: 'image_position', label: 'Image Position', type: 'text', placeholder: 'e.g. center center or center 28%' },
  { name: 'tags', label: 'Tags', type: 'tags' },
  { name: 'demo_url', label: 'Demo URL', type: 'text' },
  { name: 'repo_url', label: 'Code / Repo URL', type: 'text' },
];

function ProjectSummary({ item }) {
  const preview = item.image_url ? getPublicImageUrl(item.image_url) : '';
  return (
    <div className="admin-row-summary">
      {preview && <img src={preview} alt="" />}
      <div>
        <div className="admin-row-title">{item.title}</div>
        <div className="admin-row-meta">
          {(item.tags || []).slice(0, 4).join(' · ') || 'No tags'}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <CrudManager
      table="projects"
      title="Projects"
      icon="fas fa-folder-open"
      fields={fields}
      renderSummary={(item) => <ProjectSummary item={item} />}
    />
  );
}

export default ProjectsSection;
