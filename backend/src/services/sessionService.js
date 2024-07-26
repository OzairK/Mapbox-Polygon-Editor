import  Session  from '../models/session.js';

const createSession = async () => {
  const session = await Session.create({ expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) }); // 24 hours from now
  return session;
};

const getSession = async (sessionId) => {
  const session = await Session.findByPk(sessionId);
  if (session && session.expires_at > new Date()) {
    return session;
  }
  return null;
};

export default {
  createSession,
  getSession
};
