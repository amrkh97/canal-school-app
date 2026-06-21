import { useUi } from '../context/UiContext.jsx';

// Floating WhatsApp contact button. Builds a wa.me link from the school phone.
export default function WhatsAppButton({ phone }) {
  const { t } = useUi();
  if (!phone) return null;
  // Keep digits only; prepend Egypt country code (20) if it looks local.
  let digits = String(phone).replace(/\D/g, '');
  if (digits.startsWith('0')) digits = '20' + digits.slice(1);
  const href = `https://wa.me/${digits}`;

  return (
    <a
      className="whatsapp-btn"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={t('whatsapp')}
      title={t('whatsapp')}
    >
      <i className="fab fa-whatsapp"></i>
      <span className="wa-pulse"></span>
    </a>
  );
}
