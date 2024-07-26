import sessionService from '../services/sessionService.js';

const createSession = async (req, res) => {
  try {
    const session = await sessionService.createSession();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await sessionService.getSession(sessionId);
    if (session) {
      res.status(200).json(session);
    } else {
      res.status(404).json({ error: 'Session not found or expired' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getSessionUrl = async (req, res) => {
  const { sessionId } = req.params;
  const session = await sessionService.getSession(sessionId);
  if (session) {
    const baseUrl = process.env.FE_BASE_URL;
    const sessionUrl = `${baseUrl}?sessionId=${sessionId}`;
    res.status(200).json({ url: sessionUrl });
  } else {
    res.status(404).json({ error: 'Session not found or expired' });
  }
};

export { createSession, getSession, getSessionUrl };
