// TODO: move this to a definition file
interface GraphNode {
  id: number
  type: string
  text: string
}

interface GraphEdge {
  from: number
  to: number
  text: string
}

interface Input {
  root: number
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export default class DankYou {
  constructor (input: Input) {
    this.iterator = this.createIterator(input)

    return this
  }

  private currentNode!: GraphNode
  private iterator!: IterableIterator<GraphNode>
  private nextNodeId: number = 0
  private end: boolean = false

  /**
   * Get the next node
   * @param answer - The answer to the next node. Only applies to question-type node for now.
   */
  public next (answer?: string) {
    return this.iterator.next(answer)
  }
  /**
   * Create the iterator for the nodes
   * @param input - The graph-like input.
   */
  private *createIterator (input: Input) {
    this.nextNodeId = input.root

    while (!this.end) {
      const currentNode = input.nodes.find((node: GraphNode) => this.nextNodeId === node.id) || null
      if (!currentNode) {
        throw new Error(`Node with id: ${this.nextNodeId} cannot be found.`)
      }

      this.currentNode = currentNode

      // Find the nearest text/question, since we should not iterate through the other answers
      const nextNode = input.nodes.find((node: GraphNode) => node.id > this.nextNodeId && node.type !== 'answer') || null
      this.end = !nextNode

      const answer = yield this.currentNode

      switch (this.currentNode.type) {
        case 'question': {
          if (typeof answer === 'undefined') {
            throw new Error('Empty answer is not allowed.')
          }

          const answerEdge = input.edges.find((node: GraphEdge) => node.from === this.nextNodeId && node.text === answer)
          if (!answerEdge) {
            throw new Error(`No answer found for id: ${this.nextNodeId} and answer: ${answer}.`)
          }

          this.nextNodeId = answerEdge.to

          break
        }
        default: {
          if (nextNode) {
            this.nextNodeId = nextNode.id
          }

          break
        }
      }
    }
  }
}
