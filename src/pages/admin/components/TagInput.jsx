import { useState } from 'react';

function TagInput({ value, onChange, placeholder = 'Type and press Enter' }) {
  const [draft, setDraft] = useState('');

  const tags = value || [];

  const add = () => {
    const clean = draft.trim();
    if (clean && !tags.includes(clean)) {
      onChange([...tags, clean]);
    }
    setDraft('');
  };

  const remove = (tag) => {
    onChange(tags.filter(t => t !== tag));
  };

  return (
    <div className="admin-tag-input">
      <div className="admin-tags">
        {tags.map(tag => (
          <span className="admin-tag" key={tag}>
            {tag}
            <button type="button" onClick={() => remove(tag)} aria-label={`Remove ${tag}`}>
              <i className="fas fa-times"></i>
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            add();
          } else if (e.key === 'Backspace' && !draft && tags.length) {
            remove(tags[tags.length - 1]);
          }
        }}
        onBlur={add}
        placeholder={placeholder}
        className="admin-input"
      />
    </div>
  );
}

export default TagInput;
