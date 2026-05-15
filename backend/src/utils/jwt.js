import jwt from 'jsonwebtoken';
// Reads from environment variables
const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || '';
const PUBLIC_KEY = process.env.JWT_PUBLIC_KEY || '';
export function generateAccessToken(payload, jti) {
    if (!PRIVATE_KEY)
        throw new Error("JWT_PRIVATE_KEY is not set");
    const signOptions = {
        algorithm: 'RS256',
        expiresIn: '15m', // 15 minutes
    };
    if (jti) {
        signOptions.jwtid = jti;
    }
    return jwt.sign(payload, PRIVATE_KEY, signOptions);
}
export function verifyAccessToken(token) {
    if (!PUBLIC_KEY)
        throw new Error("JWT_PUBLIC_KEY is not set");
    const verifyOptions = {
        algorithms: ['RS256'],
    };
    return jwt.verify(token, PUBLIC_KEY, verifyOptions);
}
//# sourceMappingURL=jwt.js.map