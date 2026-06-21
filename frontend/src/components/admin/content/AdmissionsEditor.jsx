import { useState } from 'react';
import { Card, BiField, BiList, SaveBtn, Toast, AddBtn, RowTools, useSave, clone, move, cleanList } from '../fields.jsx';

export default function AdmissionsEditor({ data, onSaved }) {
  const [adm, setAdm] = useState(clone(data) || { fees: [], notes: [], notes_en: [] });
  const { saving, msg, save } = useSave(onSaved);
  const set = (k, v) => setAdm({ ...adm, [k]: v });
  const fees = adm.fees || [];
  const setFees = (f) => set('fees', f);
  const setFee = (i, k, v) => setFees(fees.map((it, j) => (j === i ? { ...it, [k]: v } : it)));

  function onSave() {
    save('admissions', { ...adm, notes: cleanList(adm.notes), notes_en: cleanList(adm.notes_en) }, 'القبول');
  }

  return (
    <Card title="القبول والمصروفات">
      <Toast msg={msg} />
      <BiField label="العنوان" ar={adm.heading} en={adm.heading_en} onAr={(v) => set('heading', v)} onEn={(v) => set('heading_en', v)} />
      <BiField label="المقدمة" textarea ar={adm.intro} en={adm.intro_en} onAr={(v) => set('intro', v)} onEn={(v) => set('intro_en', v)} />

      <span className="bi-label">جدول المصروفات</span>
      {fees.map((f, i) => (
        <div className="feature-row" key={i}>
          <div className="feature-row-head">
            <span>صف {i + 1}</span>
            <RowTools
              canUp={i > 0}
              canDown={i < fees.length - 1}
              onUp={() => setFees(move(fees, i, -1))}
              onDown={() => setFees(move(fees, i, 1))}
              onDelete={() => setFees(fees.filter((_, j) => j !== i))}
            />
          </div>
          <BiField label="المرحلة" ar={f.grade} en={f.grade_en} onAr={(v) => setFee(i, 'grade', v)} onEn={(v) => setFee(i, 'grade_en', v)} />
          <BiField label="المصروفات" ar={f.amount} en={f.amount_en} onAr={(v) => setFee(i, 'amount', v)} onEn={(v) => setFee(i, 'amount_en', v)} />
        </div>
      ))}
      <AddBtn label="إضافة صف" onClick={() => setFees([...fees, { grade: '', grade_en: '', amount: '', amount_en: '' }])} />

      <BiList label="ملاحظات" ar={adm.notes} en={adm.notes_en} onAr={(v) => set('notes', v)} onEn={(v) => set('notes_en', v)} />
      <SaveBtn busy={saving} onClick={onSave} />
    </Card>
  );
}
