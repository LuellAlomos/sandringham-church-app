import { createContext, useContext, useState, useEffect } from 'react';
import api, { setAccessToken } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Just set loading to false immediately
    // Only try to refresh token silently in background
    const refresh = async () => {
      try {
        const res = await api.post('/auth/refresh');
        setAccessToken(res.data.accessToken);
        const profile = await api.get('/users/profile');
        setUser(profile.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Set loading false after 3 seconds max regardless
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    refresh().finally(() => {
      clearTimeout(timeout);
    });

    return () => clearTimeout(timeout);
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {}
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);