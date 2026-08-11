import { useState, useCallback, useEffect } from 'react';
import { fetchAll, insertRow, updateRow, deleteRow } from '../../../lib/api';

const DEFAULT_OPTS = {};

export function useCrud(table, opts = DEFAULT_OPTS) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    fetchAll(table, opts)
      .then((data) => {
        if (!active) return;
        setItems(data);
        setError(null);
      })
      .catch((err) => {
        if (active) setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [table, opts]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAll(table, opts);
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [table, opts]);

  const create = async (payload) => {
    const row = await insertRow(table, { ...payload, sort_order: items.length + 1 });
    setItems(prev => [...prev, row]);
    return row;
  };

  const update = async (id, payload) => {
    const row = await updateRow(table, id, payload);
    setItems(prev => prev.map(item => (item.id === id ? row : item)));
    return row;
  };

  const remove = async (id) => {
    await deleteRow(table, id);
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const move = async (id, dir) => {
    const index = items.findIndex(item => item.id === id);
    const swapIndex = index + dir;
    if (index < 0 || swapIndex < 0 || swapIndex >= items.length) return;

    const next = [...items];
    const a = next[index];
    const b = next[swapIndex];
    [a.sort_order, b.sort_order] = [b.sort_order, a.sort_order];
    next[index] = b;
    next[swapIndex] = a;
    setItems(next);

    await Promise.all([
      updateRow(table, a.id, { sort_order: a.sort_order }),
      updateRow(table, b.id, { sort_order: b.sort_order }),
    ]);
  };

  return { items, loading, error, load, create, update, remove, move };
}
