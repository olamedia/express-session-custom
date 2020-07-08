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
        // READ COOKIE
        const cookieData = await this.options.cookieHandler.getCookie(req);
        const sid = await this.options.cookieEncoder.decode(cookieData);
        const session = await this.options.store.start(sid);
        // SET COOKIE
        const newCookieData = await this.options.cookieEncoder.encode(session.id);
        await this.options.cookieHandler.setCookie(newCookieData, res);

        req.sessionId = session.id;
        req.session = session.data;

        return session
    }
}

