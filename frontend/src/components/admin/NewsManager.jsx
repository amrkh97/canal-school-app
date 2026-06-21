import { useEffect, useState } from 'react';
import { api, mediaUrl } from '../../api.js';
import { Card, Field, BiField, Toast } from './fields.jsx';

const empty = { title: '', title_en: '', body: '', body_en: '', date: '' };

export default function NewsManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  function load() {
    api.getNews().then(setItems).catch(() => setItems([]));
  }
  useEffect(load, []);

  const set = (k, v) => setForm({ ...form, [k]: v });

  async function add(e) {
    e.preventDefault();
    if (!form.title || !form.body) {
      setMsg('خطأ: العنوان والمحتوى (بالعربية) مطلوبان');
      return;
    }
    setBusy(true);
    setMsg('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v || ''));
      if (file) fd.append('image', file);
      await api.addNews(fd);
      setForm(empty);
      setFile(null);
      e.target.reset();
      setMsg('تمت إضافة الخبر ✓');
      load();
    } catch (err) {
      setMsg('خطأ: ' + err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    if (!confirm('حذف هذا الخبر؟')) return;
    await api.deleteNews(id);
    load();
  }

  return (
    <div className="editor">
      <Card title="إضافة خبر جديد">
        <Toast msg={msg} />
        <form onSubmit={add}>
          <BiField label="العنوان" ar={form.title} en={form.title_en} onAr={(v) => set('title', v)} onEn={(v) => set('title_en', v)} />
          <BiField label="المحتوى" textarea ar={form.body} en={form.body_en} onAr={(v) => set('body', v)} onEn={(v) => set('body_en', v)} />
          <Field label="التاريخ" type="date" value={form.date} onChange={(v) => set('date', v)} dir="ltr" hint="اتركه فارغاً لاستخدام تاريخ اليوم" />
          <div className="field">
            <label>صورة (اختياري)</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <button className="btn save-btn" disabled={busy}>{busy ? 'جاري الحفظ…' : 'إضافة الخبر'}</button>
        </form>
      </Card>

      <Card title={`الأخبار الحالية (${items.length})`}>
        {items.length === 0 && <p className="empty">لا توجد أخبار بعد.</p>}
        <div className="admin-list">
          {items.map((n) => (
            <article className="admin-list-item" key={n.id}>
              {n.image_url ? (
                <img className="admin-thumb" src={mediaUrl(n.image_url)} alt="" />
              ) : (
                <span className="admin-thumb admin-thumb-ph"><i className="fas fa-newspaper"></i></span>
              )}
              <div className="admin-list-body">
                <strong>{n.title}</strong>
                {n.title_en && <span className="admin-sub" dir="ltr">{n.title_en}</span>}
                <time className="admin-meta">{n.date}</time>
              </div>
              <button className="mini-del" onClick={() => remove(n.id)}>
                <i className="fas fa-trash"></i> حذف
              </button>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
