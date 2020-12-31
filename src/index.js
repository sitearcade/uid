// import

import stringify from 'fast-json-stable-stringify';
import {customAlphabet} from 'nanoid';
import stringHash from 'string-hash';

// vars

const idLen = parseInt(process.env.ARC_UID_LENGTH) || 12;

const chars = '0123456789' +
  'abcdefghijklmnopqrstuvwxyz' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charLen = chars.length;

const validRx = /^[\dA-Za-z]+$/;
const dateLen = 7;

// fns

const hash = (v) => stringHash(stringify(v));

const encodeAsChars = (num) => {
  let res = '';

  // eslint-disable-next-line fp/no-loops
  while (num > 0) {
    res = chars[num % charLen] + res;
    num = Math.floor(num / charLen);
  }

  return res;
};

// class

class Id {
  #len;

  constructor(len = idLen) {
    this.#len = parseInt(len);
  }

  isId(str) {
    return str.length === this.#len && validRx.test(str);
  }

  getNanoId() {
    return customAlphabet(chars, this.#len)();
  }

  getDateId(dt) {
    return encodeAsChars(dt ? new Date(dt).getTime() : Date.now())
      .padStart(dateLen, '0')
      .slice(0, this.#len)
      .concat(customAlphabet(chars, this.#len - dateLen)());
  }

  getHashId(obj) {
    return encodeAsChars(hash(obj))
      .slice(0, this.#len)
      .padStart(this.#len, 0);
  }
}

const createGenerator = (len) => new Id(len);

// export

const id = createGenerator();

export {hash, createGenerator};
export const isId = id.isId.bind(id);
export const getNanoId = id.getNanoId.bind(id);
export const getDateId = id.getDateId.bind(id);
export const getHashId = id.getHashId.bind(id);
