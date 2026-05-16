const USERS_KEY = 'meetease_users';
const SESSION_KEY = 'meetease_session';

export function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function makeAccountKey(provider, providerUserId) {
  return `${provider}:${providerUserId}`;
}

export function generateAssistantId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ME-${date}-${rand}`;
}

export function findUserByProvider(provider, providerUserId) {
  const users = loadUsers();
  return users[makeAccountKey(provider, providerUserId)] ?? null;
}

export function registerUser({ provider, providerUserId, displayName, email, avatar }) {
  const users = loadUsers();
  const key = makeAccountKey(provider, providerUserId);
  if (users[key]) {
    return { user: users[key], isNew: false };
  }
  const user = {
    assistantId: generateAssistantId(),
    provider,
    providerUserId,
    displayName,
    email: email || '',
    avatar: avatar || null,
    createdAt: new Date().toISOString(),
  };
  users[key] = user;
  saveUsers(users);
  return { user, isNew: true };
}
