export interface CookieOptions {
    name?: string;
    domain?: string;
    path?: string;
    expires?: Date;
    maxAge?: number;
    httpOnly?: boolean;
    secure?: boolean | 'auto';
    sameSite?: boolean | 'lax' | 'strict' | 'none';

    //signed?: boolean;
    //encode?: (val: string) => string;
}
