import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export default async function accountRoutes(fastify: FastifyInstance) {
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

    const mappedSessions = sessions.map(s => ({
      ...s,
      is_current: false // Simplification: missing token hashing verification for this demo
    }));

    return reply.code(200).send({ sessions: mappedSessions });
  });

  fastify.delete('/sessions/:id', { preValidation: [fastify.authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: string };
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
}
