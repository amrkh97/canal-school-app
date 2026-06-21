import { useEffect, useState } from 'react';
import { api, mediaUrl } from '../../api.js';
import { Card, BiField, Toast } from './fields.jsx';

const empty = { name: '', name_en: '', role: '', role_en: '' };

export default function StaffManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  function load() {
    api.getStaff().then(setItems).catch(() => setItems([]));
  }
  useEffect(load, []);

  const set = (k, v) => setForm({ ...form, [k]: v });

  async function add(e) {
    e.preventDefault();
    if (!form.name) {
      setMsg('خطأ: الاسم (بالعربية) مطلوب');
      return;
    }
    setBusy(true);
    setMsg('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v || ''));
      if (file) fd.append('image', file);
      await api.addStaff(fd);
      setForm(empty);
      setFile(null);
      e.target.reset();
      setMsg('تمت إضافة العضو ✓');
      load();
    } catch (err) {
      setMsg('خطأ: ' + err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    if (!confirm('حذف هذا العضو؟')) return;
    await api.deleteStaff(id);
    load();
  }

  return (
    <div className="editor">
      <Card title="إضافة عضو فريق">
        <Toast msg={msg} />
        <form onSubmit={add}>
          <BiField label="الاسم" ar={form.name} en={form.name_en} onAr={(v) => set('name', v)} onEn={(v) => set('name_en', v)} />
          <BiField label="المنصب" ar={form.role} en={form.role_en} onAr={(v) => set('role', v)} onEn={(v) => set('role_en', v)} />
          <div className="field">
            <label>صورة (اختياري)</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <button className="btn save-btn" disabled={busy}>{busy ? 'جاري الحفظ…' : 'إضافة العضو'}</button>
        </form>
      </Card>

      <Card title={`أعضاء الفريق (${items.length})`}>
        {items.length === 0 && <p className="empty">لا يوجد أعضاء بعد.</p>}
        <div className="admin-list">
          {items.map((s) => (
            <article className="admin-list-item" key={s.id}>
              {s.image_url ? (
                <img className="admin-thumb admin-thumb-round" src={mediaUrl(s.image_url)} alt="" />
              ) : (
                <span className="admin-thumb admin-thumb-round admin-thumb-ph">{(s.name || '?').charAt(0)}</span>
              )}
              <div className="admin-list-body">
                <strong>{s.name}</strong>
                {s.name_en && <span className="admin-sub" dir="ltr">{s.name_en}</span>}
                <span className="admin-meta">{s.role}{s.role_en ? ` · ${s.role_en}` : ''}</span>
              </div>
              <button className="mini-del" onClick={() => remove(s.id)}>
                <i className="fas fa-trash"></i> حذف
              </button>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
