import {IncomingMessage} from "connect";
import {SessionId} from "./Session";
import {SessionData} from "./SessionData";

export interface RequestWithSession extends IncomingMessage{
    sessionId: SessionId;
    session: SessionData;
}
