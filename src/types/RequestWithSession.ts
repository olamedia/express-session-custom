import {IncomingMessage} from "connect";
import {SessionId} from "./Session";
import {SessionDataWithHelpers} from "./SessionDataWithHelpers";

export interface RequestWithSession extends IncomingMessage{
    sessionId: SessionId;
    session: SessionDataWithHelpers;
}
