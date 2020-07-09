import {SessionStore} from "../contracts";
import {Session} from "../types";
import {SessionData} from "../types";
import {IdGenerator} from "../contracts";
import {debug} from "debug";

const log = debug("express-session-custom:MemorySessionStore");

export class MemorySessionStore implements SessionStore{
    private sessions = {};

    constructor(private idGenerator: IdGenerator) {
    }

    async start(sid?: string): Promise<Session>
    {
        if ((sid !== undefined) && (sid in this.sessions)){
            return {
                id: sid,
                data: this.sessions[sid]
            };
        }

        // Generate new session silently
        const session: Session = {
            id: await this.idGenerator.generate(),
            data: {}
        };
        this.sessions[session.id] = session.data;

        return session
    }
    async getAll(sid: string): Promise<Session> {
        if (sid in this.sessions) {
            return {
                id: sid,
                data: this.sessions[sid]
            }
        }

        log('session %o not found', sid);
        throw new Error('session not found');
    }

    async setAll(sid: string, data: SessionData): Promise<boolean> {

        this.sessions[sid] = data;

        return true;
    }

    async delete(sid: string): Promise<boolean> {
        if (sid in this.sessions) {
            delete this.sessions[sid];

            return true;
        }

        log('session %o not found', sid);
        throw new Error('session not found');
    }
}
