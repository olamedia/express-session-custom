import {SessionData} from "./SessionData";

export type SessionId = string;

export class Session{
    id: SessionId;
    data: SessionData;
}
