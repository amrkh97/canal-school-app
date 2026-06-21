import { useState } from 'react';
import { Card, Field, BiField, SaveBtn, Toast, useSave, clone } from '../fields.jsx';

const SOCIALS = ['facebook', 'twitter', 'instagram', 'youtube'];

export default function ContactEditor({ data, onSaved }) {
  const [contact, setContact] = useState(clone(data) || { socials: {} });
  const { saving, msg, save } = useSave(onSaved);
  const set = (k, v) => setContact({ ...contact, [k]: v });
  const setSocial = (k, v) => setContact({ ...contact, socials: { ...(contact.socials || {}), [k]: v } });

  return (
    <Card title="معلومات التواصل">
      <Toast msg={msg} />
      <BiField label="العنوان" textarea ar={contact.address} en={contact.address_en} onAr={(v) => set('address', v)} onEn={(v) => set('address_en', v)} />
      <Field label="الهاتف" value={contact.phone} onChange={(v) => set('phone', v)} dir="ltr" />
      <Field label="البريد الإلكتروني" value={contact.email} onChange={(v) => set('email', v)} dir="ltr" />
      <span className="bi-label">روابط التواصل الاجتماعي (تظهر فقط عند إدخال رابط فعلي)</span>
      <div className="grid-2">
        {SOCIALS.map((k) => (
          <Field key={k} label={k} value={(contact.socials && contact.socials[k]) || ''} onChange={(v) => setSocial(k, v)} dir="ltr" placeholder="https://" />
        ))}
      </div>
      <SaveBtn busy={saving} onClick={() => save('contact', contact, 'التواصل')} />
    </Card>
  );
}
