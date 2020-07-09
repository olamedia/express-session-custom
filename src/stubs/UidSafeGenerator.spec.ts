import {UidSafeGenerator} from "./UidSafeGenerator";

let generator: UidSafeGenerator;

beforeEach(() => {
    generator = new UidSafeGenerator(10);
});

test('generates id of expected length', async () => {
    generator = new UidSafeGenerator(15);

    const id = await generator.generate();

    expect(typeof id).toStrictEqual('string');
    expect(Buffer.from(id, 'base64').toString('ascii')).toHaveLength(15)
});

test('generates different ids on each call', async() => {

    const firstId = await generator.generate();
    const secondId = await generator.generate();

    expect(firstId).not.toBe(secondId)
});
