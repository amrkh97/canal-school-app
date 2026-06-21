import { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle.jsx';
import { api, mediaUrl } from '../api.js';
import { useUi, localized } from '../context/UiContext.jsx';

export default function Staff() {
  const { t, lang } = useUi();
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.getStaff().then(setItems).catch(() => setItems([]));
  }, []);

  if (!items.length) return null;

  const initials = (name) => (name ? name.trim().charAt(0) : '?');

  return (
    <section id="staff" className="staff">
      <div className="container">
        <SectionTitle>{t('staffTitle')}</SectionTitle>
        <div className="staff-grid">
          {items.map((s) => (
            <div className="staff-card" data-reveal key={s.id}>
              <div className="staff-photo">
                {s.image_url ? (
                  <img src={mediaUrl(s.image_url)} alt={localized(s, 'name', lang)} />
                ) : (
                  <span className="staff-initial">{initials(localized(s, 'name', lang))}</span>
                )}
              </div>
              <h3>{localized(s, 'name', lang)}</h3>
              <span className="staff-role">{localized(s, 'role', lang)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
