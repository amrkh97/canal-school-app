import { useState } from 'react';
import SectionTitle from './SectionTitle.jsx';
import FeatureDialog from './FeatureDialog.jsx';
import { useUi, localized } from '../context/UiContext.jsx';

export default function Features({ features }) {
  const { t, lang } = useUi();
  const [active, setActive] = useState(null);
  const items = (features && features.items) || [];

  return (
    <section id="features" className="features">
      <div className="container">
        <SectionTitle>{t('featuresTitle')}</SectionTitle>
        <div className="features-grid">
          {items.map((card, i) => (
            <button
              type="button"
              className="feature-card"
              data-reveal
              key={i}
              style={{ transitionDelay: `${i * 60}ms` }}
              onClick={() => setActive(card)}
            >
              <div className="feature-icon">
                <i className={`fas fa-${card.icon}`}></i>
              </div>
              <h3>{localized(card, 'title', lang)}</h3>
              <p>{localized(card, 'text', lang)}</p>
              <span className="feature-more">
                {t('learnMore')} <i className="fas fa-arrow-left"></i>
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && <FeatureDialog feature={active} onClose={() => setActive(null)} />}
    </section>
  );
}
