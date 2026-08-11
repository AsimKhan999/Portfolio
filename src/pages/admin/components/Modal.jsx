import { useEffect } from 'react';

function Modal({ title, onClose, children, footer }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-head">
          <h3>{title}</h3>
          <button className="admin-icon-btn" onClick={onClose} aria-label="Close">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="admin-modal-body">
          {children}
        </div>
        {footer && <div className="admin-modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
