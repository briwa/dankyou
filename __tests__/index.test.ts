import DankYou from '../src/index'
import { Input } from '../src/types'

function getInput (root: string): Input {
  return {
    root,
    nodes: {
      a: { text: 'First' },
      b: { text: 'Second' },
      c: { text: 'Third?' },
      d: { text: 'You said No' },
      e: { text: 'You said Yes' },
      f: { text: 'Very well, bye' }
    },
    edges: [
      { from: 'a', to: 'b' },
      { from: 'b', to: 'c' },
      { from: 'c', to: 'd', text: 'No' },
      { from: 'c', to: 'e', text: 'Yes' },
      { from: 'd', to: 'f' },
      { from: 'e', to: 'f' }
    ]
  }
}

describe('DankYou', () => {
  describe('When iterating forward', () => {
    test('Should iterate properly', () => {
      const input = getInput('a')
      const dankyou = new DankYou(input)

      expect(dankyou.next()).toEqual({
        value: {
          id: 'a',
          node: input.nodes.a,
          edges: {
            prev: [],
            next: [input.edges[0]]
          }
        },
        done: false
      })

      expect(dankyou.next()).toEqual({
        value: {
          id: 'b',
          node: input.nodes.b,
          edges: {
            prev: [input.edges[0]],
            next: [input.edges[1]]
          }
        },
        done: false
      })

      expect(dankyou.next()).toEqual({
        value: {
          id: 'c',
          node: input.nodes.c,
          edges: {
            prev: [input.edges[1]],
            next: [input.edges[2], input.edges[3]]
          }
        },
        done: false
      })

      expect(dankyou.next('e')).toEqual({
        value: {
          id: 'e',
          node: input.nodes.e,
          edges: {
            prev: [input.edges[3]],
            next: [input.edges[5]]
          }
        },
        done: false
      })

      expect(dankyou.next()).toEqual({
        value: {
          id: 'f',
          node: input.nodes.f,
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
      const input = getInput('f')
      const dankyou = new DankYou(input)

      expect(dankyou.prev()).toEqual({
        value: {
          id: 'f',
          node: input.nodes.f,
          edges: {
            prev: [input.edges[4], input.edges[5]],
            next: []
          }
        },
        done: false
      })

      expect(dankyou.prev('e')).toEqual({
        value: {
          id: 'e',
          node: input.nodes.e,
          edges: {
            prev: [input.edges[3]],
            next: [input.edges[5]]
          }
        },
        done: false
      })

      expect(dankyou.prev()).toEqual({
        value: {
          id: 'c',
          node: input.nodes.c,
          edges: {
            prev: [input.edges[1]],
            next: [input.edges[2], input.edges[3]]
          }
        },
        done: false
      })

      expect(dankyou.prev()).toEqual({
        value: {
          id: 'b',
          node: input.nodes.b,
          edges: {
            prev: [input.edges[0]],
            next: [input.edges[1]]
          }
        },
        done: false
      })

      expect(dankyou.prev()).toEqual({
        value: {
          id: 'a',
          node: input.nodes.a,
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
      const input = getInput('c')
      const dankyou = new DankYou(input)

      // Initiate the first node regardless
      dankyou.next()

      expect(() => {
        dankyou.next('xxx')
      }).toThrowError('Node with id: xxx cannot be found.')
    })
  })

  describe('When answering with an empty id to a node with multiple edges', () => {
    test('Should also throw error', () => {
      const input = getInput('c')
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
      const input = getInput('x')
      const dankyou = new DankYou(input)

      expect(() => {
        dankyou.next()
      }).toThrowError('Node with id: x cannot be found.')
    })
  })
})
