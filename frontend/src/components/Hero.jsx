import { useUi, localized } from '../context/UiContext.jsx';

export default function Hero({ hero }) {
  const { lang } = useUi();
  return (
    <section id="home" className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>{localized(hero, 'title', lang)}</h1>
        <p>{localized(hero, 'subtitle', lang)}</p>
        <a href="#about" className="btn">
          {localized(hero, 'ctaLabel', lang)}
        </a>
      </div>
      <a href="#about" className="scroll-cue" aria-label="scroll down">
        <i className="fas fa-chevron-down"></i>
      </a>
    </section>
  );
}
