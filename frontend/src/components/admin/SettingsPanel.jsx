import { useState } from 'react';
import { api } from '../../api.js';
import { Card, Field, Toast } from './fields.jsx';

export default function SettingsPanel() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (next.length < 6) {
      setMsg('خطأ: كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    if (next !== confirm) {
      setMsg('خطأ: كلمتا المرور غير متطابقتين');
      return;
    }
    setBusy(true);
    try {
      await api.changePassword(current, next);
      setMsg('تم تغيير كلمة المرور بنجاح ✓');
      setCurrent('');
      setNext('');
      setConfirm('');
    } catch (err) {
      setMsg('خطأ: ' + err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="editor">
      <Card title="تغيير كلمة المرور">
        <Toast msg={msg} />
        <form onSubmit={submit}>
          <Field label="كلمة المرور الحالية" value={current} onChange={setCurrent} type="password" dir="ltr" />
          <Field label="كلمة المرور الجديدة" value={next} onChange={setNext} type="password" dir="ltr" />
          <Field label="تأكيد كلمة المرور الجديدة" value={confirm} onChange={setConfirm} type="password" dir="ltr" />
          <button className="btn save-btn" disabled={busy}>
            {busy ? 'جاري الحفظ…' : 'تغيير كلمة المرور'}
          </button>
        </form>
      </Card>
    </div>
  );
}
