import Modal from './Modal';

function ConfirmDialog({ open, title, message, onConfirm, onCancel, busy }) {
  if (!open) return null;

  return (
    <Modal title={title} onClose={onCancel} footer={null}>
      <p className="admin-confirm-text">{message}</p>
      <div className="admin-modal-foot" style={{ padding: '1rem 0 0' }}>
        <button className="btn btn-ghost" onClick={onCancel} disabled={busy}>Cancel</button>
        <button className="btn admin-btn-danger" onClick={onConfirm} disabled={busy}>
          {busy ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-trash-alt"></i>} Delete
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
