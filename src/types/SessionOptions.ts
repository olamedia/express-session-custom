import {CookieOptions} from "./CookieOptions";
import {SessionStore} from "../contracts";
import {CookieHandler} from "../contracts";
import {CookieEncoder} from "../contracts";
import {IdGenerator} from "../contracts";

export interface SessionOptions{
    cookie: CookieOptions,
    cookieHandler: CookieHandler,
    cookieEncoder: CookieEncoder,
    store: SessionStore,
    idGenerator: IdGenerator
}
