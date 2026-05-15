import { z } from 'zod';
export default async function accountRoutes(fastify) {
    fastify.get('/profile', { preValidation: [fastify.authenticate] }, async (request, reply) => {
        const user = await fastify.prisma.users.findUnique({
            where: { id: request.user.sub }
        });
        return reply.code(200).send({ user });
    });
    fastify.patch('/profile', { preValidation: [fastify.authenticate] }, async (request, reply) => {
        const schema = z.object({
            username: z.string().min(3).max(32).optional(),
            avatar_url: z.string().optional()
        });
        const body = schema.parse(request.body);
        // Check rate limits and duplicate username here in production
        if (body.username) {
            const existing = await fastify.prisma.users.findUnique({ where: { username: body.username } });
            if (existing && existing.id !== request.user.sub) {
                return reply.code(409).send({ error: 'USERNAME_TAKEN' });
            }
        }
        const updatedUser = await fastify.prisma.users.update({
            where: { id: request.user.sub },
            data: body
        });
        return reply.code(200).send({ user: updatedUser });
    });
    fastify.get('/sessions', { preValidation: [fastify.authenticate] }, async (request, reply) => {
        const sessions = await fastify.prisma.refresh_tokens.findMany({
            where: { user_id: request.user.sub, revoked: false, expires_at: { gt: new Date() } },
            orderBy: { last_used_at: 'desc' }
        });
        let rawToken = request.cookies.ss_refresh_token;
        if (!rawToken && request.headers.authorization?.startsWith('Bearer ')) {
            rawToken = request.headers.authorization.substring(7);
        }
        const mappedSessions = sessions.map((s) => ({
            ...s,
            is_current: false // Simplification: missing token hashing verification for this demo
        }));
        return reply.code(200).send({ sessions: mappedSessions });
    });
    fastify.delete('/sessions/:id', { preValidation: [fastify.authenticate] }, async (request, reply) => {
        const { id } = request.params;
        const session = await fastify.prisma.refresh_tokens.findUnique({ where: { id } });
        if (!session || session.user_id !== request.user.sub) {
            return reply.code(403).send({ error: 'FORBIDDEN' });
        }
        await fastify.prisma.refresh_tokens.update({
            where: { id },
            data: { revoked: true, revoked_reason: 'user_action', revoked_at: new Date() }
        });
        return reply.code(200).send({ success: true });
    });
    fastify.post('/delete', { preValidation: [fastify.authenticate] }, async (request, reply) => {
        await fastify.prisma.users.update({
            where: { id: request.user.sub },
            data: { is_active: false, deletion_requested_at: new Date() }
        });
        await fastify.prisma.refresh_tokens.updateMany({
            where: { user_id: request.user.sub, revoked: false },
            data: { revoked: true, revoked_reason: 'user_deletion', revoked_at: new Date() }
        });
        return reply.code(200).send({ success: true });
    });
    fastify.post('/change-password', { preValidation: [fastify.authenticate] }, async (request, reply) => {
        const { verifyPassword, hashPassword } = await import('../utils/hash.js');
        const schema = z.object({
            current_password: z.string(),
            new_password: z.string().min(10)
        });
        const body = schema.parse(request.body);
        const user = await fastify.prisma.users.findUnique({ where: { id: request.user.sub } });
        if (!user || !user.password_hash) {
            return reply.code(400).send({ error: 'INVALID_USER' });
        }
        const isValid = await verifyPassword(user.password_hash, body.current_password);
        if (!isValid) {
            return reply.code(401).send({ error: 'INVALID_CURRENT_PASSWORD' });
        }
        const newHash = await hashPassword(body.new_password);
        await fastify.prisma.$transaction(async (prisma) => {
            await prisma.users.update({
                where: { id: user.id },
                data: { password_hash: newHash }
            });
            let rawToken = request.cookies.ss_refresh_token;
            if (!rawToken && request.headers.authorization?.startsWith('Bearer ')) {
                rawToken = request.headers.authorization.substring(7);
            }
            let currentTokenHash = '';
            if (rawToken) {
                const crypto = await import('crypto');
                currentTokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
            }
            await prisma.refresh_tokens.updateMany({
                where: {
                    user_id: user.id,
                    revoked: false,
                    token_hash: { not: currentTokenHash }
                },
                data: {
                    revoked: true,
                    revoked_reason: 'password_change',
                    revoked_at: new Date()
                }
            });
        });
        return reply.code(200).send({ success: true });
    });
    fastify.post('/avatar/upload-url', { preValidation: [fastify.authenticate] }, async (request, reply) => {
        // Dummy implementation for presigned S3 url
        return reply.code(200).send({
            upload_url: 'https://dummy-s3-presigned-url',
            public_url: `https://cdn.syncsanctuary.app/avatars/${request.user.sub}/avatar.webp`
        });
    });
}
//# sourceMappingURL=account.js.map