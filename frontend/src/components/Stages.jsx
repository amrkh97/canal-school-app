import SectionTitle from './SectionTitle.jsx';
import { useUi, localized } from '../context/UiContext.jsx';

// Educational stages come entirely from the backend (content key: "stages").
export default function Stages({ stages }) {
  const { t, lang } = useUi();
  const list = Array.isArray(stages) ? stages : [];
  if (!list.length) return null;
  return (
    <section id="stages" className="stages">
      <div className="container">
        <SectionTitle>{t('stagesTitle')}</SectionTitle>
        <div className="stages-grid">
          {list.map((s, i) => (
            <div className="stage-card" data-reveal key={i} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="stage-step">{i + 1}</div>
              <div className="stage-icon">
                <i className={`fas fa-${s.icon}`}></i>
              </div>
              <h3>{localized(s, 'title', lang)}</h3>
              <span className="stage-age">{localized(s, 'age', lang)}</span>
              <p>{localized(s, 'text', lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
