import { useEffect, useState } from 'react';
import { useUi, localized } from '../context/UiContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import LangToggle from './LangToggle.jsx';

export default function Navbar({ schoolName, site, sections }) {
  const { lang } = useUi();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  // Nav links come from the editable site.navItems, but only show links that
  // point at a section that is currently enabled (avoids dead anchors).
  const enabled = Array.isArray(sections) ? sections : null;
  const items = ((site && site.navItems) || []).filter(
    (item) => !enabled || enabled.includes(item.id)
  );

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#home" className="logo" onClick={close}>
          <img src="/logo.png" alt="logo" />
          <span>{schoolName}</span>
        </a>

        <ul className={`nav-links ${open ? 'active' : ''}`}>
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={close}>
                {localized(item, 'label', lang)}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <LangToggle />
          <ThemeToggle />
          <button
            className="menu-toggle"
            aria-label={open ? 'إغلاق القائمة — Close menu' : 'فتح القائمة — Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <i className={`fas ${open ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
