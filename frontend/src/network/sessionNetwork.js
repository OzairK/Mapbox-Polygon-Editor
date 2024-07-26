import api from './api';

const createSession = async () => {
  const response = await api.post('/sessions');
  const { session_id, expires_at } = response.data;
  sessionStorage.setItem('sessionId', session_id);
  sessionStorage.setItem('sessionExpiresAt', expires_at);
  return response.data;
};

export default {
  createSession,
};
