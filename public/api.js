/* ══════════════════════════════════════════
   DELHI 6 — API Service Layer
   Connects frontend to Express backend
   ══════════════════════════════════════════ */

const API_BASE = window.location.origin + '/api';

/* ── Token helpers ── */
function getToken() {
  return localStorage.getItem('delhi6_token');
}
function setToken(token) {
  localStorage.setItem('delhi6_token', token);
}
function removeToken() {
  localStorage.removeItem('delhi6_token');
}
function getSavedUser() {
  const u = localStorage.getItem('delhi6_user');
  return u ? JSON.parse(u) : null;
}
function setSavedUser(user) {
  localStorage.setItem('delhi6_user', JSON.stringify(user));
}
function removeSavedUser() {
  localStorage.removeItem('delhi6_user');
}

/* ── Core fetch wrapper ── */
async function apiFetch(endpoint, options = {}) {
  const url = API_BASE + endpoint;
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = getToken();
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      const errMsg = data.message || data.errors?.[0]?.msg || 'Something went wrong';
      throw { status: res.status, message: errMsg, data };
    }

    return data;
  } catch (err) {
    if (err.status) throw err; // already formatted
    console.error('API fetch error:', err);
    throw { status: 0, message: 'Network error. Please check your connection.' };
  }
}

/* ── Convenience methods ── */
const api = {
  get:    (ep)       => apiFetch(ep, { method: 'GET' }),
  post:   (ep, body) => apiFetch(ep, { method: 'POST', body }),
  put:    (ep, body) => apiFetch(ep, { method: 'PUT', body }),
  delete: (ep, body) => apiFetch(ep, { method: 'DELETE', body }),

  /* ── Auth ── */
  auth: {
    register(data) { return api.post('/auth/register', data); },
    login(data)    { return api.post('/auth/login', data); },
    google(data)   { return api.post('/auth/google', data); },
    getMe()        { return api.get('/auth/me'); },
    updateProfile(data) { return api.put('/auth/update-profile', data); },
    changePassword(data) { return api.put('/auth/change-password', data); },
  },

  /* ── Activities ── */
  activities: {
    list(params = {}) {
      const qs = new URLSearchParams(params).toString();
      return api.get('/activities' + (qs ? '?' + qs : ''));
    },
    get(idOrSlug) { return api.get('/activities/' + idOrSlug); },
    types()       { return api.get('/activities/types/list'); },
  },

  /* ── Time Slots ── */
  timeslots: {
    list(activityId, date) {
      const params = new URLSearchParams({ activity: activityId });
      if (date) params.set('date', date);
      return api.get('/timeslots?' + params.toString());
    },
  },

  /* ── Bookings ── */
  bookings: {
    create(data)      { return api.post('/bookings', data); },
    getMy(params = {}) {
      const qs = new URLSearchParams(params).toString();
      return api.get('/bookings/my' + (qs ? '?' + qs : ''));
    },
    get(id)           { return api.get('/bookings/' + id); },
    confirm(id, data) { return api.post('/bookings/' + id + '/confirm', data); },
    cancel(id, reason){ return api.put('/bookings/' + id + '/cancel', { reason }); },
  },

  /* ── Payments ── */
  payments: {
    createOrder(bookingId) { return api.post('/payments/create-order', { bookingId }); },
    verify(data)           { return api.post('/payments/verify', data); },
  },

  /* ── Reviews ── */
  reviews: {
    list(activityId, params = {}) {
      const qs = new URLSearchParams({ activity: activityId, ...params }).toString();
      return api.get('/reviews?' + qs);
    },
    create(data) { return api.post('/reviews', data); },
  },
};
