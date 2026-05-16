import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { loginProviders, providerMockProfiles } from '../data/authProviders';
import {
  clearSession,
  findUserByProvider,
  loadSession,
  registerUser,
  saveSession,
} from '../utils/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [lastLoginMeta, setLastLoginMeta] = useState(null);

  useEffect(() => {
    const session = loadSession();
    if (session?.assistantId) {
      const existing = findUserByProvider(session.provider, session.providerUserId);
      setUser(existing || session);
    }
    setLoading(false);
  }, []);

  const loginWithProvider = useCallback(async (providerId) => {
    const provider = loginProviders.find((p) => p.id === providerId);
    if (!provider) {
      throw new Error('不支持的登录方式');
    }

    const profile = providerMockProfiles[providerId];
    if (!profile) {
      throw new Error('登录配置缺失');
    }

    setLoginLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    const { user: account, isNew } = registerUser({
      provider: providerId,
      providerUserId: profile.providerUserId,
      displayName: profile.displayName,
      email: profile.email,
      avatar: profile.avatar,
    });

    const session = {
      ...account,
      providerName: provider.name,
    };
    saveSession(session);
    setUser(session);
    setLastLoginMeta({ isNew, providerName: provider.name });
    setLoginLoading(false);

    return { user: session, isNew };
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    setLastLoginMeta(null);
  }, []);

  const clearLoginMeta = useCallback(() => setLastLoginMeta(null), []);

  const value = useMemo(
    () => ({
      user,
      loading,
      loginLoading,
      lastLoginMeta,
      isAuthenticated: !!user,
      loginWithProvider,
      logout,
      clearLoginMeta,
      providers: loginProviders,
    }),
    [user, loading, loginLoading, lastLoginMeta, loginWithProvider, logout, clearLoginMeta]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
