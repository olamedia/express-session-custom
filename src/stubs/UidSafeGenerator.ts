import {IdGenerator} from "../contracts";
import * as UID from "uid-safe";

export class UidSafeGenerator implements IdGenerator
{
    constructor(private length: number = 24) {
    }

    generate(): string {
        return UID(this.length);
    }
}
