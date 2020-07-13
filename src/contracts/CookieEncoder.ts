
export interface CookieEncoder {
    decode(value: string): Promise<string>
    encode(value: string): Promise<string>
}
