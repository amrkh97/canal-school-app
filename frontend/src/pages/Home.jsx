import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useReveal } from '../hooks/useReveal.js';
import { useUi, localized } from '../context/UiContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Stages from '../components/Stages.jsx';
import Stats from '../components/Stats.jsx';
import Admissions from '../components/Admissions.jsx';
import News from '../components/News.jsx';
import Gallery from '../components/Gallery.jsx';
import Features from '../components/Features.jsx';
import Staff from '../components/Staff.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import ScrollTop from '../components/ScrollTop.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';

// id -> how to render that section. The home page renders these in the order
// defined by the backend `sections` blueprint, skipping disabled ones. Sections
// that fetch their own data (news/staff/testimonials) take no props.
const REGISTRY = {
  home: (c) => <Hero hero={c.hero} />,
  about: (c) => <About about={c.about} />,
  stages: (c) => <Stages stages={c.stages} />,
  admissions: (c) => <Admissions admissions={c.admissions} />,
  stats: (c) => <Stats stats={c.stats} />,
  news: () => <News />,
  gallery: (c) => <Gallery gallery={c.gallery || []} />,
  features: (c) => <Features features={c.features} />,
  staff: () => <Staff />,
  testimonials: () => <Testimonials />,
  contact: (c) => <Contact contact={c.contact} />,
};

// Used only to lay sections out if the backend somehow has no `sections` key.
const DEFAULT_ORDER = [
  'home', 'about', 'stages', 'admissions', 'stats',
  'news', 'gallery', 'features', 'staff', 'testimonials', 'contact',
];

// Build the ordered list of enabled section ids from the backend blueprint.
// Any known section missing from the saved blueprint is appended (enabled),
// so newly added sections never silently disappear.
function orderedSections(content) {
  const saved = Array.isArray(content.sections) ? content.sections : [];
  const known = Object.keys(REGISTRY);
  const seen = new Set();
  const out = [];
  for (const s of saved) {
    if (s && known.includes(s.id) && !seen.has(s.id)) {
      seen.add(s.id);
      if (s.enabled !== false) out.push(s.id);
    }
  }
  for (const id of DEFAULT_ORDER) {
    if (known.includes(id) && !seen.has(id)) out.push(id);
  }
  return out;
}

export default function Home() {
  const { lang } = useUi();
  const [content, setContent] = useState(null);
  const [error, setError] = useState(false);

  function load() {
    setError(false);
    api
      .getContent()
      .then(setContent)
      .catch(() => setError(true));
  }

  useEffect(() => {
    load();
  }, []);

  useReveal([content, lang]);

  if (error) {
    return (
      <div className="page-loading" style={{ flexDirection: 'column', gap: 16 }}>
        <span>{lang === 'en' ? 'Could not reach the server.' : 'تعذّر الاتصال بالخادم.'}</span>
        <button className="btn" onClick={load}>
          {lang === 'en' ? 'Retry' : 'إعادة المحاولة'}
        </button>
      </div>
    );
  }
  if (!content) return <div className="page-loading">…</div>;

  const schoolName = localized(content.site, 'schoolName', lang);
  const ids = orderedSections(content);

  return (
    <>
      <Navbar schoolName={schoolName} site={content.site} sections={ids} />
      <main>
        {ids.map((id) => (
          <div key={id}>{REGISTRY[id](content)}</div>
        ))}
      </main>
      <Footer
        site={content.site}
        contact={content.contact}
        footer={content.footer}
        schoolName={schoolName}
        sections={ids}
      />
      <ScrollTop />
      <WhatsAppButton phone={content.contact?.phone} />
    </>
  );
}
