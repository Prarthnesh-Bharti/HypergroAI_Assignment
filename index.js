import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';



import connectDB from './config/db.js';
import redisClient from './config/redis.js';

import authRoutes from './routes/auth.routes.js';
import propertyRoutes from './routes/property.routes.js';
import favoriteRoutes from './routes/favorite.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Property Listing API' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/favorites', favoriteRoutes);

// Connect DB & Redis, then start server
(async () => {
  try {
    await connectDB();
    await redisClient.connect();
    console.log('Redis connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Server startup error:', err.message);
  }
})();
