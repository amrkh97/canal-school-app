import { useState } from 'react';
import { api } from '../../api.js';

// Deep-clone plain JSON (safe for content objects).
export const clone = (o) => (o == null ? o : JSON.parse(JSON.stringify(o)));

// Drop blank lines from a list edited as one-item-per-line.
export const cleanList = (arr) => (Array.isArray(arr) ? arr.filter((s) => String(s).trim() !== '') : []);

// Move an array item up (-1) or down (+1); returns a new array.
export function move(arr, i, dir) {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const copy = arr.slice();
  [copy[i], copy[j]] = [copy[j], copy[i]];
  return copy;
}

export function Card({ title, children }) {
  return (
    <section className="edit-card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function Field({ label, value, onChange, textarea, dir, placeholder, hint, type }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {textarea ? (
        <textarea value={value ?? ''} dir={dir} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} rows="3" />
      ) : (
        <input value={value ?? ''} dir={dir} type={type || 'text'} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint && <small className="hint">{hint}</small>}
    </div>
  );
}

// A bilingual field: Arabic + English inputs side by side.
export function BiField({ label, ar, en, onAr, onEn, textarea }) {
  return (
    <div className="bi-field">
      {label && <span className="bi-label">{label}</span>}
      <div className="bi-row">
        <Field label="عربي" value={ar} onChange={onAr} textarea={textarea} dir="rtl" />
        <Field label="English" value={en} onChange={onEn} textarea={textarea} dir="ltr" />
      </div>
    </div>
  );
}

// A bilingual list (one item per line): Arabic + English textareas.
// Stores raw lines while typing; callers run cleanList() before saving.
export function BiList({ label, ar, en, onAr, onEn }) {
  return (
    <div className="bi-field">
      {label && (
        <span className="bi-label">
          {label} <small className="hint">(كل سطر عنصر)</small>
        </span>
      )}
      <div className="bi-row">
        <Field label="عربي" value={(ar || []).join('\n')} onChange={(v) => onAr(v.split('\n'))} textarea dir="rtl" />
        <Field label="English" value={(en || []).join('\n')} onChange={(v) => onEn(v.split('\n'))} textarea dir="ltr" />
      </div>
    </div>
  );
}

// Up / down / delete controls for a repeatable row.
export function RowTools({ onUp, onDown, onDelete, canUp, canDown }) {
  return (
    <div className="row-tools">
      <button type="button" className="row-btn" onClick={onUp} disabled={!canUp} aria-label="up">
        <i className="fas fa-arrow-up"></i>
      </button>
      <button type="button" className="row-btn" onClick={onDown} disabled={!canDown} aria-label="down">
        <i className="fas fa-arrow-down"></i>
      </button>
      {onDelete && (
        <button type="button" className="mini-del" onClick={onDelete}>
          <i className="fas fa-trash"></i>
        </button>
      )}
    </div>
  );
}

export function SaveBtn({ busy, onClick, label }) {
  return (
    <button className="btn save-btn" onClick={onClick} disabled={busy}>
      {busy ? 'جاري الحفظ…' : label || 'حفظ'}
    </button>
  );
}

export function Toast({ msg }) {
  if (!msg) return null;
  const ok = !/^خطأ/.test(msg);
  return <div className={`save-toast ${ok ? '' : 'error'}`}>{msg}</div>;
}

export function AddBtn({ onClick, label }) {
  return (
    <button type="button" className="add-btn" onClick={onClick}>
      <i className="fas fa-plus"></i> {label}
    </button>
  );
}

// Shared save hook: persists one content section and shows a toast.
export function useSave(onSaved) {
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  async function save(key, value, label) {
    setSaving(true);
    setMsg('');
    try {
      await api.saveSection(key, value);
      setMsg(`تم حفظ "${label}" بنجاح ✓`);
      onSaved && onSaved();
    } catch (e) {
      setMsg('خطأ: ' + e.message);
    } finally {
      setSaving(false);
    }
  }
  return { saving, msg, save, setMsg };
}
