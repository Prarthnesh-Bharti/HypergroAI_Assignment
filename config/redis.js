import dotenv from 'dotenv';
dotenv.config();
import { Redis } from '@upstash/redis';

  const url = process.env.UPSTASH_REDIS_URL;
  const token =process.env.UPSTASH_REDIS_TOKEN;

if (!url || !token) {
  throw new Error('Missing UPSTASH_REDIS_URL or UPSTASH_REDIS_TOKEN environment variables');
}

const redisClient = new Redis({
  url: url.trim(),
  token: token.trim(),
});

export default redisClient;

