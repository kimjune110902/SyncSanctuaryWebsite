import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { hashPassword, verifyPassword } from '../utils/hash.js';
import { generateAccessToken, verifyAccessToken } from '../utils/jwt.js';
import redis from '../utils/redis.js';
import { sendSMS } from '../utils/sms.js';
import crypto from 'crypto';

export default async function authRoutes(fastify: FastifyInstance) {
  // 1. Send OTP for Signup (now accepts identifier)
  fastify.post('/signup/send-otp', async (request, reply) => {
    const schema = z.object({
      identifier: z.string(),
      locale: z.string().optional()
    });

    const body = schema.parse(request.body);
    let isEmail = body.identifier.includes('@');

    if (!isEmail && !/^\+[1-9]\d{7,14}$/.test(body.identifier)) {
      return reply.code(400).send({ error: 'INVALID_FORMAT' });
    }

    const hourlyKey = `sms_rate:${body.identifier}:hourly`;
    const hourlyCount = await redis.incr(hourlyKey);
    if (hourlyCount === 1) await redis.expire(hourlyKey, 3600);
    if (hourlyCount > 3) return reply.code(429).send({ error: 'RATE_LIMITED', retry_after_seconds: 3600 });

    let existingUser;
    if (isEmail) {
      existingUser = await fastify.prisma.users.findUnique({ where: { email: body.identifier.toLowerCase() } });
    } else {
      existingUser = await fastify.prisma.users.findUnique({ where: { phone_number: body.identifier } });
    }

    if (existingUser && existingUser.is_active) {
      return reply.code(409).send({ error: isEmail ? 'EMAIL_ALREADY_EXISTS' : 'PHONE_ALREADY_EXISTS' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const hash = crypto.createHash('sha256').update(otp).digest('hex');

    await redis.setex(`otp:${body.identifier}:signup`, 600, JSON.stringify({ hash, attempts: 0 }));

    if (isEmail) {
      // Dummy send email
      console.log(`Sending Email OTP ${otp} to ${body.identifier}`);
    } else {
      await sendSMS(body.identifier, `Your SyncSanctuary verification code is: ${otp}`);
    }

    return reply.code(200).send({ success: true, resend_allowed_after_seconds: 60 });
  });

  // 2. Verify OTP
  fastify.post('/signup/verify-otp', async (request, reply) => {
    const schema = z.object({
      identifier: z.string(),
      otp: z.string()
    });
    const body = schema.parse(request.body);

    const redisKey = `otp:${body.identifier}:signup`;
    const otpDataStr = await redis.get(redisKey);

    if (!otpDataStr) {
      return reply.code(404).send({ error: 'OTP_EXPIRED' });
    }

    const otpData = JSON.parse(otpDataStr);
    if (otpData.attempts >= 5) {
      return reply.code(429).send({ error: 'OTP_MAX_ATTEMPTS' });
    }

    const inputHash = crypto.createHash('sha256').update(body.otp).digest('hex');
    if (inputHash !== otpData.hash) {
      otpData.attempts += 1;
      await redis.set(redisKey, JSON.stringify(otpData), 'KEEPTTL');
      return reply.code(400).send({ error: 'OTP_INVALID', attempts_remaining: 5 - otpData.attempts });
    }

    await redis.del(redisKey);
    const token = generateAccessToken({ sub: body.identifier, username: '', role: 'user', client_type: 'web' }, crypto.randomUUID());

    return reply.code(200).send({ success: true, verified_token: token });
  });

  // Check username
  fastify.get('/signup/check-username', async (request, reply) => {
     const schema = z.object({ username: z.string() });
     const query = schema.parse(request.query);

     const existing = await fastify.prisma.users.findUnique({ where: { username: query.username } });
     if (existing) {
         return reply.code(200).send({ available: false, reason: 'taken' });
     }
     return reply.code(200).send({ available: true });
  });

  // 3. Create Account
  fastify.post('/signup/create-account', async (request, reply) => {
    const schema = z.object({
      verified_token: z.string(),
      username: z.string().min(3).max(32),
      password: z.string().min(10),
      locale: z.string().optional(),
      consent: z.any().optional(),
      client_type: z.string().optional()
    });

    const body = schema.parse(request.body);

    let identifier = '';
    try {
       const decoded = verifyAccessToken(body.verified_token);
       identifier = decoded.sub;
    } catch {
       return reply.code(401).send({ error: 'TOKEN_INVALID' });
    }

    const passwordHash = await hashPassword(body.password);

    try {
      const isEmail = identifier.includes('@');

      const user = await fastify.prisma.users.create({
        data: {
          username: body.username,
          phone_number: isEmail ? null : identifier,
          email: isEmail ? identifier.toLowerCase() : null,
          password_hash: passwordHash,
          phone_verified: !isEmail,
          email_verified: isEmail,
          language: body.locale || 'en',
          preferences: body.consent || {}
        }
      });

      const clientType = body.client_type || 'web';
      const accessToken = generateAccessToken({
        sub: user.id,
        username: user.username,
        role: user.role,
        client_type: clientType
      });

      const rawRefreshToken = crypto.randomBytes(32).toString('hex');
      const tokenHash = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');

      const expiresAt = new Date();
      const durationDays = clientType === 'desktop' ? 90 : 30;
      expiresAt.setDate(expiresAt.getDate() + durationDays);

      await fastify.prisma.refresh_tokens.create({
        data: {
          token_hash: tokenHash,
          user_id: user.id,
          expires_at: expiresAt,
          client_type: clientType
        }
      });

      if (clientType === 'web') {
        reply.setCookie('ss_refresh_token', rawRefreshToken, {
          path: '/api/v1/auth',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: durationDays * 24 * 60 * 60
        });
        return reply.code(201).send({ access_token: accessToken, user });
      } else {
        return reply.code(201).send({ access_token: accessToken, refresh_token: rawRefreshToken, user });
      }
    } catch (err) {
      return reply.code(500).send({ error: 'INTERNAL_ERROR' });
    }
  });

  // 4. Login
  fastify.post('/login', async (request, reply) => {
    const body: any = request.body;

    let user;
    if (body.identifier.includes('@')) {
      user = await fastify.prisma.users.findUnique({ where: { email: body.identifier.toLowerCase() } });
    } else {
      user = await fastify.prisma.users.findUnique({ where: { phone_number: body.identifier } });
    }

    if (!user || !user.is_active) {
      return reply.code(401).send({ error: 'INVALID_CREDENTIALS' });
    }

    if (user.locked_until && user.locked_until > new Date()) {
      const retryAfter = Math.ceil((user.locked_until.getTime() - new Date().getTime()) / 1000);
      return reply.code(423).send({ error: 'ACCOUNT_LOCKED', locked_until: user.locked_until, retry_after_seconds: retryAfter });
    }

    if (!user.password_hash) {
      return reply.code(401).send({ error: 'NO_PASSWORD_SET' });
    }

    const isValid = await verifyPassword(user.password_hash, body.password);
    if (!isValid) {
      await fastify.prisma.users.update({
        where: { id: user.id },
        data: { login_attempt_count: { increment: 1 } }
      });
      // Handle lockout check...
      return reply.code(401).send({ error: 'INVALID_CREDENTIALS' });
    }

    await fastify.prisma.users.update({
      where: { id: user.id },
      data: { login_attempt_count: 0, locked_until: null, last_login_at: new Date() }
    });

    const clientType = body.client_type || 'web';
    const accessToken = generateAccessToken({
      sub: user.id,
      username: user.username,
      role: user.role,
      client_type: clientType
    });

    const rawRefreshToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');

    const durationDays = clientType === 'desktop' ? 90 : (body.remember_device ? 30 : 1);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + durationDays);

    await fastify.prisma.refresh_tokens.create({
      data: {
        token_hash: tokenHash,
        user_id: user.id,
        expires_at: expiresAt,
        client_type: clientType
      }
    });

    if (clientType === 'web') {
      reply.setCookie('ss_refresh_token', rawRefreshToken, {
        path: '/api/v1/auth',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: durationDays * 24 * 60 * 60
      });
      return reply.code(200).send({ access_token: accessToken, user });
    } else {
      return reply.code(200).send({ access_token: accessToken, refresh_token: rawRefreshToken, user });
    }
  });

  // 5. Refresh
  fastify.post('/refresh', async (request, reply) => {
    let rawToken = request.cookies.ss_refresh_token;
    if (!rawToken && request.headers.authorization?.startsWith('Bearer ')) {
        rawToken = request.headers.authorization.substring(7);
    }

    if (!rawToken) {
      return reply.code(401).send({ error: 'REFRESH_TOKEN_NOT_FOUND' });
    }

    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const oldToken = await fastify.prisma.refresh_tokens.findUnique({
      where: { token_hash: tokenHash }
    });

    if (!oldToken) return reply.code(401).send({ error: 'REFRESH_TOKEN_NOT_FOUND' });
    if (oldToken.revoked) return reply.code(401).send({ error: 'TOKEN_THEFT_DETECTED' });
    if (oldToken.expires_at < new Date()) return reply.code(401).send({ error: 'REFRESH_TOKEN_EXPIRED' });

    const user = await fastify.prisma.users.findUnique({ where: { id: oldToken.user_id } });
    if (!user || !user.is_active) return reply.code(401).send({ error: 'USER_INACTIVE' });

    const newRawRefreshToken = crypto.randomBytes(32).toString('hex');
    const newTokenHash = crypto.createHash('sha256').update(newRawRefreshToken).digest('hex');

    await fastify.prisma.$transaction([
      fastify.prisma.refresh_tokens.update({
        where: { id: oldToken.id },
        data: { revoked: true, revoked_at: new Date(), revoked_reason: 'rotation' }
      }),
      fastify.prisma.refresh_tokens.create({
        data: {
          token_hash: newTokenHash,
          user_id: user.id,
          expires_at: oldToken.expires_at, // Inherit expiry
          last_used_at: new Date(),
          client_type: oldToken.client_type
        }
      })
    ]);

    const accessToken = generateAccessToken({
      sub: user.id,
      username: user.username,
      role: user.role,
      client_type: oldToken.client_type
    });

    if (oldToken.client_type === 'web') {
      const maxAgeMs = oldToken.expires_at.getTime() - Date.now();
      reply.setCookie('ss_refresh_token', newRawRefreshToken, {
        path: '/api/v1/auth',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: Math.floor(maxAgeMs / 1000)
      });
      return reply.code(200).send({ access_token: accessToken, user });
    } else {
      return reply.code(200).send({ access_token: accessToken, refresh_token: newRawRefreshToken, user });
    }
  });

  // 6. Logout
  fastify.post('/logout', { preValidation: [fastify.authenticate] }, async (request, reply) => {
    const body: any = request.body || {};
    const userId = request.user.sub;

    if (body.all_devices) {
      await fastify.prisma.refresh_tokens.updateMany({
        where: { user_id: userId, revoked: false },
        data: { revoked: true, revoked_reason: 'logout', revoked_at: new Date() }
      });
    } else {
      let rawToken = request.cookies.ss_refresh_token;
      if (!rawToken && request.headers.authorization?.startsWith('Bearer ')) {
          rawToken = request.headers.authorization.substring(7);
      }
      if (rawToken) {
        const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
        await fastify.prisma.refresh_tokens.updateMany({
          where: { token_hash: tokenHash },
          data: { revoked: true, revoked_reason: 'logout', revoked_at: new Date() }
        });
      }
    }

    reply.setCookie('ss_refresh_token', '', {
      path: '/api/v1/auth',
      httpOnly: true,
      maxAge: 0
    });

    return reply.code(200).send({ success: true });
  });
}
