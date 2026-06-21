import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api.js';
import ContentEditor from '../components/admin/ContentEditor.jsx';
import SectionsManager from '../components/admin/SectionsManager.jsx';
import NewsManager from '../components/admin/NewsManager.jsx';
import StaffManager from '../components/admin/StaffManager.jsx';
import TestimonialsManager from '../components/admin/TestimonialsManager.jsx';
import GalleryManager from '../components/admin/GalleryManager.jsx';
import MessagesInbox from '../components/admin/MessagesInbox.jsx';
import ApplicationsInbox from '../components/admin/ApplicationsInbox.jsx';
import SettingsPanel from '../components/admin/SettingsPanel.jsx';

const TABS = [
  { id: 'content', label: 'المحتوى', icon: 'fa-pen-to-square' },
  { id: 'sections', label: 'الأقسام', icon: 'fa-layer-group' },
  { id: 'news', label: 'الأخبار', icon: 'fa-newspaper' },
  { id: 'staff', label: 'فريق العمل', icon: 'fa-user-tie' },
  { id: 'testimonials', label: 'الآراء', icon: 'fa-quote-right' },
  { id: 'gallery', label: 'معرض الصور', icon: 'fa-images' },
  { id: 'messages', label: 'الرسائل', icon: 'fa-envelope' },
  { id: 'applications', label: 'طلبات الالتحاق', icon: 'fa-file-lines' },
  { id: 'settings', label: 'الإعدادات', icon: 'fa-gear' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('content');
  const [content, setContent] = useState(null);
  const [unread, setUnread] = useState(0);
  const [appsUnread, setAppsUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  async function reload() {
    const [c, m, a] = await Promise.all([
      api.getContent(),
      api.getMessages().catch(() => ({ unread: 0 })),
      api.getApplications().catch(() => ({ unread: 0 })),
    ]);
    setContent(c);
    setUnread(m.unread || 0);
    setAppsUnread(a.unread || 0);
    setLoading(false);
  }

  useEffect(() => {
    reload();
  }, []);

  function signOut() {
    logout();
    navigate('/admin/login');
  }

  const badges = { messages: unread, applications: appsUnread };

  return (
    <div className="dash">
      <header className="dash-header">
        <div className="dash-brand">
          <img src="/logo.png" alt="شعار" />
          <span>لوحة تحكم مدرسة القناة</span>
        </div>
        <div className="dash-actions">
          <a href="/" target="_blank" rel="noreferrer" className="dash-view">
            <i className="fas fa-up-right-from-square"></i> عرض الموقع
          </a>
          <span className="dash-user">مرحباً، {user?.username}</span>
          <button className="dash-logout" onClick={signOut}>
            <i className="fas fa-right-from-bracket"></i> خروج
          </button>
        </div>
      </header>

      <nav className="dash-tabs">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => setTab(t.id)}>
            <i className={`fas ${t.icon}`}></i> {t.label}
            {badges[t.id] > 0 && <span className="badge">{badges[t.id]}</span>}
          </button>
        ))}
      </nav>

      <main className="dash-body">
        {loading || !content ? (
          <div className="page-loading">جاري التحميل…</div>
        ) : tab === 'content' ? (
          <ContentEditor content={content} onSaved={reload} />
        ) : tab === 'sections' ? (
          <SectionsManager sections={content.sections} onSaved={reload} />
        ) : tab === 'news' ? (
          <NewsManager />
        ) : tab === 'staff' ? (
          <StaffManager />
        ) : tab === 'testimonials' ? (
          <TestimonialsManager />
        ) : tab === 'gallery' ? (
          <GalleryManager gallery={content.gallery || []} onChanged={reload} />
        ) : tab === 'messages' ? (
          <MessagesInbox onChanged={reload} />
        ) : tab === 'applications' ? (
          <ApplicationsInbox onChanged={reload} />
        ) : (
          <SettingsPanel />
        )}
      </main>
    </div>
  );
}
