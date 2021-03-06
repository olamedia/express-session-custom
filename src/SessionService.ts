import {SessionOptions} from "./types";
import {Session} from "./types";
import {RequestWithSession} from "./types";
import {ServerResponse} from "http";
import {debug} from "debug";

const log = debug("express-session-custom:SessionService");

const filterMethods: (data: object) => object = (data) => {
    return Object.keys(data).reduce((result, key) => {
        if (typeof data[key] !== 'function'){
            result[key] = data[key];
        }
        return result;
    }, {});
};

export class SessionService {
    constructor(
        private options: SessionOptions
    ) {
    }
    async handleRequest(req: RequestWithSession, res: ServerResponse): Promise<Session> {
        const store = this.options.store;
        // READ COOKIE
        const cookieData = await this.options.cookieHandler.getCookie(req, this.options.cookie);
        let sid: string = undefined;
        if (cookieData) {
            await this.options.cookieEncoder.decode(cookieData).then(data => {
                sid = data;
                log("SID found %o", sid);
            }).catch(reason => {
                log(reason);
            });
        }
        const session = await store.start(sid);
        log("SID set %o", session.id);
        // SET COOKIE
        const newCookieData = await this.options.cookieEncoder.encode(session.id);
        await this.options.cookieHandler.setCookie(newCookieData, this.options.cookie, res);

        req.sessionId = session.id;
        req.session = {
            ...session.data,
            async save(){
                return store.setAll(session.id, filterMethods(req.session));
            },
            async destroy() {
                return store.delete(session.id);
            }
        };

        return session
    }
}

