import {CookieEncoder} from "../contracts";

export class CookieEncoderStub implements CookieEncoder{
    async decode(value: string): Promise<string> {
        return value;
    }

    async encode(value: string): Promise<string> {
        return value;
    }

}
