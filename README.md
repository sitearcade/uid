# @sitearcade/uid

SiteArcade's various UID generators and utils.

## Installation

1. `npm i -D @sitearcade/uid`
2. See usage...

## Usage

```js
import {isId, getNanoId, getDateId, getHashId, createGenerator} from '@sitearcade/uid`;

// random alphanumeric id, 12 chars random
getNanoId();

// sortable uid, first 7 chars date, last 5 chars random
getDateId(); // based off this instant
getDateId('2012-12-21'); // based off new Date(dt).getTime()

// safe, regular, fast hash, 12 chars
getHashId(123);
getHashId('abc');
getHashId({key: [123, 'abc']}); // all work

// testable
isId(getNanoId());
isId(getDateId());
isId(getHashId());

// create new instance, specify length
// getDateId() will get wonky if len <= 7
const longId = createIdGenerator(16);
longId.isId(longId.getNanoId()); // true
isId(longId.getNanoId()); // false!
```

## Env Vars

If you want to ensure the ids your system generates match, but you want something longer than 12 chars, use:

```bash
ARC_UID_LENGTH=42
```
