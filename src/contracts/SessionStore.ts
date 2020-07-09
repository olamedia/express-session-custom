import {SessionData} from "../types";
import {Session} from "../types";

export interface SessionStore {
    /**
     * Starts new session or opens session with given SID
     *
     * @param sid
     */
    start(sid?: string): Promise<Session>

    getAll(sid: string): Promise<Session>

    setAll(sid: string, data: SessionData): Promise<boolean>

    delete(sid: string): Promise<boolean>
}
