import express from 'express';
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from '../controllers/favorite.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', auth, getFavorites);
router.post('/add', auth, addFavorite);
router.post('/remove', auth, removeFavorite);

export default router;
