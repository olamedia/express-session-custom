import {CookieEncoderStub} from "./CookieEncoderStub";

let encoder: CookieEncoderStub;

beforeEach(() => {
    encoder = new CookieEncoderStub();
});


test('encode returns value unmodified', async () => {
    const encodedValue = await encoder.encode('some-value');

    expect(encodedValue).toStrictEqual('some-value');
});


test('decode returns value unmodified', async () => {
    const decodedValue = await encoder.decode('some-value');

    expect(decodedValue).toStrictEqual('some-value');
});
