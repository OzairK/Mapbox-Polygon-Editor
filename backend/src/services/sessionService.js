import  Session  from '../models/session.js';

const createSession = async () => {
  const session = await Session.create({ expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) }); // 24 hours from now
  return session;
};

export default {
  createSession
};
