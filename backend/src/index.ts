import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import logger from './utils/logger.js';
import prismaPlugin from './plugins/prisma.js';
import authPlugin from './plugins/auth.js';
import cookie from '@fastify/cookie';
import metricsPlugin from './plugins/metrics.js';
import authRoutes from './routes/auth.js';
import accountRoutes from './routes/account.js';

const fastify = Fastify({ logger });

fastify.register(cors, { origin: true, credentials: true });
fastify.register(cookie);
fastify.register(helmet);
fastify.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute'
});

fastify.register(metricsPlugin);
fastify.register(prismaPlugin);
fastify.register(authPlugin);

fastify.register(authRoutes, { prefix: '/api/v1/auth' });
fastify.register(accountRoutes, { prefix: '/api/v1/account' });

fastify.get('/', async (request, reply) => {
  return { status: 'ok' };
});

const start = async () => {
  try {
    await fastify.listen({ port: parseInt(process.env.PORT || '8080'), host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
