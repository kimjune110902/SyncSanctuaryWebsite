import pino from 'pino';

// Define the fields that need to be scrubbed from logs as specified in Section 2.2
const SENSITIVE_KEYS = new Set([
  'password', 'confirmPassword', 'newPassword', 'currentPassword', 'passwordHash',
  'phone_number', 'phoneNumber', 'email', 'token', 'access_token', 'refresh_token',
  'otp', 'code', 'secret', 'api_key', 'client_secret'
]);

// Redact email partially: first 2 chars + *** + domain
function redactEmail(email: string): string {
  if (typeof email !== 'string') return '[REDACTED]';
  const parts = email.split('@');
  if (parts.length !== 2) return '[REDACTED]';
  const local = parts[0] || '';
  const domain = parts[1] || '';
  const maskedLocal = local.length > 2 ? `${local.substring(0, 2)}***` : '***';
  return `${maskedLocal}@${domain}`;
}

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  redact: {
    paths: Array.from(SENSITIVE_KEYS).flatMap(key => [
      key,
      `*.${key}`,
      `body.${key}`,
      `headers.${key}`,
      `metadata.${key}`
    ]),
    censor: (val, path) => {
      // Custom censor to handle email specifically
      const key = path[path.length - 1];
      if (key === 'email') {
        return redactEmail(val as string);
      }
      return '[REDACTED]';
    }
  }
});

export default logger;
