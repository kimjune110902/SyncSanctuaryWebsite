export declare function hashPassword(password: string): Promise<string>;
export declare function verifyPassword(hash: string, password: string): Promise<boolean>;
/**
 * Checks if the password needs to be re-hashed (e.g. if parameters were upgraded)
 */
export declare function needsRehash(hash: string): boolean;
//# sourceMappingURL=hash.d.ts.map