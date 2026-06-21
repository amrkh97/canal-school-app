import { useState } from 'react';
import SectionTitle from './SectionTitle.jsx';
import MapEmbed from './MapEmbed.jsx';
import { api } from '../api.js';
import { useUi, localized } from '../context/UiContext.jsx';

const empty = { name: '', email: '', phone: '', body: '' };

export default function Contact({ contact }) {
  const { t, lang } = useUi();
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState(null); // 'sending' | 'ok' | 'error'
  const [error, setError] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await api.sendMessage(form);
      setStatus('ok');
      setForm(empty);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <SectionTitle>{t('contactTitle')}</SectionTitle>
        <div className="contact-content">
          <div className="contact-info" data-reveal>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>{t('addressLabel')}</h3>
                <p>{localized(contact, 'address', lang)}</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone-alt"></i>
              <div>
                <h3>{t('phoneLabel')}</h3>
                <p dir="ltr">{contact.phone}</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>{t('emailLabel')}</h3>
                <p dir="ltr">{contact.email}</p>
              </div>
            </div>
          </div>

          <div className="contact-form" data-reveal>
            <h3>{t('sendMsgTitle')}</h3>
            <form onSubmit={submit}>
              <input name="name" value={form.name} onChange={update} placeholder={t('fName')} required />
              <input name="email" type="email" value={form.email} onChange={update} placeholder={t('fEmail')} required />
              <input name="phone" type="tel" value={form.phone} onChange={update} placeholder={t('fPhone')} />
              <textarea name="body" value={form.body} onChange={update} placeholder={t('fMessage')} rows="5" required />
              <button type="submit" className="btn" disabled={status === 'sending'}>
                {status === 'sending' ? t('sending') : t('send')}
              </button>

              {status === 'ok' && <p className="form-msg success">{t('msgSuccess')}</p>}
              {status === 'error' && <p className="form-msg error">{error}</p>}
            </form>
          </div>
        </div>

        <MapEmbed />
      </div>
    </section>
  );
}
