import api from './api';

const createSession = async () => {
  const response = await api.post('/sessions');
  const { session_id, expires_at } = response.data;
  sessionStorage.setItem('sessionId', session_id);
  sessionStorage.setItem('sessionExpiresAt', expires_at);
  return response.data;
};

const getSession = async (sessionId) => {
  try {
    const response = await api.get(`/sessions/${sessionId}`);
    const { session_id, expires_at } = response.data;
    sessionStorage.setItem('sessionId', session_id);
    sessionStorage.setItem('sessionExpiresAt', expires_at);
    return response.data;
  } catch (error) {
    console.error('Error fetching session:', error);
    throw error;
  }
};

const getSessionUrl = async (sessionId) => {
  try {
    const response = await api.get(`/sessions/${sessionId}/url`);
    return response.data.url;
  } catch (error) {
    console.error('Error fetching session URL:', error);
    throw error;
  }
};

export default {
  createSession,
  getSession,
  getSessionUrl,
};
