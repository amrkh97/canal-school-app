import { useState } from 'react';
import { Card, BiField, SaveBtn, Toast, useSave, clone } from '../fields.jsx';

export default function HeroEditor({ data, onSaved }) {
  const [hero, setHero] = useState(clone(data) || {});
  const { saving, msg, save } = useSave(onSaved);
  const set = (k, v) => setHero({ ...hero, [k]: v });

  return (
    <Card title="القسم الرئيسي (Hero)">
      <Toast msg={msg} />
      <BiField label="العنوان" ar={hero.title} en={hero.title_en} onAr={(v) => set('title', v)} onEn={(v) => set('title_en', v)} />
      <BiField label="الوصف" textarea ar={hero.subtitle} en={hero.subtitle_en} onAr={(v) => set('subtitle', v)} onEn={(v) => set('subtitle_en', v)} />
      <BiField label="نص الزر" ar={hero.ctaLabel} en={hero.ctaLabel_en} onAr={(v) => set('ctaLabel', v)} onEn={(v) => set('ctaLabel_en', v)} />
      <SaveBtn busy={saving} onClick={() => save('hero', hero, 'القسم الرئيسي')} />
    </Card>
  );
}
