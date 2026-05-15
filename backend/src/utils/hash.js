import argon2 from 'argon2';
// Configured based on Section 2.2 of README.md
const ARGON2_CONFIG = {
    type: argon2.argon2id,
    memoryCost: 65536, // 64 MB
    timeCost: 3, // iterations
    parallelism: 4,
    hashLength: 32,
};
export async function hashPassword(password) {
    return await argon2.hash(password, ARGON2_CONFIG);
}
export async function verifyPassword(hash, password) {
    return await argon2.verify(hash, password);
}
/**
 * Checks if the password needs to be re-hashed (e.g. if parameters were upgraded)
 */
export function needsRehash(hash) {
    return argon2.needsRehash(hash, ARGON2_CONFIG);
}
//# sourceMappingURL=hash.js.map