import { TECH_ICONS } from '../../../lib/techIcons';

function TechIconPicker({ value, onChange }) {
  return (
    <div className="tech-icon-picker">
      {TECH_ICONS.map(({ key, label, Icon }) => (
        <button
          type="button"
          key={key}
          title={label}
          className={`tech-icon-opt${value === key ? ' selected' : ''}`}
          onClick={() => onChange(key)}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
}

export default TechIconPicker;
