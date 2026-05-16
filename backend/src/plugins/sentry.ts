import fp from 'fastify-plugin';
import * as Sentry from '@sentry/node';

export default fp(async (fastify) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN || "",
    tracesSampleRate: 1.0,
  });

  fastify.setErrorHandler((error, request, reply) => {
    Sentry.captureException(error);
    reply.status(500).send({ error: 'INTERNAL_ERROR' });
  });
});
