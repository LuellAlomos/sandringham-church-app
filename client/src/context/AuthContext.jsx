import { createContext, useContext, useState, useEffect } from 'react';
import api, { setAccessToken } from '../services/api';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);
 useEffect(() => {
   let mounted = true;
   const refresh = async () => {
     try {
       const res = await api.post('/auth/refresh');
       if (!mounted) return;
       setAccessToken(res.data.accessToken);
       const profile = await api.get('/users/profile');
       if (!mounted) return;
       setUser(profile.data.user);
     } catch {
       if (!mounted) return;
       setUser(null);
     } finally {
       if (!mounted) return;
       setLoading(false);
     }
   };
   refresh();
   return () => { mounted = false; };
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