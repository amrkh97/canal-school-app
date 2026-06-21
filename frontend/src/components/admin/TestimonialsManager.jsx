import { useEffect, useState } from 'react';
import { api, mediaUrl } from '../../api.js';
import { Card, BiField, Toast } from './fields.jsx';

const empty = { name: '', name_en: '', relation: '', relation_en: '', quote: '', quote_en: '' };

export default function TestimonialsManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  function load() {
    api.getTestimonials().then(setItems).catch(() => setItems([]));
  }
  useEffect(load, []);

  const set = (k, v) => setForm({ ...form, [k]: v });

  async function add(e) {
    e.preventDefault();
    if (!form.name || !form.quote) {
      setMsg('خطأ: الاسم والاقتباس (بالعربية) مطلوبان');
      return;
    }
    setBusy(true);
    setMsg('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v || ''));
      if (file) fd.append('image', file);
      await api.addTestimonial(fd);
      setForm(empty);
      setFile(null);
      e.target.reset();
      setMsg('تمت إضافة الرأي ✓');
      load();
    } catch (err) {
      setMsg('خطأ: ' + err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    if (!confirm('حذف هذا الرأي؟')) return;
    await api.deleteTestimonial(id);
    load();
  }

  return (
    <div className="editor">
      <Card title="إضافة رأي / شهادة">
        <Toast msg={msg} />
        <form onSubmit={add}>
          <BiField label="الاسم" ar={form.name} en={form.name_en} onAr={(v) => set('name', v)} onEn={(v) => set('name_en', v)} />
          <BiField label="الصفة" ar={form.relation} en={form.relation_en} onAr={(v) => set('relation', v)} onEn={(v) => set('relation_en', v)} />
          <BiField label="الاقتباس" textarea ar={form.quote} en={form.quote_en} onAr={(v) => set('quote', v)} onEn={(v) => set('quote_en', v)} />
          <div className="field">
            <label>صورة (اختياري)</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <button className="btn save-btn" disabled={busy}>{busy ? 'جاري الحفظ…' : 'إضافة الرأي'}</button>
        </form>
      </Card>

      <Card title={`الآراء الحالية (${items.length})`}>
        {items.length === 0 && <p className="empty">لا توجد آراء بعد.</p>}
        <div className="admin-list">
          {items.map((tt) => (
            <article className="admin-list-item" key={tt.id}>
              {tt.image_url ? (
                <img className="admin-thumb admin-thumb-round" src={mediaUrl(tt.image_url)} alt="" />
              ) : (
                <span className="admin-thumb admin-thumb-round admin-thumb-ph">{(tt.name || '?').charAt(0)}</span>
              )}
              <div className="admin-list-body">
                <strong>{tt.name}{tt.relation ? ` — ${tt.relation}` : ''}</strong>
                <span className="admin-meta">{tt.quote}</span>
              </div>
              <button className="mini-del" onClick={() => remove(tt.id)}>
                <i className="fas fa-trash"></i> حذف
              </button>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
