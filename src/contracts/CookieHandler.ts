import {IncomingMessage} from "connect";
import {ServerResponse} from "http";

/**
 * Pass options to implementation's constructor
 */
export interface CookieHandler {
    setCookie(cookie: string, res: ServerResponse);
    getCookie(req: IncomingMessage): Promise<string | null>;
}
