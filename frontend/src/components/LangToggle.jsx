import { useUi } from '../context/UiContext.jsx';

// Language switch. Shows the name of the language it switches TO, in that
// language's own script (English / العربية), so the action is self-evident
// in either direction. The label keeps its own lang/dir so Arabic shapes
// correctly even while the page is LTR (and vice-versa).
export default function LangToggle() {
  const { lang, toggleLang } = useUi();
  const toArabic = lang === 'en';

  // Word for the *target* language, in the target language's own script.
  const targetLabel = toArabic ? 'العربية' : 'English';
  const targetLang = toArabic ? 'ar' : 'en';
  const targetDir = toArabic ? 'rtl' : 'ltr';

  // Bilingual, fully spelled-out accessible name.
  const ariaLabel = toArabic
    ? 'Switch language to Arabic — التبديل إلى العربية'
    : 'تغيير اللغة إلى الإنجليزية — Switch language to English';

  return (
    <button
      className="lang-toggle"
      onClick={toggleLang}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <i className="fas fa-globe" aria-hidden="true"></i>
      <span className="lang-toggle__label" lang={targetLang} dir={targetDir}>
        {targetLabel}
      </span>
    </button>
  );
}
