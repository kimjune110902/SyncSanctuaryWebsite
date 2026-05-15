export interface TokenPayload {
    sub: string;
    username: string;
    role: string;
    client_type: string;
}
export declare function generateAccessToken(payload: TokenPayload, jti?: string): string;
export declare function verifyAccessToken(token: string): TokenPayload;
//# sourceMappingURL=jwt.d.ts.map