import DankYou from '../src/index'

function getInput (root: number) {
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
      { from: 3, to: 4, option: 'No' },
      { from: 3, to: 5, option: 'Yes' },
      { from: 4, to: 6 },
      { from: 5, to: 6 }
    ]
  }
}

describe('DankYou', () => {
  describe('When iterating with the answer Yes', () => {
    test('Should iterate properly', () => {
      const input = getInput(1)
      const dankyou = new DankYou(input)

      expect(dankyou.next().value).toEqual({ node: input.nodes[0], edges: [input.edges[0]] })
      expect(dankyou.next().value).toEqual({ node: input.nodes[1], edges: [input.edges[1]] })
      expect(dankyou.next().value).toEqual({ node: input.nodes[2], edges: input.edges.filter(e => e.from === input.nodes[2].id) })
      expect(dankyou.next('Yes').value).toEqual({ node: input.nodes[4], edges: [input.edges[5]] })
      expect(dankyou.next().value).toEqual({ node: input.nodes[5], edges: [] })
      expect(dankyou.next().value).toBe(undefined)
    })
  })

  describe('When iterating with the answer No', () => {
    test('Should iterate properly', () => {
      const input = getInput(1)
      const dankyou = new DankYou(input)

      expect(dankyou.next().value).toEqual({ node: input.nodes[0], edges: [input.edges[0]] })
      expect(dankyou.next().value).toEqual({ node: input.nodes[1], edges: [input.edges[1]] })
      expect(dankyou.next().value).toEqual({ node: input.nodes[2], edges: input.edges.filter(e => e.from === input.nodes[2].id) })
      expect(dankyou.next('No').value).toEqual({ node: input.nodes[3], edges: [input.edges[4]] })
      expect(dankyou.next().value).toEqual({ node: input.nodes[5], edges: [] })
      expect(dankyou.next().value).toBe(undefined)
    })
  })

  describe('When answering with an invalid option to a node with multiple edges', () => {
    test('Should throw error', () => {
      const input = getInput(3)
      const dankyou = new DankYou(input)

      // Initiate the first node regardless
      dankyou.next()

      expect(() => {
        dankyou.next('Lul')
      }).toThrowError('No option found for id: 3 and option: Lul.')
    })
  })

  describe('When answering with an empty option to a node with multiple edges', () => {
    test('Should also throw error', () => {
      const input = getInput(3)
      const dankyou = new DankYou(input)

      // Initiate the first node regardless
      dankyou.next()

      expect(() => {
        dankyou.next()
      }).toThrowError('Empty option is not allowed.')
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
