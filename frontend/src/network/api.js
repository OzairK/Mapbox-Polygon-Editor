import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL

const api = axios.create({
  baseURL: baseURL || 'http://localhost:5000/api'
});

api.interceptors.request.use(
  (config) => {
    const sessionId = sessionStorage.getItem('sessionId');
    if (sessionId && config.url !== '/sessions') { // Do not add the session ID for the create session request
      config.headers['Session-Id'] = sessionId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
