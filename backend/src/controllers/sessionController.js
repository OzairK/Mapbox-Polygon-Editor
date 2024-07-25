import sessionService from '../services/sessionService.js';

const createSession = async (req, res) => {
  try {
    const session = await sessionService.createSession();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { createSession };
