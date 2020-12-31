// import

import {hash, createGenerator, getNanoId, getDateId, isId, getHashId} from './index';

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

describe('isId(id)', () => {
  it('knows what a valid id looks like', () => {
    expect(isId(getNanoId())).toBeTrue();
    expect(isId(getDateId())).toBeTrue();
    expect(isId(getDateId(new Date()))).toBeTrue();
    expect(isId(getHashId(123))).toBeTrue();
    expect(isId('abc')).toBeFalse();
  });
});

describe('createGenerator(len)', () => {
  it('instantiates generator with ids of `len` length', () => {
    const gen = createGenerator(15);

    expect(gen).toMatchInlineSnapshot('Id {}');

    ['isId', 'getNanoId', 'getDateId', 'getHashId']
      .forEach((k) => expect(gen[k]).toBeFunction());

    expect(gen.isId(gen.getNanoId())).toBeTrue();
    expect(gen.isId(gen.getDateId())).toBeTrue();
    expect(gen.isId(gen.getDateId(new Date()))).toBeTrue();
    expect(gen.isId(gen.getHashId(123))).toBeTrue();
    expect(gen.isId('abc')).toBeFalse();
  });
});
