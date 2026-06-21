import { useState } from 'react';
import { Card, BiField, SaveBtn, Toast, AddBtn, RowTools, useSave, clone, move } from '../fields.jsx';

// Valid anchor targets for nav links (must match section ids).
const SECTION_IDS = ['home', 'about', 'stages', 'admissions', 'stats', 'news', 'gallery', 'features', 'staff', 'testimonials', 'contact'];

export default function SiteEditor({ data, onSaved }) {
  const [site, setSite] = useState(clone(data) || { navItems: [] });
  const { saving, msg, save } = useSave(onSaved);
  const items = site.navItems || [];
  const setItems = (navItems) => setSite({ ...site, navItems });
  const setItem = (i, k, v) => setItems(items.map((it, j) => (j === i ? { ...it, [k]: v } : it)));

  return (
    <Card title="هوية الموقع والقائمة">
      <Toast msg={msg} />
      <BiField label="اسم المدرسة" ar={site.schoolName} en={site.schoolName_en} onAr={(v) => setSite({ ...site, schoolName: v })} onEn={(v) => setSite({ ...site, schoolName_en: v })} />

      <span className="bi-label">روابط القائمة العلوية</span>
      {items.map((it, i) => (
        <div className="feature-row" key={i}>
          <div className="feature-row-head">
            <span>رابط {i + 1}</span>
            <RowTools
              canUp={i > 0}
              canDown={i < items.length - 1}
              onUp={() => setItems(move(items, i, -1))}
              onDown={() => setItems(move(items, i, 1))}
              onDelete={() => setItems(items.filter((_, j) => j !== i))}
            />
          </div>
          <div className="field">
            <label>القسم المستهدف</label>
            <select value={it.id || ''} onChange={(e) => setItem(i, 'id', e.target.value)}>
              <option value="" disabled>اختر قسماً…</option>
              {SECTION_IDS.map((id) => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          </div>
          <BiField label="نص الرابط" ar={it.label} en={it.label_en} onAr={(v) => setItem(i, 'label', v)} onEn={(v) => setItem(i, 'label_en', v)} />
        </div>
      ))}
      <AddBtn label="إضافة رابط" onClick={() => setItems([...items, { id: 'home', label: '', label_en: '' }])} />
      <SaveBtn busy={saving} onClick={() => save('site', site, 'هوية الموقع')} />
    </Card>
  );
}
