import { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle.jsx';
import { api, mediaUrl } from '../api.js';
import { useUi, localized } from '../context/UiContext.jsx';

export default function Testimonials() {
  const { t, lang } = useUi();
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    api.getTestimonials().then(setItems).catch(() => setItems([]));
  }, []);

  // Auto-advance the carousel.
  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <SectionTitle>{t('testimonialsTitle')}</SectionTitle>

        <div className="testi-stage">
          <i className="fas fa-quote-right testi-quote-mark"></i>
          {items.map((item, i) => (
            <figure className={`testi-slide ${i === active ? 'active' : ''}`} key={item.id}>
              <blockquote>{localized(item, 'quote', lang)}</blockquote>
              <figcaption>
                <span className="testi-avatar">
                  {item.image_url ? (
                    <img src={mediaUrl(item.image_url)} alt={localized(item, 'name', lang)} />
                  ) : (
                    (localized(item, 'name', lang) || '?').charAt(0)
                  )}
                </span>
                <span>
                  <strong>{localized(item, 'name', lang)}</strong>
                  <small>{localized(item, 'relation', lang)}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {items.length > 1 && (
          <div className="testi-dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={i === active ? 'active' : ''}
                onClick={() => setActive(i)}
                aria-label={`${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
