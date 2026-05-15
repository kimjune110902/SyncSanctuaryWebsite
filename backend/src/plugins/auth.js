import fp from 'fastify-plugin';
import { verifyAccessToken } from '../utils/jwt.js';
export default fp(async (fastify) => {
    fastify.decorate('authenticate', async (request, reply) => {
        try {
            const authHeader = request.headers.authorization;
            let token = '';
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
            else {
                // Fallback to cookie if present (implemented via @fastify/cookie later if needed)
                // For now, assume Bearer token
                if (!token) {
                    throw new Error('MISSING_AUTH_TOKEN');
                }
            }
            const decoded = verifyAccessToken(token);
            request.user = decoded;
        }
        catch (err) {
            if (err.message === 'MISSING_AUTH_TOKEN') {
                reply.code(401).send({ error: 'MISSING_AUTH_TOKEN' });
            }
            else if (err.name === 'TokenExpiredError') {
                reply.code(401).send({ error: 'TOKEN_EXPIRED' });
            }
            else {
                reply.code(401).send({ error: 'INVALID_TOKEN' });
            }
        }
    });
});
//# sourceMappingURL=auth.js.map