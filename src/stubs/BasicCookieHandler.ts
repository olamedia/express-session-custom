import {CookieHandler as CookieHandlerContract} from "../contracts/CookieHandler";
import {IncomingMessage} from "connect";
import {CookieOptions} from "../types";
import { parse as parseCookies, serialize as serializeCookie } from 'cookie';
import {ServerResponse} from "http";

export class BasicCookieHandler implements CookieHandlerContract{

    constructor(private options: CookieOptions) {
    }

    async getCookie(req: IncomingMessage) {
        const cookies = parseCookies(req.headers.cookie);
        return this.options.name in cookies ? cookies[this.options.name] : null;
    }

    async setCookie(value: string, res: ServerResponse) {

        if (res.headersSent){
            throw new Error('Headers are sent already, can\'t set a cookie')
        }

        const cookieData = serializeCookie(this.options.name, value, {
            domain: this.options.domain,
            path: this.options.path,
            httpOnly: this.options.httpOnly,
            sameSite: this.options.sameSite,
            secure: this.options.secure === 'auto' ? false: this.options.secure,
            expires: this.options.expires,
            maxAge: this.options.maxAge
        })

        const prev: string[] | undefined = res.getHeader('Set-Cookie') as string[] | undefined

        const header: string[] = prev === undefined ? [cookieData] : [...prev, cookieData];

        res.setHeader('Set-Cookie', header)
    }
}
