import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost5000/api:',
    withCredentials: true
});

let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const orginal = error.config;
        if(error.response?.status === 401 && !orginal._retry) {
            orginal._retry = true;
            try {
                const res = await axios.post('http://localhost:5000/api/auth/refresh', {}, { withCredentials: true });
        setAccessToken(res.data.accessToken);
        original.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(original);
      } catch {
        setAccessToken(null);
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;