import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../i18n.js';

const UiContext = createContext(null);

export function UiProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'ar');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Apply language → document direction + lang attribute.
  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Apply theme → data-theme attribute on <html>.
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const t = (key) => (translations[lang] && translations[lang][key]) || translations.ar[key] || key;
  const toggleLang = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'));
  const toggleTheme = () => setTheme((th) => (th === 'light' ? 'dark' : 'light'));

  return (
    <UiContext.Provider value={{ lang, setLang, toggleLang, t, theme, toggleTheme }}>
      {children}
    </UiContext.Provider>
  );
}

export function useUi() {
  return useContext(UiContext);
}

// Helper: pick a localized field from a backend row (e.g. title / title_en).
export function localized(row, field, lang) {
  if (!row) return '';
  if (lang === 'en') return row[`${field}_en`] || row[field] || '';
  return row[field] || '';
}

// Helper: pick a localized ARRAY field (e.g. paragraphs / paragraphs_en).
// Falls back to the Arabic list if the English one is missing/empty.
export function localizedList(row, field, lang) {
  if (!row) return [];
  if (lang === 'en') {
    const en = row[`${field}_en`];
    if (Array.isArray(en) && en.length) return en;
  }
  return Array.isArray(row[field]) ? row[field] : [];
}
