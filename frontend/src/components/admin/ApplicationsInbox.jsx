import { useEffect, useState } from 'react';
import { api } from '../../api.js';

export default function ApplicationsInbox({ onChanged }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await api.getApplications();
    setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function markRead(id) {
    await api.markApplicationRead(id);
    load();
    onChanged && onChanged();
  }

  async function remove(id) {
    if (!confirm('حذف هذا الطلب؟')) return;
    await api.deleteApplication(id);
    load();
    onChanged && onChanged();
  }

  if (loading) return <div className="page-loading">جاري التحميل…</div>;

  return (
    <div className="inbox">
      <h2>طلبات الالتحاق ({items.length})</h2>
      {items.length === 0 && <p className="empty">لا توجد طلبات بعد.</p>}
      <div className="msg-list">
        {items.map((a) => (
          <article className={`msg-card ${a.is_read ? '' : 'unread'}`} key={a.id}>
            <div className="msg-head">
              <div>
                <strong>{a.student_name}</strong>
                {!a.is_read && <span className="dot">جديد</span>}
              </div>
              <time>{new Date(a.created_at + 'Z').toLocaleString('ar-EG')}</time>
            </div>
            <div className="msg-meta">
              <span><i className="fas fa-user"></i> ولي الأمر: {a.parent_name}</span>
              <a href={`tel:${a.phone}`} dir="ltr"><i className="fas fa-phone"></i> {a.phone}</a>
              {a.email && <a href={`mailto:${a.email}`} dir="ltr"><i className="fas fa-envelope"></i> {a.email}</a>}
              {a.grade && <span><i className="fas fa-layer-group"></i> {a.grade}</span>}
            </div>
            {a.notes && <p className="msg-body">{a.notes}</p>}
            <div className="msg-actions">
              {!a.is_read && (
                <button onClick={() => markRead(a.id)} className="mini-btn">
                  <i className="fas fa-check"></i> تعليم كمقروء
                </button>
              )}
              <button onClick={() => remove(a.id)} className="mini-del">
                <i className="fas fa-trash"></i> حذف
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
