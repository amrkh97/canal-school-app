import { useState } from 'react';
import { Card, BiField, BiList, SaveBtn, Toast, useSave, clone, cleanList } from '../fields.jsx';

export default function AboutEditor({ data, onSaved }) {
  const [about, setAbout] = useState(clone(data) || {});
  const { saving, msg, save } = useSave(onSaved);
  const set = (k, v) => setAbout({ ...about, [k]: v });

  function onSave() {
    save(
      'about',
      {
        ...about,
        paragraphs: cleanList(about.paragraphs),
        paragraphs_en: cleanList(about.paragraphs_en),
        features: cleanList(about.features),
        features_en: cleanList(about.features_en),
      },
      'عن المدرسة'
    );
  }

  return (
    <Card title="عن المدرسة">
      <Toast msg={msg} />
      <BiField label="العنوان الفرعي" ar={about.heading} en={about.heading_en} onAr={(v) => set('heading', v)} onEn={(v) => set('heading_en', v)} />
      <BiField label="شارة الفيديو" ar={about.videoBadge} en={about.videoBadge_en} onAr={(v) => set('videoBadge', v)} onEn={(v) => set('videoBadge_en', v)} />
      <BiList label="الفقرات" ar={about.paragraphs} en={about.paragraphs_en} onAr={(v) => set('paragraphs', v)} onEn={(v) => set('paragraphs_en', v)} />
      <BiList label="المميزات" ar={about.features} en={about.features_en} onAr={(v) => set('features', v)} onEn={(v) => set('features_en', v)} />
      <SaveBtn busy={saving} onClick={onSave} />
    </Card>
  );
}
