import {CookieHandler as CookieHandlerContract} from "../contracts/CookieHandler";
import {IncomingMessage} from "connect";
import {CookieOptions} from "../types";
import {parse as parseCookies, serialize as serializeCookie} from 'cookie';
import {ServerResponse} from "http";
import {debug} from "debug";

const log = debug("express-session-custom:CookieHandler");

export class BasicCookieHandler implements CookieHandlerContract{

    async getCookie(req: IncomingMessage, options: CookieOptions) {
        const cookies = parseCookies(req.headers.cookie);

        return options.name in cookies ? cookies[options.name] : null;
    }

    async setCookie(value: string, cookie: CookieOptions, res: ServerResponse) {

        if (res.headersSent){
            log("Headers are sent already");
            throw new Error('Headers are sent already, can\'t set a cookie')
        }

        const cookieData = serializeCookie(cookie.name, value, {
            domain: cookie.domain,
            path: cookie.path,
            httpOnly: cookie.httpOnly,
            sameSite: cookie.sameSite,
            secure: cookie.secure,
            expires: cookie.expires,
            maxAge: cookie.maxAge
        });

        const prev: string[] | undefined = res.getHeader('Set-Cookie') as string[] | undefined;

        const header: string[] = prev === undefined ? [cookieData] : [...prev, cookieData];

        res.setHeader('Set-Cookie', header)
    }
}
