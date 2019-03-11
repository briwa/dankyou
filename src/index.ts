import { Input, GraphNode, GraphEdge, CurrentNode } from './types'

/**
 * Simple helper to iterate through a graph-like data structure. For now, the usage is focusing only on flowcharts
 */
export default class DankYou {
  constructor (input: Input) {
    this.iterable = this.createIterator(input)

    return this
  }

  private currentNode!: GraphNode
  private iterable!: Iterator<CurrentNode>
  private pointer: number = 0
  private end: boolean = false

  /**
   * Get the next node
   * @param answer - The answer to the next node. Only applies to question-type node for now.
   * @returns The value of the next node and edges (if exists) in a form of `IteratorResult`
   */
  public next (answer?: string): IteratorResult<CurrentNode> {
    return this.iterable.next(answer)
  }
  /**
   * Create the iterator for the nodes
   * @param input - The graph-like input.
   * @yields The next node and edges, if any
   */
  private *createIterator (input: Input): IterableIterator<CurrentNode> {
    this.pointer = input.root

    while (!this.end) {
      const currentNode = input.nodes.find((node: GraphNode) => this.pointer === node.id)
      if (!currentNode) {
        throw new Error(`Node with id: ${this.pointer} cannot be found.`)
      }

      this.currentNode = currentNode

      // Find the nearest text/question, since we should not iterate through the other answers
      const nextNode = input.nodes.find((node) => node.id > this.pointer && node.type !== 'answer')
      const nextEdges = this.currentNode.type === 'question' ? input.edges.filter((edge) => edge.from === this.pointer) : []
      this.end = !nextNode

      const answer: string | undefined = yield { node: this.currentNode, edges: nextEdges }

      switch (this.currentNode.type) {
        case 'question': {
          if (typeof answer === 'undefined') {
            throw new Error('Empty answer is not allowed.')
          }

          const answerEdge = nextEdges.find((node: GraphEdge) => node.text === answer)
          if (!answerEdge) {
            throw new Error(`No answer found for id: ${this.pointer} and answer: ${answer}.`)
          }

          this.pointer = answerEdge.to

          break
        }
        default: {
          if (nextNode) {
            this.pointer = nextNode.id
          }

          break
        }
      }
    }
  }
}
