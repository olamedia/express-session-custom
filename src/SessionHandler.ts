import {NextHandleFunction} from "connect";

import {SessionService} from "./SessionService";


import {SessionOptions} from "./types";
import {RequestWithSession} from "./types";
import {MemorySessionStore} from "./stubs";
import {BasicCookieHandler} from "./stubs";
import {CookieEncoderStub} from "./stubs";
import {UidSafeGenerator} from "./stubs";
import {FixedCookieOptions} from "./types/FixedCookieOptions";

import { debug } from 'debug';

const logger = debug("express-session-custom:session()");

const defaultOptions: Partial<SessionOptions> = {
    cookie: {
        name: 'id',
    }
};

export type SessionMiddlewareGenerator = (options?: Partial<SessionOptions>) => NextHandleFunction;

export const session: SessionMiddlewareGenerator = (partialOptions) => {
    if (partialOptions === undefined){
        partialOptions = {};
    }

    const cookieOptions = Object.assign({}, defaultOptions.cookie, partialOptions.cookie) as FixedCookieOptions;

    if (partialOptions.cookieHandler === undefined){
        // Basic cookie reader and writer
        partialOptions.cookieHandler = new BasicCookieHandler();
    }

    if (partialOptions.cookieEncoder === undefined){
        // No encoding
        partialOptions.cookieEncoder = new CookieEncoderStub();
    }

    if (partialOptions.idGenerator === undefined){
        // Generates IDs using uid-safe package
        partialOptions.idGenerator = new UidSafeGenerator(24);
    }

    if (partialOptions.store === undefined){
        // Holding session data as sid:data map, will lose information on script restart
        partialOptions.store = new MemorySessionStore(partialOptions.idGenerator);
    }



    const options: SessionOptions = Object.assign({}, defaultOptions, partialOptions, {cookie: cookieOptions}) as SessionOptions;

    const sessionService = new SessionService(options);

    return  async (req, res, next) => {

        await sessionService.handleRequest(req as RequestWithSession, res).catch(reason => {
            logger(reason);
        });

        next();
    };
};
