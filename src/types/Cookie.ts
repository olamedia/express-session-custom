import {CookieOptions} from "./CookieOptions";

export class Cookie implements CookieOptions{

    protected options: CookieOptions;
    private _expires = null;
    private value: string = undefined;

    constructor(options: CookieOptions) {
        this.options = options;
    }

    get domain()
    {
        return this.options.domain
    }

    get path()
    {
        return this.options.path
    }

    get httpOnly()
    {
        return this.options.httpOnly
    }

    get secure()
    {
        return this.options.secure
    }

    get sameSite()
    {
        return this.options.sameSite
    }

    set expires(date: Date)
    {
        this._expires = date;
        //this.originalMaxAge = this.maxAge;
    }

    get expires(): Date
    {
        return this._expires;
    }

    set maxAge(ms: number) {
        this.expires = new Date(Date.now() + ms);
    }

    get maxAge(): number
    {
        return this.expires.valueOf() - Date.now();
    }

    get data(): CookieOptions
    {
        return {
            domain: this.options.domain,
            path: this.options.path,
            httpOnly: this.options.httpOnly,
            secure: this.options.secure,
            sameSite: this.options.sameSite,
            expires: this.expires,
            maxAge: this.maxAge
        };
    }
}
