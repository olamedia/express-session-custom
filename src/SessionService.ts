import {SessionOptions} from "./types";
import {Session} from "./types";
import {RequestWithSession} from "./types";
import {ServerResponse} from "http";

export class SessionService {
    constructor(
        private options: SessionOptions
    ) {
    }
    async handleRequest(req: RequestWithSession, res: ServerResponse): Promise<Session> {
        const store = this.options.store;
        // READ COOKIE
        const cookieData = await this.options.cookieHandler.getCookie(req, this.options.cookie);
        const sid = await this.options.cookieEncoder.decode(cookieData);
        const session = await store.start(sid);
        // SET COOKIE
        const newCookieData = await this.options.cookieEncoder.encode(session.id);
        await this.options.cookieHandler.setCookie(newCookieData, this.options.cookie, res);

        req.sessionId = session.id;
        req.session = {
            ...session.data,
            async save(){
                return store.setAll(session.id, session.data);
            },
            async destroy() {
                return store.delete(session.id);
            }
        };

        return session
    }
}

