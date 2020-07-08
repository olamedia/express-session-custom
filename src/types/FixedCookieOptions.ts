import {CookieOptions} from "./CookieOptions";

export class FixedCookieOptions implements CookieOptions{
    private _expires: Date;

    set expires(date: Date) {
        this._expires = date;
        //this.originalMaxAge = this.maxAge;
    }

    get expires(): Date {
        return this._expires;
    }

    set maxAge(ms: number) {
        this.expires = new Date(Date.now() + ms);
    }

    get maxAge(): number {
        return this.expires.valueOf() - Date.now();
    }
}
