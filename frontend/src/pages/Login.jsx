import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit}>
        <img src="/logo.png" alt="شعار المدرسة" className="login-logo" />
        <h1>لوحة تحكم المدرسة</h1>
        <p className="login-sub">سجّل الدخول لإدارة محتوى الموقع</p>

        <label>اسم المستخدم</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />

        <label>كلمة المرور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="form-msg error">{error}</p>}

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'جاري الدخول…' : 'تسجيل الدخول'}
        </button>

        <Link to="/" className="back-home">
          <i className="fas fa-arrow-right"></i> العودة للموقع
        </Link>
      </form>
    </div>
  );
}
