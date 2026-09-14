import { createContext, useContext, useState, useEffect } from 'react';
import api, { setAccessToken } from '../services/api';
import { Children } from 'react';

const AuthContext = createContext(null);

export const AuthPorvider = ({Children}) => {
    conset [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

      useEffect(() => {
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
    refresh();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, passowrd});
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    await api.post ('/auth/logout');
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout}}>
        {Children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
