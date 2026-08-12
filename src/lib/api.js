import { supabase } from './supabaseClient';

const orderBy = (col = 'sort_order') => ({ column: col, ascending: true });

export const fetchAll = async (table, opts = {}) => {
  let q = supabase.from(table).select('*');
  if (opts.visibleOnly) q = q.eq('is_visible', true);
  if (opts.order) q = q.order(opts.order.column, { ascending: opts.order.ascending ?? true });
  if (opts.eq) q = q.eq(opts.eq.column, opts.eq.value);
  const { data, error } = await q;
  if (error) throw error;
  return data;
};

export const fetchOne = async (table, id) => {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
};

export const insertRow = async (table, payload) => {
  const { data, error } = await supabase.from(table).insert(payload).select().single();
  if (error) throw error;
  return data;
};

export const updateRow = async (table, id, payload) => {
  const { data, error } = await supabase.from(table).update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteRow = async (table, id) => {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
};

// ---- Section helpers (public site) ----

export const getProjects = () => fetchAll('projects', { order: orderBy(), visibleOnly: true });
export const getServices = () => fetchAll('services', { order: orderBy(), visibleOnly: true });
export const getExperience = () => fetchAll('experience', { order: orderBy(), visibleOnly: true });
export const getFaqs = () => fetchAll('faqs', { order: orderBy(), visibleOnly: true });
export const getTechStack = () => fetchAll('tech_stack', { order: orderBy(), visibleOnly: true });
export const getEducation = () => fetchAll('education', { order: orderBy(), visibleOnly: true });

export const getSiteSettings = async () => {
  const { data, error } = await supabase.from('site_settings').select('*').order('id').limit(1).maybeSingle();
  if (error) throw error;
  return data;
};

export const uploadImage = async (file, folder = 'uploads') => {
  const ext = (file.name.split('.').pop() || 'png').toLowerCase();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from('images').upload(path, file, { upsert: false, cacheControl: '3600' });
  if (error) throw error;
  return path;
};
