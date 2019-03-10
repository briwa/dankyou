# DankYou
[![npm](https://img.shields.io/npm/v/dankyou.svg)](https://www.npmjs.com/package/dankyou)
[![Build Status](https://travis-ci.org/briwa/dankyou.svg?branch=master)](https://travis-ci.org/briwa/dankyou)
[![Coverage Status](https://coveralls.io/repos/github/briwa/dankyou/badge.svg?branch=master)](https://coveralls.io/github/briwa/dankyou?branch=master)


Simple helper to iterate through a graph-like data structure. For now, the usage is focusing only on flowcharts.
This is a work-in-progress project. It would still require a few things to be done before the first major version release.

The name was shamefully stolen from a popular pop song. It was hard to come up with a proper name for this.

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
    { id: 1, text: 'First', type: 'text' },
    { id: 2, text: 'Second', type: 'text' },
    { id: 3, text: 'Third?', type: 'question' },
    { id: 4, text: 'You said No', type: 'answer' },
    { id: 5, text: 'You said Yes', type: 'answer' },
    { id: 6, text: 'Very well, bye', type: 'text' }
  ],
  edges: [
    { from: 3, to: 4, text: 'No' },
    { from: 3, to: 5, text: 'Yes' }
  ]
}
```

You can iterate through the nodes. Supports node edges as well. It is using a generator function under the hood.
```javascript
import DankYou from 'dankyou'
const dankyou = new DankYou(input)

dankyou.next()
// { value: { id: 1, text: 'First', type: 'text' }, done: false }

dankyou.next()
// { value: { id: 2, text: 'Second', type: 'text' }, done: false }

dankyou.next()
// { value: { id: 3, text: 'Third', type: 'question' }, done: false }

dankyou.next('Yes')
// { value: { id: 5, text: 'You said Yes', type: 'answer' }, done: false }

dankyou.next()
// { value: { id: 6, text: 'Very well, bye', type: 'text' }, done: true }
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