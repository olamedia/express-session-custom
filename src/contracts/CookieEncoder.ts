
export interface CookieEncoder {
    encode(value: string): string
    decode(value: string): string
}
