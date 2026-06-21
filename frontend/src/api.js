// Tiny fetch wrapper for talking to the backend.
// In dev, Vite proxies "/api" to the backend. In production (Docker), nginx
// proxies "/api" to the backend container. So a relative base works everywhere.
const BASE = import.meta.env.VITE_API_BASE || '';

function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res) {
  const isJson = (res.headers.get('content-type') || '').includes('application/json');
  const data = isJson ? await res.json() : await res.text();
  if (!res.ok) {
    throw new Error((data && data.error) || 'حدث خطأ في الاتصال بالخادم');
  }
  return data;
}

export const api = {
  // --- public ---
  getContent: () => fetch(`${BASE}/api/content`).then(handle),
  sendMessage: (payload) =>
    fetch(`${BASE}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(handle),

  // --- auth ---
  login: (username, password) =>
    fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(handle),
  me: () => fetch(`${BASE}/api/auth/me`, { headers: authHeaders() }).then(handle),
  changePassword: (currentPassword, newPassword) =>
    fetch(`${BASE}/api/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ currentPassword, newPassword }),
    }).then(handle),

  // --- public lists ---
  getNews: () => fetch(`${BASE}/api/news`).then(handle),
  getStaff: () => fetch(`${BASE}/api/staff`).then(handle),
  getTestimonials: () => fetch(`${BASE}/api/testimonials`).then(handle),
  sendApplication: (payload) =>
    fetch(`${BASE}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(handle),

  // --- admin: news ---
  addNews: (formData) =>
    fetch(`${BASE}/api/news`, { method: 'POST', headers: { ...authHeaders() }, body: formData }).then(handle),
  deleteNews: (id) =>
    fetch(`${BASE}/api/news/${id}`, { method: 'DELETE', headers: authHeaders() }).then(handle),
  // --- admin: staff ---
  addStaff: (formData) =>
    fetch(`${BASE}/api/staff`, { method: 'POST', headers: { ...authHeaders() }, body: formData }).then(handle),
  deleteStaff: (id) =>
    fetch(`${BASE}/api/staff/${id}`, { method: 'DELETE', headers: authHeaders() }).then(handle),
  // --- admin: testimonials --- (FormData; optional `image` field)
  addTestimonial: (formData) =>
    fetch(`${BASE}/api/testimonials`, { method: 'POST', headers: { ...authHeaders() }, body: formData }).then(handle),
  deleteTestimonial: (id) =>
    fetch(`${BASE}/api/testimonials/${id}`, { method: 'DELETE', headers: authHeaders() }).then(handle),
  // --- admin: applications ---
  getApplications: () => fetch(`${BASE}/api/applications`, { headers: authHeaders() }).then(handle),
  markApplicationRead: (id) =>
    fetch(`${BASE}/api/applications/${id}/read`, { method: 'PATCH', headers: authHeaders() }).then(handle),
  deleteApplication: (id) =>
    fetch(`${BASE}/api/applications/${id}`, { method: 'DELETE', headers: authHeaders() }).then(handle),

  // --- admin: content ---
  saveSection: (section, value) =>
    fetch(`${BASE}/api/content/${section}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(value),
    }).then(handle),

  // --- admin: gallery ---
  uploadImage: (file, caption, captionEn) => {
    const form = new FormData();
    form.append('image', file);
    form.append('caption', caption || '');
    form.append('caption_en', captionEn || '');
    return fetch(`${BASE}/api/gallery`, {
      method: 'POST',
      headers: { ...authHeaders() },
      body: form,
    }).then(handle);
  },
  deleteImage: (id) =>
    fetch(`${BASE}/api/gallery/${id}`, { method: 'DELETE', headers: authHeaders() }).then(handle),

  // --- admin: messages ---
  getMessages: () => fetch(`${BASE}/api/messages`, { headers: authHeaders() }).then(handle),
  markRead: (id) =>
    fetch(`${BASE}/api/messages/${id}/read`, { method: 'PATCH', headers: authHeaders() }).then(handle),
  deleteMessage: (id) =>
    fetch(`${BASE}/api/messages/${id}`, { method: 'DELETE', headers: authHeaders() }).then(handle),
};

// Build a usable image URL. Absolute URLs (http/https) are returned as-is;
// backend-relative paths (e.g. /uploads/..) get the API base prepended.
export const mediaUrl = (p) => {
  if (!p) return '';
  if (/^https?:\/\//i.test(p)) return p;
  return `${BASE}${p}`;
};
