import {CookieEncoder} from "../contracts";

export class CookieEncoderStub implements CookieEncoder{
    decode(value: string): string {
        return value;
    }

    encode(value: string): string {
        return value;
    }

}
