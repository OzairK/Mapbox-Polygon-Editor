import sessionService from '../services/sessionService.js'

const sessionMiddleware = async (req, res, next) => {
    const sessionId = req.headers['session-id']; // Extract session ID from headers

    if (!sessionId) {
        return res.status(401).json({ error: 'Session ID is required' });
    }

    const session = await sessionService.getSession(sessionId);

    if (!session) {
        return res.status(401).json({ error: 'Invalid or expired session' });
    }

    // this session comes for db, and as such can be trusted
    req.session = session; 

    next();
};

export default sessionMiddleware;
