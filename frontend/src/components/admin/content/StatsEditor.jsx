import { useState } from 'react';
import IconPicker from '../IconPicker.jsx';
import { Card, Field, BiField, SaveBtn, Toast, AddBtn, RowTools, useSave, clone, move } from '../fields.jsx';

const blank = { icon: 'star', value: 0, suffix: '+', label: '', label_en: '' };

export default function StatsEditor({ data, onSaved }) {
  const [stats, setStats] = useState(Array.isArray(data) ? clone(data) : []);
  const { saving, msg, save } = useSave(onSaved);
  const setItem = (i, k, v) => setStats(stats.map((it, j) => (j === i ? { ...it, [k]: v } : it)));

  function onSave() {
    // Coerce the value to a number before saving.
    save('stats', stats.map((s) => ({ ...s, value: Number(s.value) || 0 })), 'الأرقام');
  }

  return (
    <Card title="الأرقام والإحصائيات">
      <Toast msg={msg} />
      {stats.map((s, i) => (
        <div className="feature-row" key={i}>
          <div className="feature-row-head">
            <span>رقم {i + 1}</span>
            <RowTools
              canUp={i > 0}
              canDown={i < stats.length - 1}
              onUp={() => setStats(move(stats, i, -1))}
              onDown={() => setStats(move(stats, i, 1))}
              onDelete={() => setStats(stats.filter((_, j) => j !== i))}
            />
          </div>
          <IconPicker value={s.icon} onChange={(v) => setItem(i, 'icon', v)} />
          <div className="grid-2">
            <Field label="القيمة (رقم)" type="number" value={s.value} onChange={(v) => setItem(i, 'value', v)} dir="ltr" />
            <Field label="اللاحقة (مثل +)" value={s.suffix} onChange={(v) => setItem(i, 'suffix', v)} dir="ltr" />
          </div>
          <BiField label="التسمية" ar={s.label} en={s.label_en} onAr={(v) => setItem(i, 'label', v)} onEn={(v) => setItem(i, 'label_en', v)} />
        </div>
      ))}
      <AddBtn label="إضافة رقم" onClick={() => setStats([...stats, { ...blank }])} />
      <SaveBtn busy={saving} onClick={onSave} />
    </Card>
  );
}
