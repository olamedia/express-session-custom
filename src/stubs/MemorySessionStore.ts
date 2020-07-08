import {SessionStore} from "../contracts";
import {Session} from "../types";
import {SessionData} from "../types";
import {IdGenerator} from "../contracts";

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

        throw new Error('session not found');
    }
    /**
     * Can be write_close in php
     *
     */
    async setAll(sid: string, data: SessionData): Promise<boolean> {

        this.sessions[sid] = data;

        return true;
    }
}
