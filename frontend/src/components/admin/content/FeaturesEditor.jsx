import { useState } from 'react';
import IconPicker from '../IconPicker.jsx';
import { Card, BiField, BiList, SaveBtn, Toast, AddBtn, RowTools, useSave, clone, move, cleanList } from '../fields.jsx';

const blank = {
  icon: 'star', title: '', title_en: '', text: '', text_en: '',
  accent: ['#1e88e5', '#43a047'], tagline: '', tagline_en: '',
  overview: '', overview_en: '', support: [], support_en: [],
};

export default function FeaturesEditor({ data, onSaved }) {
  const [features, setFeatures] = useState(clone(data) || { items: [] });
  const { saving, msg, save } = useSave(onSaved);
  const items = features.items || [];
  const setItems = (it) => setFeatures({ ...features, items: it });
  const setItem = (i, k, v) => setItems(items.map((it, j) => (j === i ? { ...it, [k]: v } : it)));
  const setAccent = (i, idx, v) => {
    const accent = [...(items[i].accent || ['#1e88e5', '#43a047'])];
    accent[idx] = v;
    setItem(i, 'accent', accent);
  };

  function onSave() {
    const cleaned = items.map((it) => ({ ...it, support: cleanList(it.support), support_en: cleanList(it.support_en) }));
    save('features', { ...features, items: cleaned }, 'المميزات');
  }

  return (
    <Card title="المميزات (البطاقات + نافذة التفاصيل)">
      <Toast msg={msg} />
      {items.map((item, i) => (
        <div className="feature-row" key={i}>
          <div className="feature-row-head">
            <span>بطاقة {i + 1}</span>
            <RowTools
              canUp={i > 0}
              canDown={i < items.length - 1}
              onUp={() => setItems(move(items, i, -1))}
              onDown={() => setItems(move(items, i, 1))}
              onDelete={() => setItems(items.filter((_, j) => j !== i))}
            />
          </div>
          <IconPicker value={item.icon} onChange={(v) => setItem(i, 'icon', v)} />
          <BiField label="العنوان" ar={item.title} en={item.title_en} onAr={(v) => setItem(i, 'title', v)} onEn={(v) => setItem(i, 'title_en', v)} />
          <BiField label="النص المختصر" textarea ar={item.text} en={item.text_en} onAr={(v) => setItem(i, 'text', v)} onEn={(v) => setItem(i, 'text_en', v)} />

          <div className="field">
            <label>لون النافذة (تدرّج)</label>
            <div className="accent-row">
              <input type="color" value={(item.accent && item.accent[0]) || '#1e88e5'} onChange={(e) => setAccent(i, 0, e.target.value)} />
              <input type="color" value={(item.accent && item.accent[1]) || '#43a047'} onChange={(e) => setAccent(i, 1, e.target.value)} />
            </div>
          </div>

          <BiField label="شعار النافذة" ar={item.tagline} en={item.tagline_en} onAr={(v) => setItem(i, 'tagline', v)} onEn={(v) => setItem(i, 'tagline_en', v)} />
          <BiField label="نظرة عامة" textarea ar={item.overview} en={item.overview_en} onAr={(v) => setItem(i, 'overview', v)} onEn={(v) => setItem(i, 'overview_en', v)} />
          <BiList label="كيف ندعمها" ar={item.support} en={item.support_en} onAr={(v) => setItem(i, 'support', v)} onEn={(v) => setItem(i, 'support_en', v)} />
        </div>
      ))}
      <AddBtn label="إضافة بطاقة" onClick={() => setItems([...items, clone(blank)])} />
      <SaveBtn busy={saving} onClick={onSave} />
    </Card>
  );
}
