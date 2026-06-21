import { useState } from 'react';
import IconPicker from '../IconPicker.jsx';
import { Card, BiField, SaveBtn, Toast, AddBtn, RowTools, useSave, clone, move } from '../fields.jsx';

const blank = { icon: 'shapes', title: '', title_en: '', age: '', age_en: '', text: '', text_en: '' };

export default function StagesEditor({ data, onSaved }) {
  const [stages, setStages] = useState(Array.isArray(data) ? clone(data) : []);
  const { saving, msg, save } = useSave(onSaved);
  const setItem = (i, k, v) => setStages(stages.map((it, j) => (j === i ? { ...it, [k]: v } : it)));

  return (
    <Card title="المراحل التعليمية">
      <Toast msg={msg} />
      {stages.map((s, i) => (
        <div className="feature-row" key={i}>
          <div className="feature-row-head">
            <span>مرحلة {i + 1}</span>
            <RowTools
              canUp={i > 0}
              canDown={i < stages.length - 1}
              onUp={() => setStages(move(stages, i, -1))}
              onDown={() => setStages(move(stages, i, 1))}
              onDelete={() => setStages(stages.filter((_, j) => j !== i))}
            />
          </div>
          <IconPicker value={s.icon} onChange={(v) => setItem(i, 'icon', v)} />
          <BiField label="الاسم" ar={s.title} en={s.title_en} onAr={(v) => setItem(i, 'title', v)} onEn={(v) => setItem(i, 'title_en', v)} />
          <BiField label="الصفوف" ar={s.age} en={s.age_en} onAr={(v) => setItem(i, 'age', v)} onEn={(v) => setItem(i, 'age_en', v)} />
          <BiField label="الوصف" textarea ar={s.text} en={s.text_en} onAr={(v) => setItem(i, 'text', v)} onEn={(v) => setItem(i, 'text_en', v)} />
        </div>
      ))}
      <AddBtn label="إضافة مرحلة" onClick={() => setStages([...stages, { ...blank }])} />
      <SaveBtn busy={saving} onClick={() => save('stages', stages, 'المراحل')} />
    </Card>
  );
}
