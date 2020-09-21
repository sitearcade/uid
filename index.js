// import

const stringify = require('fast-json-stable-stringify');
const {customAlphabet} = require('nanoid');
const hash = require('string-hash');

// vars

const idLen = parseInt(process.env.ARC_UID_LENGTH) || 12;

const chars = '0123456789' +
  'abcdefghijklmnopqrstuvwxyz' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charLen = chars.length;

const validRx = /^[\dA-Za-z]+$/;
const dateLen = 7;

// fns

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
  constructor(len) {
    this.len = parseInt(len) || idLen;
  }

  isId(str) {
    return str.length === this.len && validRx.test(str);
  }

  getNanoId() {
    return customAlphabet(chars, this.len)();
  }

  getDateId(dt) {
    return encodeAsChars(dt ? new Date(dt).getTime() : Date.now())
      .padStart(dateLen, '0')
      .slice(0, this.len)
      .concat(customAlphabet(chars, this.len - dateLen)());
  }

  getHashId(obj) {
    return encodeAsChars(hash(stringify(obj)))
      .slice(0, this.len)
      .padStart(this.len, 0);
  }
}

// export

const createGenerator = (len) => new Id(len);

const id = createGenerator();

module.exports = {
  createGenerator,
  isId: id.isId.bind(id),
  getNanoId: id.getNanoId.bind(id),
  getDateId: id.getDateId.bind(id),
  getHashId: id.getHashId.bind(id),
};
