import { useState, useEffect } from 'react';
import { fetchAll, updateRow, deleteRow } from '../../../lib/api';
import ConfirmDialog from '../components/ConfirmDialog';
import { AdminRowSkeleton } from '../components/LoadingSkeleton';

function MessagesSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAll('messages', { order: { column: 'created_at', ascending: false } });
      setItems(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const data = await fetchAll('messages', { order: { column: 'created_at', ascending: false } });
        setItems(data);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const toggleRead = async (msg) => {
    setItems(prev => prev.map(m => m.id === msg.id ? { ...m, read: !m.read } : m));
    try {
      await updateRow('messages', msg.id, { read: !msg.read });
    } catch (err) {
      load();
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await deleteRow('messages', deleting.id);
      setItems(prev => prev.filter(m => m.id !== deleting.id));
      setDeleting(null);
    } catch (err) {
      setError(err.message);
      setDeleting(null);
    } finally {
      setBusy(false);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleString();
  };

  return (
    <div>
      <div className="admin-section-head">
        <h2><i className="fas fa-envelope-open-text"></i> Messages</h2>
        <button className="btn btn-ghost" onClick={load}><i className="fas fa-sync-alt"></i> Refresh</button>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}
      {loading && <AdminRowSkeleton rows={4} />}

      {!loading && items.length === 0 && (
        <div className="admin-empty"><i className="fas fa-inbox"></i><p>No messages yet.</p></div>
      )}

      <div className="admin-list">
        {items.map(msg => (
          <div className={`glass-card admin-row ${msg.read ? '' : 'admin-row-unread'}`} key={msg.id}>
            <div className="admin-row-main">
              <div className="admin-row-title">
                {msg.name} <span className="admin-row-sub">({msg.email})</span>
                {!msg.read && <span className="admin-unread-dot" title="Unread"></span>}
              </div>
              <div className="admin-row-meta">{formatDate(msg.created_at)}</div>
              <p className="admin-message-text">{msg.message}</p>
            </div>
            <div className="admin-row-actions">
              <button
                className={`admin-icon-btn ${msg.read ? '' : 'admin-icon-accent'}`}
                onClick={() => toggleRead(msg)}
                title={msg.read ? 'Mark as unread' : 'Mark as read'}
              >
                <i className={msg.read ? 'fas fa-envelope-open' : 'fas fa-envelope'}></i>
              </button>
              <button className="admin-icon-btn admin-icon-danger" onClick={() => setDeleting(msg)} title="Delete">
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={!!deleting}
        title="Delete message"
        message={`Delete the message from ${deleting?.name || 'this sender'}?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
        busy={busy}
      />
    </div>
  );
}

export default MessagesSection;
