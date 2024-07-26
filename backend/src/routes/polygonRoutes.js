import express from 'express';
import { createPolygon, updatePolygon, deletePolygon, getAllPolygons } from '../controllers/polygonController.js';

const router = express.Router();

router.post('/', createPolygon);
router.put('/:id', updatePolygon);
router.delete('/:id', deletePolygon);
router.get('/', getAllPolygons);

export default router;
