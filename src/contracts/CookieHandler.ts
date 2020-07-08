import {IncomingMessage} from "connect";
import {ServerResponse} from "http";
import {CookieOptions} from "../types";

/**
 * Pass options to implementation's constructor
 */
export interface CookieHandler {
    setCookie(value: string, cookie: CookieOptions, res: ServerResponse);
    getCookie(req: IncomingMessage, options: CookieOptions): Promise<string | null>;
}
