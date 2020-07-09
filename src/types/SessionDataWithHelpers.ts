import {SessionData} from "./SessionData";

export interface SessionDataWithHelpers extends SessionData{
    save(): Promise<boolean>
    destroy(): Promise<boolean>
}
