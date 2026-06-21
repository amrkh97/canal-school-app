import { useState } from 'react';

// A curated set of icons that fit a school site. Each has an Arabic label so a
// non-technical admin can recognise it. (These are all Font Awesome "fas" icons.)
const ICONS = [
  { name: 'book-open', label: 'كتاب' },
  { name: 'graduation-cap', label: 'تخرج' },
  { name: 'school', label: 'مدرسة' },
  { name: 'chalkboard-user', label: 'معلم' },
  { name: 'user-graduate', label: 'طالب' },
  { name: 'users', label: 'مجموعة' },
  { name: 'laptop-code', label: 'برمجة' },
  { name: 'desktop', label: 'حاسوب' },
  { name: 'flask', label: 'علوم' },
  { name: 'microscope', label: 'مجهر' },
  { name: 'atom', label: 'ذرة' },
  { name: 'calculator', label: 'رياضيات' },
  { name: 'globe', label: 'جغرافيا' },
  { name: 'language', label: 'لغات' },
  { name: 'pen', label: 'قلم' },
  { name: 'lightbulb', label: 'فكرة' },
  { name: 'brain', label: 'تفكير' },
  { name: 'palette', label: 'فنون' },
  { name: 'music', label: 'موسيقى' },
  { name: 'masks-theater', label: 'مسرح' },
  { name: 'camera', label: 'تصوير' },
  { name: 'running', label: 'رياضة' },
  { name: 'futbol', label: 'كرة قدم' },
  { name: 'basketball', label: 'كرة سلة' },
  { name: 'dumbbell', label: 'لياقة' },
  { name: 'trophy', label: 'بطولة' },
  { name: 'medal', label: 'ميدالية' },
  { name: 'award', label: 'جائزة' },
  { name: 'star', label: 'نجمة' },
  { name: 'heart', label: 'قلب' },
  { name: 'shield-halved', label: 'أمان' },
  { name: 'handshake', label: 'تعاون' },
  { name: 'bus', label: 'حافلة' },
  { name: 'bell', label: 'جرس' },
  { name: 'calendar-days', label: 'تقويم' },
  { name: 'comments', label: 'تواصل' },
  { name: 'leaf', label: 'بيئة' },
  { name: 'puzzle-piece', label: 'أنشطة' },
  { name: 'shapes', label: 'أشكال' },
  { name: 'robot', label: 'روبوت' },
];

export default function IconPicker({ value, onChange, label = 'الأيقونة' }) {
  const [query, setQuery] = useState('');
  const filtered = query
    ? ICONS.filter((i) => i.label.includes(query) || i.name.includes(query.toLowerCase()))
    : ICONS;

  return (
    <div className="field icon-picker">
      <label>{label}</label>

      <div className="icon-picker-selected">
        <span className="ip-preview">
          <i className={`fas fa-${value || 'star'}`}></i>
        </span>
        <span className="ip-current">المختار: {value || '—'}</span>
        <input
          className="ip-search"
          placeholder="ابحث عن أيقونة…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="icon-grid">
        {filtered.map((icon) => (
          <button
            type="button"
            key={icon.name}
            className={`icon-cell ${value === icon.name ? 'active' : ''}`}
            title={icon.label}
            onClick={() => onChange(icon.name)}
          >
            <i className={`fas fa-${icon.name}`}></i>
            <span>{icon.label}</span>
          </button>
        ))}
        {filtered.length === 0 && <p className="empty">لا توجد نتيجة</p>}
      </div>
    </div>
  );
}
