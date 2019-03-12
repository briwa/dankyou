import DankYou from '../src/index'
import { Input } from '../src/types'

function getInput (root: number): Input {
  return {
    root,
    nodes: [
      { id: 1, text: 'First' },
      { id: 2, text: 'Second' },
      { id: 3, text: 'Third?' },
      { id: 4, text: 'You said No' },
      { id: 5, text: 'You said Yes' },
      { id: 6, text: 'Very well, bye' }
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4, text: 'No' },
      { from: 3, to: 5, text: 'Yes' },
      { from: 4, to: 6 },
      { from: 5, to: 6 }
    ]
  }
}

describe('DankYou', () => {
  describe('When iterating forward', () => {
    test('Should iterate properly', () => {
      const input = getInput(1)
      const dankyou = new DankYou(input)

      expect(dankyou.next()).toEqual({
        value: {
          node: input.nodes[0],
          edges: {
            prev: [],
            next: [input.edges[0]]
          }
        },
        done: false
      })

      expect(dankyou.next()).toEqual({
        value: {
          node: input.nodes[1],
          edges: {
            prev: [input.edges[0]],
            next: [input.edges[1]]
          }
        },
        done: false
      })

      expect(dankyou.next()).toEqual({
        value: {
          node: input.nodes[2],
          edges: {
            prev: [input.edges[1]],
            next: [input.edges[2], input.edges[3]]
          }
        },
        done: false
      })

      expect(dankyou.next(5)).toEqual({
        value: {
          node: input.nodes[4],
          edges: {
            prev: [input.edges[3]],
            next: [input.edges[5]]
          }
        },
        done: false
      })

      expect(dankyou.next()).toEqual({
        value: {
          node: input.nodes[5],
          edges: {
            prev: [input.edges[4], input.edges[5]],
            next: []
          }
        },
        done: false
      })

      // This is the end of the input, no more nodes
      expect(dankyou.next()).toEqual({
        value: undefined,
        done: true
      })
    })
  })

  describe('When iterating backward', () => {
    test('Should iterate properly', () => {
      const input = getInput(6)
      const dankyou = new DankYou(input)

      expect(dankyou.prev()).toEqual({
        value: {
          node: input.nodes[5],
          edges: {
            prev: [input.edges[4], input.edges[5]],
            next: []
          }
        },
        done: false
      })

      expect(dankyou.prev(5)).toEqual({
        value: {
          node: input.nodes[4],
          edges: {
            prev: [input.edges[3]],
            next: [input.edges[5]]
          }
        },
        done: false
      })

      expect(dankyou.prev()).toEqual({
        value: {
          node: input.nodes[2],
          edges: {
            prev: [input.edges[1]],
            next: [input.edges[2], input.edges[3]]
          }
        },
        done: false
      })

      expect(dankyou.prev()).toEqual({
        value: {
          node: input.nodes[1],
          edges: {
            prev: [input.edges[0]],
            next: [input.edges[1]]
          }
        },
        done: false
      })

      expect(dankyou.prev()).toEqual({
        value: {
          node: input.nodes[0],
          edges: {
            prev: [],
            next: [input.edges[0]]
          }
        },
        done: false
      })

      // This is the end of the input, no more nodes
      expect(dankyou.prev()).toEqual({
        value: undefined,
        done: true
      })
    })
  })

  describe('When answering with an invalid id to a node with multiple edges', () => {
    test('Should throw error', () => {
      const input = getInput(3)
      const dankyou = new DankYou(input)

      // Initiate the first node regardless
      dankyou.next()

      expect(() => {
        dankyou.next(99)
      }).toThrowError('Node with id: 99 cannot be found.')
    })
  })

  describe('When answering with an empty id to a node with multiple edges', () => {
    test('Should also throw error', () => {
      const input = getInput(3)
      const dankyou = new DankYou(input)

      // Initiate the first node regardless
      dankyou.next()

      expect(() => {
        dankyou.next()
      }).toThrowError('Id must be supplied for nodes with multiple edges.')
    })
  })

  describe('When no node is found', () => {
    test('Should throw error', () => {
      const input = getInput(9)
      const dankyou = new DankYou(input)

      expect(() => {
        dankyou.next()
      }).toThrowError('Node with id: 9 cannot be found.')
    })
  })
})
