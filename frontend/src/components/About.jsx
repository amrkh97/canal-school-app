import SectionTitle from './SectionTitle.jsx';
import { useUi, localized, localizedList } from '../context/UiContext.jsx';

export default function About({ about }) {
  const { t, lang } = useUi();
  const paragraphs = localizedList(about, 'paragraphs', lang);
  const features = localizedList(about, 'features', lang);
  return (
    <section id="about" className="about">
      <div className="container">
        <SectionTitle>{t('aboutTitle')}</SectionTitle>
        <div className="about-content">
          <div className="about-video" data-reveal>
            <video controls poster="/hero.jpg">
              <source src="/school-tour.mp4" type="video/mp4" />
            </video>
            <div className="video-badge">{localized(about, 'videoBadge', lang)}</div>
          </div>
          <div className="about-text" data-reveal>
            <h3>{localized(about, 'heading', lang)}</h3>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <ul className="about-features">
              {features.map((f, i) => (
                <li key={i}>
                  <i className="fas fa-check-circle"></i> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
