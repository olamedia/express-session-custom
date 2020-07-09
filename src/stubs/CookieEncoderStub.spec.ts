import {CookieEncoderStub} from "./CookieEncoderStub";

let encoder: CookieEncoderStub;

beforeEach(() => {
    encoder = new CookieEncoderStub();
});


test('encode returns value unmodified', () => {
    const encodedValue = encoder.encode('some-value');

    expect(encodedValue).toStrictEqual('some-value');
});


test('decode returns value unmodified', () => {
    const decodedValue = encoder.decode('some-value');

    expect(decodedValue).toStrictEqual('some-value');
});
