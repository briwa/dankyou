import DankYou from '../src/index'

function getInput (root: number) {
  return {
    root,
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
}

describe('DankYou', () => {
  describe('When iterating with the answer Yes', () => {
    test('Should iterate properly', () => {
      const input = getInput(1)
      const dankyou = new DankYou(input)

      expect(dankyou.next().value).toEqual({ node: input.nodes[0], edges: [] })
      expect(dankyou.next().value).toEqual({ node: input.nodes[1], edges: [] })
      expect(dankyou.next().value).toEqual({ node: input.nodes[2], edges: input.edges })
      expect(dankyou.next('Yes').value).toEqual({ node: input.nodes[4], edges: [] })
      expect(dankyou.next().value).toEqual({ node: input.nodes[5], edges: [] })
      expect(dankyou.next().value).toBe(undefined)
    })
  })

  describe('When iterating with the answer No', () => {
    test('Should iterate properly', () => {
      const input = getInput(1)
      const dankyou = new DankYou(input)

      expect(dankyou.next().value).toEqual({ node: input.nodes[0], edges: [] })
      expect(dankyou.next().value).toEqual({ node: input.nodes[1], edges: [] })
      expect(dankyou.next().value).toEqual({ node: input.nodes[2], edges: input.edges })
      expect(dankyou.next('No').value).toEqual({ node: input.nodes[3], edges: [] })
      expect(dankyou.next().value).toEqual({ node: input.nodes[5], edges: [] })
      expect(dankyou.next().value).toBe(undefined)
    })
  })

  describe('When answering with an invalid answer to a question', () => {
    test('Should throw error', () => {
      const input = getInput(3)
      const dankyou = new DankYou(input)

      // Initiate the first node regardless
      dankyou.next()

      expect(() => {
        dankyou.next('Lul')
      }).toThrowError('No answer found for id: 3 and answer: Lul.')
    })
  })

  describe('When answering with an empty answer to a question', () => {
    test('Should also throw error', () => {
      const input = getInput(3)
      const dankyou = new DankYou(input)

      // Initiate the first node regardless
      dankyou.next()

      expect(() => {
        dankyou.next()
      }).toThrowError('Empty answer is not allowed.')
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
