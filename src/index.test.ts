// import

import {dateMock} from '@sitearcade/jest-preset/tools';

import {
  hash,
  createGenerator,
  getNanoId,
  getDateId,
  isId,
  getHashId,
} from './index';

// test

describe('hash(any)', () => {
  it('resolves any object to stable hashed integer', () => {
    expect(hash(12345))
      .toMatchInlineSnapshot('109950804');
    expect(hash('qwerty'))
      .toMatchInlineSnapshot('1505860249');
    expect(hash(true))
      .toMatchInlineSnapshot('2087430515');
    expect(hash({key: 'val'}))
      .toMatchInlineSnapshot('991022805');
    expect(hash([true, 123, 'asdfg', {key: 'val'}]))
      .toMatchInlineSnapshot('821928462');
  });
});

describe('getHashId(any)', () => {
  expect(getHashId(12345))
    .toMatchInlineSnapshot('"00000007rle4"');
  expect(getHashId('qwerty'))
    .toMatchInlineSnapshot('"0000001DUr2x"');
  expect(getHashId(true))
    .toMatchInlineSnapshot('"0000002hgE27"');
  expect(getHashId({key: 'val'}))
    .toMatchInlineSnapshot('"000000154eiN"');
  expect(getHashId([true, 123, 'asdfg', {key: 'val'}]))
    .toMatchInlineSnapshot('"0000000TCJ8G"');
});

describe('getDateId(any)', () => {
  dateMock.advanceTo(new Date('2020-01-01'));

  expect(getDateId().slice(0, 7))
    .toStrictEqual('rMhkpLa');
  expect(getDateId(Date.now()).slice(0, 7))
    .toStrictEqual('rMhkpLa');
  expect(getDateId(12345).slice(0, 7))
    .toStrictEqual('00003d7');
  expect(getDateId('2020-01-01').slice(0, 7))
    .toStrictEqual('rMhkpLa');
  expect(getDateId(NaN).slice(0, 7))
    .toStrictEqual('rMhkpLa');
});

describe('isId(id)', () => {
  it('knows what a valid id looks like', () => {
    expect(isId(getNanoId())).toStrictEqual(true);
    expect(isId(getDateId())).toStrictEqual(true);
    expect(isId(getDateId(new Date()))).toStrictEqual(true);
    expect(isId(getHashId(123))).toStrictEqual(true);
    expect(isId('abc')).toStrictEqual(false);
  });
});

describe('createGenerator(len)', () => {
  it('instantiates generator with ids of `len` length', () => {
    const gen = createGenerator(15);

    expect(gen.idLength).toStrictEqual(15);

    ['isId', 'getNanoId', 'getDateId', 'getHashId'].forEach((k) =>
      expect(gen[k]).toBeInstanceOf(Function));

    expect(gen.isId(gen.getNanoId())).toStrictEqual(true);
    expect(gen.isId(gen.getDateId())).toStrictEqual(true);
    expect(gen.isId(gen.getDateId(new Date()))).toStrictEqual(true);
    expect(gen.isId(gen.getHashId(123))).toStrictEqual(true);
    expect(gen.isId('abc')).toStrictEqual(false);
    expect(gen.isId('1234567890qwert')).toStrictEqual(true);
  });
});
