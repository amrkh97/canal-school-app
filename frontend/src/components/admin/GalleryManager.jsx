import { useState } from 'react';
import { api, mediaUrl } from '../../api.js';

export default function GalleryManager({ gallery, onChanged }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [captionEn, setCaptionEn] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function upload(e) {
    e.preventDefault();
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      await api.uploadImage(file, caption, captionEn);
      setFile(null);
      setCaption('');
      setCaptionEn('');
      e.target.reset();
      onChanged && onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    if (!confirm('حذف هذه الصورة؟')) return;
    await api.deleteImage(id);
    onChanged && onChanged();
  }

  return (
    <div className="gallery-admin">
      <section className="edit-card">
        <h2>إضافة صورة جديدة</h2>
        <form onSubmit={upload} className="upload-form">
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
          <input
            placeholder="وصف الصورة (اختياري)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <input
            placeholder="وصف الصورة بالإنجليزية (اختياري)"
            dir="ltr"
            value={captionEn}
            onChange={(e) => setCaptionEn(e.target.value)}
          />
          <button className="btn" disabled={busy || !file}>
            {busy ? 'جاري الرفع…' : 'رفع الصورة'}
          </button>
        </form>
        {error && <p className="form-msg error">{error}</p>}
      </section>

      <section className="edit-card">
        <h2>الصور الحالية ({gallery.length})</h2>
        <div className="admin-gallery-grid">
          {gallery.map((item) => (
            <div className="admin-gallery-item" key={item.id}>
              <img src={mediaUrl(item.image_url)} alt={item.caption || ''} />
              <div className="admin-gallery-cap">{item.caption || '—'}</div>
              {item.caption_en && (
                <div className="admin-gallery-cap" dir="ltr">{item.caption_en}</div>
              )}
              <button className="mini-del" onClick={() => remove(item.id)}>
                <i className="fas fa-trash"></i> حذف
              </button>
            </div>
          ))}
          {gallery.length === 0 && <p className="empty">لا توجد صور بعد.</p>}
        </div>
      </section>
    </div>
  );
}
