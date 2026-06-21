import { useEffect, useRef } from 'react';
import { useUi } from '../context/UiContext.jsx';

// A prominent, always-visible disclaimer fixed to the very top of the page.
// It publishes its own height to a CSS variable (--disclaimer-h) so the fixed
// navbar and the hero can offset themselves correctly no matter how the text
// wraps (different lengths in Arabic vs English, mobile vs desktop).
export default function TopDisclaimer() {
  const { t } = useUi();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const setH = () =>
      document.documentElement.style.setProperty('--disclaimer-h', `${el.offsetHeight}px`);
    setH();
    const ro = new ResizeObserver(setH);
    ro.observe(el);
    window.addEventListener('resize', setH);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', setH);
      document.documentElement.style.removeProperty('--disclaimer-h');
    };
  }, [t]); // re-measure when the language (and thus the text) changes

  return (
    <div className="top-disclaimer" ref={ref} role="note">
      <div className="td-inner">
        <i className="fas fa-triangle-exclamation" aria-hidden="true"></i>
        <p>
          <strong>{t('disclaimerTitle')}:</strong> {t('disclaimer')}
        </p>
      </div>
    </div>
  );
}
