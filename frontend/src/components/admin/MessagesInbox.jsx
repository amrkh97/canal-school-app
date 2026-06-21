import { useEffect, useState } from 'react';
import { api } from '../../api.js';

export default function MessagesInbox({ onChanged }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await api.getMessages();
    setItems(data.items);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function markRead(id) {
    await api.markRead(id);
    load();
    onChanged && onChanged();
  }

  async function remove(id) {
    if (!confirm('حذف هذه الرسالة؟')) return;
    await api.deleteMessage(id);
    load();
    onChanged && onChanged();
  }

  if (loading) return <div className="page-loading">جاري التحميل…</div>;

  return (
    <div className="inbox">
      <h2>صندوق الرسائل ({items.length})</h2>
      {items.length === 0 && <p className="empty">لا توجد رسائل بعد.</p>}
      <div className="msg-list">
        {items.map((m) => (
          <article className={`msg-card ${m.is_read ? '' : 'unread'}`} key={m.id}>
            <div className="msg-head">
              <div>
                <strong>{m.name}</strong>
                {!m.is_read && <span className="dot">جديد</span>}
              </div>
              <time>{new Date(m.created_at + 'Z').toLocaleString('ar-EG')}</time>
            </div>
            <div className="msg-meta">
              <a href={`mailto:${m.email}`} dir="ltr">
                <i className="fas fa-envelope"></i> {m.email}
              </a>
              {m.phone && (
                <a href={`tel:${m.phone}`} dir="ltr">
                  <i className="fas fa-phone"></i> {m.phone}
                </a>
              )}
            </div>
            <p className="msg-body">{m.body}</p>
            <div className="msg-actions">
              {!m.is_read && (
                <button onClick={() => markRead(m.id)} className="mini-btn">
                  <i className="fas fa-check"></i> تعليم كمقروء
                </button>
              )}
              <button onClick={() => remove(m.id)} className="mini-del">
                <i className="fas fa-trash"></i> حذف
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
