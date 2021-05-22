// import

import stringify from 'fast-json-stable-stringify';
import {customAlphabet} from 'nanoid';
import stringHash from 'string-hash';

// vars

const chars = '0123456789' +
  'abcdefghijklmnopqrstuvwxyz' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charLen = chars.length;

const validRx = /^[\dA-Za-z]+$/;
const dateLen = 7;

// fns

const hash = (v: any) => stringHash(stringify(v));

const encodeAsChars = (num: number) => {
  let res = '';

  while (num > 0) {
    res = chars[num % charLen] + res;
    num = Math.floor(num / charLen);
  }

  return res;
};

// class

class Id {
  idLength: number = 12;

  constructor(idLength?: number) {
    this.idLength = idLength ?? this.idLength;
  }

  isId(v: any) {
    return typeof v === 'string' &&
      v.length === this.idLength &&
      validRx.test(v);
  }

  getNanoId() {
    return customAlphabet(chars, this.idLength)();
  }

  getDateId(dt?: Date | number | string) {
    return encodeAsChars(dt ? new Date(dt).getTime() : Date.now())
      .padStart(dateLen, '0')
      .slice(0, this.idLength)
      .concat(customAlphabet(chars, this.idLength - dateLen)());
  }

  getHashId(v: any) {
    return encodeAsChars(hash(v))
      .slice(0, this.idLength)
      .padStart(this.idLength, '0');
  }
}

const createGenerator = (len?: number) => new Id(len);

// export

const id = createGenerator();

export {hash, createGenerator};

export const isId: InstanceType<typeof Id>['isId'] =
  id.isId.bind(id);

export const getNanoId: InstanceType<typeof Id>['getNanoId'] =
  id.getNanoId.bind(id);

export const getDateId: InstanceType<typeof Id>['getDateId'] =
  id.getDateId.bind(id);

export const getHashId: InstanceType<typeof Id>['getHashId'] =
  id.getHashId.bind(id);

