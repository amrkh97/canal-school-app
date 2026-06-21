import { Link } from 'react-router-dom';
import { useUi, localized } from '../context/UiContext.jsx';

const socialIcons = {
  facebook: 'fa-facebook-f',
  twitter: 'fa-twitter',
  instagram: 'fa-instagram',
  youtube: 'fa-youtube',
};

const isRealLink = (url) => typeof url === 'string' && /^https?:\/\//i.test(url.trim());

export default function Footer({ site, contact, footer, schoolName, sections }) {
  const { t, lang } = useUi();
  const socials = (contact && contact.socials) || {};
  const activeSocials = Object.entries(socialIcons).filter(([key]) => isRealLink(socials[key]));

  const enabled = Array.isArray(sections) ? sections : null;
  const navItems = ((site && site.navItems) || []).filter(
    (item) => !enabled || enabled.includes(item.id)
  );
  const address = localized(contact, 'address', lang);

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.png" alt="logo" />
              <h3>{schoolName || localized(site, 'schoolName', lang)}</h3>
            </div>
            <p>{localized(footer, 'tagline', lang)}</p>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4>{t('quickLinks')}</h4>
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{localized(item, 'label', lang)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>{t('contactUs')}</h4>
            <ul className="footer-contact">
              {address && (
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{address}</span>
                </li>
              )}
              {contact?.phone && (
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <a href={`tel:${contact.phone}`} dir="ltr">{contact.phone}</a>
                </li>
              )}
              {contact?.email && (
                <li>
                  <i className="fas fa-envelope"></i>
                  <a href={`mailto:${contact.email}`} dir="ltr">{contact.email}</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Social row — only shown when there are real links */}
        {activeSocials.length > 0 && (
          <div className="social-links">
            {activeSocials.map(([key, icon]) => (
              <a key={key} href={socials[key]} target="_blank" rel="noreferrer" aria-label={key}>
                <i className={`fab ${icon}`}></i>
              </a>
            ))}
          </div>
        )}

        {/* Static legal disclaimer — unofficial fan site (not admin-editable). */}
        <div className="footer-disclaimer" role="note">
          <strong>
            <i className="fas fa-circle-info"></i> {t('disclaimerTitle')}
          </strong>
          <p>{t('disclaimer')}</p>
        </div>

        <div className="footer-bottom">
          <p>{localized(footer, 'copyright', lang)}</p>
          <Link to="/admin/login" className="admin-link">
            {t('adminLogin')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
