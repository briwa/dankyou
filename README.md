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
  nodes: {
    a: { text: 'First' },
    b: { text: 'Yes or no?' },
    c: { text: 'You said No' },
    d: { text: 'You said Yes' },
    e: { text: 'Very well, bye' }
  },
  edges: [
    { from: 'a', to: 'b' },
    { from: 'b', to: 'c', text: 'No' },
    { from: 'b', to: 'd', text: 'Yes' },
    { from: 'c', to: 'e' },
    { from: 'd', to: 'e' }
  ]
}
```

You should be able to iterate through the input.
```javascript
import DankYou from 'dankyou'
const dankyou = new DankYou(input)

dankyou.next().value
// { id: 'a',
//   node: { text: 'First' },
//   edges: { prev: [], next: [{ from: 'a', to: 'b' }] } }

dankyou.next().value
// { id: 'b',
//   node: { text: 'Yes or no?' },
//   edges: { prev: [{ from: 'a', to: 'b' }], next: [{ from: 'b', to: 'c', text: 'No' }, { from: 'b', to: 'd', text: 'Yes' }] } }

dankyou.next(4).value
// { id: 'd',
//   node: { text: 'You said Yes' },
//   edges: { prev: [{ from: 'b', to: 'd', text: 'Yes' }], next: [{ from: 'd', to: 'e' }] } }

dankyou.next().value
// { id: 'e',
//   node: { text: 'Very well, bye' },
//   edges: { prev: [{ from: 'd', to: 'e' }], next: [] } }
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