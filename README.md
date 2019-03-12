# DankYou
[![npm](https://img.shields.io/npm/v/dankyou.svg)](https://www.npmjs.com/package/dankyou)
[![Build Status](https://travis-ci.com/briwa/dankyou.svg?branch=master)](https://travis-ci.com/briwa/dankyou)
[![Coverage Status](https://coveralls.io/repos/github/briwa/dankyou/badge.svg?branch=master)](https://coveralls.io/github/briwa/dankyou?branch=master)


Simple helper to iterate through a graph-like data structure. For now, the usage is focusing only on flowcharts.
This is a work-in-progress project. It would still require a few things to be done before the first major version release.

## Install
```bash
npm install dankyou
```

## Usage
Given this kind of input:
```javascript
const input = {
  root: 1,
  nodes: [
    { id: 1, text: 'First' },
    { id: 2, text: 'Yes or no?' },
    { id: 3, text: 'You said No' },
    { id: 4, text: 'You said Yes' },
    { id: 5, text: 'Very well, bye' }
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 2, to: 3, text: 'No' },
    { from: 2, to: 4, text: 'Yes' },
    { from: 3, to: 5 },
    { from: 4, to: 5 }
  ]
}
```

You should be able to iterate through the input.
```javascript
import DankYou from 'dankyou'
const dankyou = new DankYou(input)

dankyou.next().value
// { node: { id: 1, text: 'First' },
//   edges: { prev: [], next: [{ from: 1, to: 2 }] } }

dankyou.next().value
// { node: { id: 2, text: 'Yes or no?' },
//   edges: { prev: [{ from: 1, to: 2 }], next: [{ from: 2, to: 3, text: 'No' }, { from: 2, to: 4, text: 'Yes' }] } }

dankyou.next(4).value
// { node: { id: 4, text: 'You said Yes' },
//   edges: { prev: [{ from: 2, to: 4, text: 'Yes' }], next: [{ from: 4, to: 5 }] } }

dankyou.next().value
// { node: { id: 5, text: 'Very well, bye' },
//   edges: { prev: [{ from: 4, to: 5 }], next: [] } }
```

## Test
```bash
npm run test
```

## Build
```bash
npm run build
```

## License
MIT