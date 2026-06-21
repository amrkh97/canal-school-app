import { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle.jsx';
import { api, mediaUrl } from '../api.js';
import { useUi, localized } from '../context/UiContext.jsx';

export default function News() {
  const { t, lang } = useUi();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    api.getNews().then(setItems).catch(() => setItems([]));
  }, []);

  if (!items.length) return null;

  const fmtDate = (d) => {
    if (!d) return '';
    try {
      return new Date(d).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
        year: 'numeric', month: 'long', day: 'numeric',
      });
    } catch {
      return d;
    }
  };

  return (
    <section id="news" className="news">
      <div className="container">
        <SectionTitle>{t('newsTitle')}</SectionTitle>
        <div className="news-grid">
          {items.map((n) => (
            <article className="news-card" data-reveal key={n.id} onClick={() => setOpen(n)}>
              {n.image_url ? (
                <div className="news-img" style={{ backgroundImage: `url(${mediaUrl(n.image_url)})` }} />
              ) : (
                <div className="news-img news-img-placeholder">
                  <i className="fas fa-newspaper"></i>
                </div>
              )}
              <div className="news-body">
                <time className="news-date">
                  <i className="fas fa-calendar-day"></i> {fmtDate(n.date)}
                </time>
                <h3>{localized(n, 'title', lang)}</h3>
                <p>{localized(n, 'body', lang)}</p>
                <span className="news-more">{t('readMore')} →</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {open && (
        <div className="fdialog-backdrop" onClick={() => setOpen(null)}>
          <div className="fdialog news-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="fdialog-close" onClick={() => setOpen(null)} aria-label={t('close')}>
              <i className="fas fa-times"></i>
            </button>
            {open.image_url && (
              <div className="news-dialog-img" style={{ backgroundImage: `url(${mediaUrl(open.image_url)})` }} />
            )}
            <div className="fdialog-body" style={{ textAlign: 'start' }}>
              <time className="news-date">
                <i className="fas fa-calendar-day"></i> {fmtDate(open.date)}
              </time>
              <h3 className="fdialog-title">{localized(open, 'title', lang)}</h3>
              <p className="fdialog-overview">{localized(open, 'body', lang)}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
