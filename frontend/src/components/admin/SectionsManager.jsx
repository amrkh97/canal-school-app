import { useState } from 'react';
import { api } from '../../api.js';
import { Card, Toast, RowTools, move } from './fields.jsx';

// Friendly Arabic labels for each known section id.
const LABELS = {
  home: 'القسم الرئيسي', about: 'عن المدرسة', stages: 'المراحل', admissions: 'القبول',
  stats: 'الأرقام', news: 'الأخبار', gallery: 'معرض الصور', features: 'المميزات',
  staff: 'فريق العمل', testimonials: 'الآراء', contact: 'اتصل بنا',
};
const ALL_IDS = Object.keys(LABELS);

// Merge the saved blueprint with all known sections (so nothing is missing).
function normalize(saved) {
  const list = Array.isArray(saved) ? saved.filter((s) => s && LABELS[s.id]) : [];
  const seen = new Set(list.map((s) => s.id));
  for (const id of ALL_IDS) if (!seen.has(id)) list.push({ id, enabled: true });
  return list.map((s) => ({ id: s.id, enabled: s.enabled !== false }));
}

export default function SectionsManager({ sections, onSaved }) {
  const [list, setList] = useState(() => normalize(sections));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const toggle = (i) => setList(list.map((s, j) => (j === i ? { ...s, enabled: !s.enabled } : s)));

  async function save() {
    setSaving(true);
    setMsg('');
    try {
      await api.saveSection('sections', list);
      setMsg('تم حفظ ترتيب الأقسام ✓');
      onSaved && onSaved();
    } catch (e) {
      setMsg('خطأ: ' + e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="editor">
      <Card title="ترتيب الأقسام وإظهارها">
        <Toast msg={msg} />
        <p className="editor-hint">رتّب الأقسام بالأسهم وفعّل أو أخفِ أي قسم، ثم اضغط حفظ. ينعكس الترتيب فوراً على الصفحة الرئيسية.</p>
        <div className="sections-list">
          {list.map((s, i) => (
            <div className={`section-row ${s.enabled ? '' : 'is-off'}`} key={s.id}>
              <RowTools
                canUp={i > 0}
                canDown={i < list.length - 1}
                onUp={() => setList(move(list, i, -1))}
                onDown={() => setList(move(list, i, 1))}
              />
              <span className="section-name">{LABELS[s.id]} <small dir="ltr">#{s.id}</small></span>
              <label className="switch">
                <input type="checkbox" checked={s.enabled} onChange={() => toggle(i)} />
                <span className="slider-pill"></span>
                <span className="switch-text">{s.enabled ? 'ظاهر' : 'مخفي'}</span>
              </label>
            </div>
          ))}
        </div>
        <button className="btn save-btn" onClick={save} disabled={saving}>{saving ? 'جاري الحفظ…' : 'حفظ الترتيب'}</button>
      </Card>
    </div>
  );
}
