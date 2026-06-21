import { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle.jsx';
import { mediaUrl } from '../api.js';
import { useUi, localized } from '../context/UiContext.jsx';

export default function Gallery({ gallery }) {
  const { t, lang } = useUi();
  const [lightbox, setLightbox] = useState(null);
  const [idx, setIdx] = useState(0);

  const cap = (item) => localized(item, 'caption', lang);
  const n = gallery.length;
  const isCarousel = n > 6;
  const go = (i) => setIdx((i + n) % n);

  // Auto-advance the slider.
  useEffect(() => {
    if (!isCarousel || lightbox) return;
    const id = setInterval(() => setIdx((p) => (p + 1) % n), 5000);
    return () => clearInterval(id);
  }, [isCarousel, n, lightbox]);

  if (!n) return null;

  const overlay = (item) => (
    <div className="gallery-overlay">
      <i className="fas fa-expand"></i>
      {cap(item) ? <span>{cap(item)}</span> : null}
    </div>
  );

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <SectionTitle>{t('galleryTitle')}</SectionTitle>

        {isCarousel ? (
          <div className="gallery-slider">
            <div className="slider-stage">
              <button className="slider-arrow prev" onClick={() => go(idx - 1)} aria-label="prev">
                <i className="fas fa-chevron-left"></i>
              </button>

              <div className="slider-viewport">
                <div className="slider-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
                  {gallery.map((item) => (
                    <button
                      className="slider-slide"
                      key={item.id}
                      onClick={() => setLightbox(item)}
                      aria-label={cap(item) || 'photo'}
                    >
                      <img src={mediaUrl(item.image_url)} alt={cap(item) || 'school'} />
                      {cap(item) ? <span className="slide-caption">{cap(item)}</span> : null}
                    </button>
                  ))}
                </div>
              </div>

              <button className="slider-arrow next" onClick={() => go(idx + 1)} aria-label="next">
                <i className="fas fa-chevron-right"></i>
              </button>

              <span className="slider-counter">{idx + 1} / {n}</span>
            </div>

            <div className="slider-thumbs">
              {gallery.map((item, i) => (
                <button
                  key={item.id}
                  className={`slider-thumb ${i === idx ? 'active' : ''}`}
                  onClick={() => setIdx(i)}
                  aria-label={`${i + 1}`}
                >
                  <img src={mediaUrl(item.image_url)} alt="" />
                </button>
              ))}
            </div>

            <div className="slider-dots">
              {gallery.map((_, i) => (
                <button key={i} className={i === idx ? 'active' : ''} onClick={() => setIdx(i)} aria-label={`${i + 1}`} />
              ))}
            </div>
          </div>
        ) : (
          <div className="gallery-grid">
            {gallery.map((item) => (
              <div data-reveal key={item.id}>
                <button className="gallery-item" onClick={() => setLightbox(item)} aria-label={cap(item) || 'photo'}>
                  <img src={mediaUrl(item.image_url)} alt={cap(item) || 'school'} loading="lazy" />
                  {overlay(item)}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" aria-label={t('close')}>
            <i className="fas fa-times"></i>
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={mediaUrl(lightbox.image_url)} alt={cap(lightbox) || 'school'} />
            {cap(lightbox) ? <figcaption>{cap(lightbox)}</figcaption> : null}
          </figure>
        </div>
      )}
    </section>
  );
}
