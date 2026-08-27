import { useRef, useState } from 'react';
import { uploadImage } from '../../../lib/api';
import { getPublicImageUrl } from '../../../lib/supabaseClient';

function ImagePicker({ value, onChange, label = 'Image', bucketHint = 'JPG / PNG / WEBP, up to ~2MB', showUrl = true, hoverActions = false }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const preview = value ? getPublicImageUrl(value) : '';

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const path = await uploadImage(file);
      onChange(path);
    } catch (err) {
      setError(err.message || 'Upload failed. Try again.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="admin-image-picker">
      <label className="admin-label">{label}</label>

      <div className="admin-image-preview">
        {preview ? (
          <img src={preview} alt={label} />
        ) : (
          <div className="admin-image-empty"><i className="fas fa-image"></i></div>
        )}
        {hoverActions && preview && (
          <div className="admin-image-preview-actions">
            <button
              type="button"
              className="admin-icon-btn"
              title="Edit image"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-edit"></i>}
            </button>
            <button
              type="button"
              className="admin-icon-btn admin-icon-danger"
              title="Remove image"
              onClick={() => onChange('')}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        )}
      </div>

      <div className="admin-image-actions">
        <button type="button" className="btn btn-ghost" onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-upload"></i>} Upload
        </button>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
        <span className="admin-hint">{bucketHint}</span>
      </div>

      {showUrl && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="...or paste an image URL"
          className="admin-input"
        />
      )}

      {error && <div className="admin-alert admin-alert-error">{error}</div>}
    </div>
  );
}

export default ImagePicker;
