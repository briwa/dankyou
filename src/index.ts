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
   * @param option - The option to the next node.
   * @returns The value of the next node and edges (if exists) in a form of `IteratorResult`
   */
  public next (option?: string): IteratorResult<CurrentNode> {
    return this.iterable.next(option)
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

      const nextEdges = input.edges.filter((edge) => edge.from === this.pointer)
      this.end = nextEdges.length === 0

      const option: undefined | string = yield { node: this.currentNode, edges: nextEdges }

      if (nextEdges.length > 1) {
        if (typeof option === 'undefined') {
          throw new Error('Empty option is not allowed.')
        }

        const nextEdge = nextEdges.find((node: GraphEdge) => node.option === option)
        if (!nextEdge) {
          throw new Error(`No option found for id: ${this.pointer} and option: ${option}.`)
        }

        this.pointer = nextEdge.to
      } else if (nextEdges.length === 1) {
        this.pointer = nextEdges[0].to
      }
    }
  }
}
