import { useState, useEffect } from 'react';
import { useCrud } from '../hooks/useCrud';
import { useSiteData } from '../../../context/SiteDataContext';
import Modal from './Modal';
import ImagePicker from './ImagePicker';
import TagInput from './TagInput';
import TechIconPicker from './TechIconPicker';
import ConfirmDialog from './ConfirmDialog';
import { AdminRowSkeleton } from './LoadingSkeleton';

function Field({ field, value, onChange }) {
  const common = {
    value: value ?? '',
    onChange: (e) => onChange(e.target.value),
    placeholder: field.placeholder || `Enter ${field.label.toLowerCase()}`,
    className: 'admin-input',
  };

  switch (field.type) {
    case 'textarea':
      return <textarea rows={field.rows || 4} {...common}></textarea>;
    case 'tags':
      return <TagInput value={value || []} onChange={onChange} />;
    case 'techicon':
      return <TechIconPicker value={value || ''} onChange={onChange} />;
    case 'icon':
      return <input {...common} list="icon-options" placeholder="e.g. fas fa-code or 🌐" />;
    case 'image':
      return <ImagePicker value={value || ''} onChange={onChange} label={field.label} />;
    default:
      return <input {...common} />;
  }
}

function CrudManager({ table, fields, title, icon, renderSummary }) {
  const crud = useCrud(table);
  const { refresh } = useSiteData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [deletingBusy, setDeletingBusy] = useState(false);

  const { items, loading, error } = crud;

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const openCreate = () => {
    const initial = {};
    fields.forEach(f => {
      initial[f.name] = f.type === 'tags' ? [] : '';
    });
    setEditing(null);
    setForm(initial);
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...item });
    setFormError('');
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setFormError('');
    try {
      const payload = {};
      fields.forEach(f => { payload[f.name] = form[f.name] ?? ''; });
      if (editing) {
        await crud.update(editing.id, payload);
        setToast('Changes saved.');
      } else {
        await crud.create(payload);
        setToast('Item added.');
      }
      setModalOpen(false);
      refresh();
    } catch (err) {
      setFormError(err.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeletingBusy(true);
    try {
      await crud.remove(deleting.id);
      setToast('Item deleted.');
      setDeleting(null);
      refresh();
    } catch (err) {
      setFormError(err.message || 'Delete failed.');
      setDeleting(null);
    } finally {
      setDeletingBusy(false);
    }
  };

  const handleToggleVisible = async (item) => {
    try {
      const visible = item.is_visible !== false;
      await crud.update(item.id, { is_visible: !visible });
      setToast(visible ? 'Item hidden from the public site.' : 'Item is now visible on the public site.');
      refresh();
    } catch (err) {
      setFormError(err.message || 'Visibility change failed.');
    }
  };

  return (
    <div>
      <div className="admin-section-head">
        <h2><i className={icon}></i> {title}</h2>
        <button className="btn" onClick={openCreate}>
          <i className="fas fa-plus"></i> Add {title.replace(/s$/, '')}
        </button>
      </div>

      {toast && <div className="admin-toast"><i className="fas fa-check-circle"></i> {toast}</div>}

      {loading && <AdminRowSkeleton rows={4} />}

      {error && <div className="admin-alert admin-alert-error">Failed to load: {error.message}</div>}

      {!loading && !error && items.length === 0 && (
        <div className="admin-empty">
          <i className="fas fa-inbox"></i>
          <p>No {title.toLowerCase()} yet. Click "Add" to create one.</p>
        </div>
      )}

      <div className="admin-list">
        {items.map((item, i) => (
          <div className={`glass-card admin-row${item.is_visible === false ? ' admin-row-hidden' : ''}`} key={item.id}>
            <div className="admin-row-main">
              {renderSummary ? renderSummary(item) : (
                <div className="admin-row-title">{item.title || `Item ${i + 1}`}</div>
              )}
            </div>
            <div className="admin-row-actions">
              <button className="admin-icon-btn" onClick={() => crud.move(item.id, -1)} disabled={i === 0} title="Move up">
                <i className="fas fa-chevron-up"></i>
              </button>
              <button className="admin-icon-btn" onClick={() => crud.move(item.id, 1)} disabled={i === items.length - 1} title="Move down">
                <i className="fas fa-chevron-down"></i>
              </button>
              <button
                className={`admin-icon-btn${item.is_visible === false ? ' admin-icon-accent' : ''}`}
                onClick={() => handleToggleVisible(item)}
                title={item.is_visible === false ? 'Show on public site' : 'Hide from public site'}
              >
                <i className={item.is_visible === false ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
              </button>
              <button className="admin-icon-btn" onClick={() => openEdit(item)} title="Edit">
                <i className="fas fa-edit"></i>
              </button>
              <button className="admin-icon-btn admin-icon-danger" onClick={() => setDeleting(item)} title="Delete">
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <Modal
          title={editing ? `Edit ${title.replace(/s$/, '')}` : `Add ${title.replace(/s$/, '')}`}
          onClose={() => setModalOpen(false)}
          footer={null}
        >
          {formError && <div className="admin-alert admin-alert-error">{formError}</div>}
          <div className="admin-form">
            {fields.map(field => (
              <div className="admin-form-group" key={field.name}>
                {field.type !== 'image' && <label className="admin-label">{field.label}</label>}
                <Field field={field} value={form[field.name]} onChange={(v) => setForm(prev => ({ ...prev, [field.name]: v }))} />
              </div>
            ))}
          </div>
          <div className="admin-modal-foot" style={{ padding: '1rem 0 0' }}>
            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn" onClick={handleSave} disabled={saving}>
              {saving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>} Save
            </button>
          </div>
        </Modal>
      )}

      <ConfirmDialog
        open={!!deleting}
        title="Delete item"
        message={`Are you sure you want to delete "${deleting?.title || 'this item'}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
        busy={deletingBusy}
      />

      <datalist id="icon-options">
        <option value="fab fa-chrome" />
        <option value="fas fa-cube" />
        <option value="fas fa-code" />
        <option value="fas fa-paint-brush" />
        <option value="fas fa-rocket" />
        <option value="fas fa-mobile-alt" />
        <option value="fas fa-server" />
        <option value="fas fa-database" />
        <option value="fas fa-lock" />
        <option value="fas fa-cloud" />
      </datalist>
    </div>
  );
}

export default CrudManager;
