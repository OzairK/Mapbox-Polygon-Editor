import express from 'express';
import { createSession, getSession, getSessionUrl } from '../controllers/sessionController.js';

const router = express.Router();

router.post('/', createSession);
router.get('/:sessionId', getSession);
router.get('/:sessionId/url', getSessionUrl);


export default router;
