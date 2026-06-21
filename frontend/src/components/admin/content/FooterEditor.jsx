import { useState } from 'react';
import { Card, BiField, SaveBtn, Toast, useSave, clone } from '../fields.jsx';

export default function FooterEditor({ data, onSaved }) {
  const [footer, setFooter] = useState(clone(data) || {});
  const { saving, msg, save } = useSave(onSaved);
  const set = (k, v) => setFooter({ ...footer, [k]: v });

  return (
    <Card title="التذييل (Footer)">
      <Toast msg={msg} />
      <BiField label="الشعار النصي" ar={footer.tagline} en={footer.tagline_en} onAr={(v) => set('tagline', v)} onEn={(v) => set('tagline_en', v)} />
      <BiField label="حقوق النشر" ar={footer.copyright} en={footer.copyright_en} onAr={(v) => set('copyright', v)} onEn={(v) => set('copyright_en', v)} />
      <SaveBtn busy={saving} onClick={() => save('footer', footer, 'التذييل')} />
    </Card>
  );
}
