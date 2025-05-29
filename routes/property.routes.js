import express from 'express';
import {
  createProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
} from '../controllers/property.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getAllProperties);
router.post('/', auth, createProperty);
router.put('/:id', auth, updateProperty);
router.delete('/:id', auth, deleteProperty);

export default router;
