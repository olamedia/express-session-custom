import {BasicCookieHandler} from "./BasicCookieHandler";
import {IncomingMessage} from "connect";
import {CookieOptions} from "../types";
import {ServerResponse} from "http";


let handler: BasicCookieHandler;


beforeEach(() => {
    handler = new BasicCookieHandler();
});

test('getCookie returns cookie value from request', async () => {
    const req: IncomingMessage = {
        headers: {
            cookie: 'name=value; some-id=some-value'
        }
    } as IncomingMessage;
    const options: CookieOptions = {
        name: 'some-id'
    };

    const value = await handler.getCookie(req, options);

    expect(value).toStrictEqual('some-value');
});


test('getCookie returns null if cookie not found in request', async () => {
    const req: IncomingMessage = {
        headers: {
            cookie: 'name=value; another-id=some-value'
        }
    } as IncomingMessage;
    const options: CookieOptions = {
        name: 'some-id'
    };

    const value = await handler.getCookie(req, options);

    expect(value).toStrictEqual(null);
});

test('sets cookie to response', async () => {

    let header: string[];
    const res: ServerResponse = {
        headersSent: false,
        getHeader: (name: string): number | string | string[] | undefined => undefined,
        setHeader: (name: string, value: number | string | string[]): void => {
            header = value as string[];
            return
        }
    } as ServerResponse;
    const options: CookieOptions = {
        name: 'some-id'
    };

    await handler.setCookie('some-value', options, res);

    expect(header).toStrictEqual([
        "some-id=some-value"
    ]);
});


test('sets cookie to response with previous value untouched', async () => {

    let header: string[];
    const res: ServerResponse = {
        headersSent: false,
        getHeader: (name: string): number | string | string[] | undefined => ['previous value'],
        setHeader: (name: string, value: number | string | string[]): void => {
            header = value as string[];
            return
        }
    } as ServerResponse;
    const options: CookieOptions = {
        name: 'some-id'
    };

    await handler.setCookie('some-value', options, res);

    expect(header).toStrictEqual([
        "previous value",
        "some-id=some-value"
    ]);
});


test('sets cookie to response using all the options passed', async () => {

    let header: string[];
    const res: ServerResponse = {
        headersSent: false,
        getHeader: (name: string): number | string | string[] | undefined => ['previous value'],
        setHeader: (name: string, value: number | string | string[]): void => {
            header = value as string[];
            return
        }
    } as ServerResponse;
    const options: CookieOptions = {
        name: 'some-id',
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
        domain: 'example.com',
        secure: true,
        maxAge: 100
    };

    await handler.setCookie('some-value', options, res);

    expect(header).toStrictEqual([
        "previous value",
        "some-id=some-value; Max-Age=100; Domain=example.com; Path=/; HttpOnly; Secure; SameSite=Lax"
    ]);
});

test('sets cookie to response with expiration Date', async () => {

    let header: string[];
    const res: ServerResponse = {
        headersSent: false,
        getHeader: (name: string): number | string | string[] | undefined => ['previous value'],
        setHeader: (name: string, value: number | string | string[]): void => {
            header = value as string[];
            return
        }
    } as ServerResponse;
    const options: CookieOptions = {
        name: 'some-id',
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
        domain: 'example.com',
        secure: true,
        expires: new Date(100)
    };

    await handler.setCookie('some-value', options, res);

    expect(header).toStrictEqual([
        "previous value",
        "some-id=some-value; Domain=example.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax"
    ]);
});

test('setCookie throws Error if headers are sent already', async () => {

    const res: ServerResponse = {
        headersSent: true
    } as ServerResponse;
    const options: CookieOptions = {
        name: 'some-id',
    };

    expect(() => handler.setCookie('some-value', options, res)).rejects.toThrowError('Headers are sent already, can\'t set a cookie')
});
