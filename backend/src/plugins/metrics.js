import fp from 'fastify-plugin';
import promClient from 'prom-client';
export default fp(async (fastify) => {
    const register = new promClient.Registry();
    promClient.collectDefaultMetrics({ register });
    const httpRequestDurationMicroseconds = new promClient.Histogram({
        name: 'http_request_duration_seconds',
        help: 'Duration of HTTP requests in seconds',
        labelNames: ['method', 'route', 'code'],
        buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
    });
    register.registerMetric(httpRequestDurationMicroseconds);
    fastify.addHook('onRequest', (request, reply, done) => {
        request.metricsTimer = httpRequestDurationMicroseconds.startTimer();
        done();
    });
    fastify.addHook('onResponse', (request, reply, done) => {
        if (request.metricsTimer) {
            request.metricsTimer({
                route: request.routeOptions?.url || request.url,
                code: reply.statusCode,
                method: request.method
            });
        }
        done();
    });
    fastify.get('/metrics', async (request, reply) => {
        reply.header('Content-Type', register.contentType);
        return register.metrics();
    });
});
//# sourceMappingURL=metrics.js.map