import Redis from 'ioredis';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const redis = new Redis.default(REDIS_URL);
redis.on('error', (err) => {
    console.error('Redis error:', err);
});
export default redis;
//# sourceMappingURL=redis.js.map