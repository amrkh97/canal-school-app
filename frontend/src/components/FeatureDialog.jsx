import { useEffect } from 'react';
import { useUi, localized, localizedList } from '../context/UiContext.jsx';

// The rich dialog content comes straight from the feature's own backend fields
// (tagline / overview / support / accent), localized. If the admin adds a new
// feature without filling these, the dialog degrades gracefully.
export default function FeatureDialog({ feature, onClose }) {
  const { t, lang } = useUi();
  const accent = Array.isArray(feature.accent) && feature.accent.length === 2
    ? feature.accent
    : ['#1e88e5', '#43a047'];
  const [c1, c2] = accent;
  const title = localized(feature, 'title', lang);
  const tagline = localized(feature, 'tagline', lang);
  const overview = localized(feature, 'overview', lang) || localized(feature, 'text', lang);
  const support = localizedList(feature, 'support', lang);

  // Close on Escape + lock background scroll while open.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fdialog-backdrop" onClick={onClose}>
      <div
        className="fdialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="fdialog-close" onClick={onClose} aria-label={t('close')}>
          <i className="fas fa-times"></i>
        </button>

        {/* Animated visual banner */}
        <div className="fdialog-visual">
          <svg viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id={`g-${feature.icon}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={c1} />
                <stop offset="100%" stopColor={c2} />
              </linearGradient>
            </defs>
            <rect width="600" height="300" fill={`url(#g-${feature.icon})`} />
            <circle className="blob blob-1" cx="120" cy="80" r="90" fill="#fff" opacity="0.12" />
            <circle className="blob blob-2" cx="480" cy="220" r="120" fill="#fff" opacity="0.1" />
            <circle className="blob blob-3" cx="430" cy="60" r="50" fill="#fff" opacity="0.14" />
          </svg>
          <div className="fdialog-icon">
            <i className={`fas fa-${feature.icon}`}></i>
          </div>
        </div>

        {/* Content */}
        <div className="fdialog-body">
          {tagline && <span className="fdialog-tag">{tagline}</span>}
          <h3 className="fdialog-title">{title}</h3>
          {overview && <p className="fdialog-overview">{overview}</p>}

          {support.length > 0 && (
            <div className="fdialog-support">
              <h4>
                <i className="fas fa-school"></i> {t('supportTitle')}
              </h4>
              <ul>
                {support.map((point, i) => (
                  <li key={i} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
                    <span className="check">
                      <i className="fas fa-check"></i>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a href="#contact" className="btn fdialog-cta" onClick={onClose}>
            {t('learnMoreContact')}
          </a>
        </div>
      </div>
    </div>
  );
}
