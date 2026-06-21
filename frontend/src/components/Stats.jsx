import { useEffect, useRef, useState } from 'react';
import { useUi, localized } from '../context/UiContext.jsx';

// All figures + labels come from the backend (content key: "stats").
function useCountUp(target, run, duration = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return n;
}

function StatItem({ stat, run, lang }) {
  const value = useCountUp(Number(stat.value) || 0, run);
  const locale = lang === 'en' ? 'en-US' : 'ar-EG';
  return (
    <div className="stat-item">
      <div className="stat-icon">
        <i className={`fas fa-${stat.icon}`}></i>
      </div>
      <div className="stat-number">
        {value.toLocaleString(locale)}
        <span>{stat.suffix}</span>
      </div>
      <div className="stat-label">{localized(stat, 'label', lang)}</div>
    </div>
  );
}

export default function Stats({ stats }) {
  const { lang } = useUi();
  const list = Array.isArray(stats) ? stats : [];
  const ref = useRef(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!list.length) return null;

  return (
    <section className="stats" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {list.map((s, i) => (
            <StatItem key={i} stat={s} run={run} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
