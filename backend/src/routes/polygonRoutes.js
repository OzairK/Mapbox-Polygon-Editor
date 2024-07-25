import express from 'express';
import { createPolygon, updatePolygon, deletePolygon } from '../controllers/polygonController.js';

const router = express.Router();

router.post('/', createPolygon);
router.put('/:id', updatePolygon);
router.delete('/:id', deletePolygon);

export default router;
