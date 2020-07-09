import {MemorySessionStore} from "./MemorySessionStore";
import {IdGenerator} from "../contracts";


let store: MemorySessionStore;
let idGenerator: IdGenerator;

beforeEach(async done => {
    idGenerator = {
        generate(): string {
            return 'some-id';
        }
    };
    store = new MemorySessionStore(idGenerator);
    await store.setAll('one-id', {
        key: 'value1'
    });
    await store.setAll('another-id', {
        key: 'value2'
    });
    done();
});


test('gets session data', async () => {
    const result = await store.getAll('one-id');

    expect(result).toStrictEqual(
        {
            id: 'one-id',
            data: {
                key: 'value1'
            }
        });
});


test('throws error if id not found', async () => {
    const resultPromise = store.getAll('unknown-id');

    expect(resultPromise).rejects.toThrowError('session not found');
});

test('sets session data', async () => {
    const result = await store.setAll('some-id', {
        key: 'value'
    });

    expect(result).toBeTruthy();
    expect(await store.getAll('some-id')).toStrictEqual(
        {
            id: 'some-id',
            data: {
                key: 'value'
            }
        });
});

test('start with existing id returns data', async () => {
    const result = await store.start('one-id');

    expect(result).toStrictEqual(
        {
            id: 'one-id',
            data: {
                key: 'value1'
            }
        });
});

test('start without id creates new session', async () => {
    idGenerator = {
        generate(): string {
            return 'some-id';
        }
    };
    store = new MemorySessionStore(idGenerator);

    const result = await store.start();

    expect(result).toStrictEqual(
        {
            id: 'some-id',
            data: {}
        });
});

test('start with non-existing id creates new session', async () => {
    idGenerator = {
        generate(): string {
            return 'some-id';
        }
    };
    store = new MemorySessionStore(idGenerator);
    await store.setAll('one-id', {
       key: 'value1'
    });

    const result = await store.start();

    expect(result).toStrictEqual(
        {
            id: 'some-id',
            data: {}
        });
});
