import { useState } from 'react';
import SectionTitle from './SectionTitle.jsx';
import { api } from '../api.js';
import { useUi, localized, localizedList } from '../context/UiContext.jsx';

const empty = { student_name: '', parent_name: '', phone: '', email: '', grade: '', notes: '' };

export default function Admissions({ admissions }) {
  const { t, lang } = useUi();
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  if (!admissions) return null;
  const notes = localizedList(admissions, 'notes', lang);
  const fees = Array.isArray(admissions.fees) ? admissions.fees : [];
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await api.sendApplication(form);
      setStatus('ok');
      setForm(empty);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  return (
    <section id="admissions" className="admissions">
      <div className="container">
        <SectionTitle>{localized(admissions, 'heading', lang) || t('admissionsTitle')}</SectionTitle>
        <div className="admissions-grid">
          {/* Info */}
          <div className="admissions-info" data-reveal>
            <p className="admissions-intro">{localized(admissions, 'intro', lang)}</p>

            {fees.length > 0 && (
              <table className="fees-table">
                <thead>
                  <tr>
                    <th>{t('feesGrade')}</th>
                    <th>{t('feesAmount')}</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((f, i) => (
                    <tr key={i}>
                      <td>{localized(f, 'grade', lang)}</td>
                      <td className="fee-amount">{localized(f, 'amount', lang)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {notes.length > 0 && (
              <ul className="admissions-notes">
                {notes.map((n, i) => (
                  <li key={i}>
                    <i className="fas fa-circle-info"></i> {n}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Apply form */}
          <div className="apply-form" data-reveal>
            <h3>{t('applyTitle')}</h3>
            <form onSubmit={submit}>
              <input name="student_name" value={form.student_name} onChange={update} placeholder={t('studentName')} required />
              <input name="parent_name" value={form.parent_name} onChange={update} placeholder={t('parentName')} required />
              <input name="phone" type="tel" value={form.phone} onChange={update} placeholder={t('fPhone')} required />
              <input name="email" type="email" value={form.email} onChange={update} placeholder={t('fEmail')} />
              <input name="grade" value={form.grade} onChange={update} placeholder={t('grade')} />
              <textarea name="notes" value={form.notes} onChange={update} placeholder={t('notes')} rows="3" />
              <button type="submit" className="btn" disabled={status === 'sending'}>
                {status === 'sending' ? t('sending') : t('submitApply')}
              </button>
              {status === 'ok' && <p className="form-msg success">{t('applySuccess')}</p>}
              {status === 'error' && <p className="form-msg error">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
