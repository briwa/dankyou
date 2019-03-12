import { Input, GraphNode, GraphEdge, CurrentNode, Direction } from './types'

/**
 * Simple helper to iterate through a graph-like data structure. For now, the usage is focusing only on flowcharts
 */
export default class DankYou {
  private iterable: Iterator<CurrentNode>
  private currentNode!: GraphNode
  private nextEdges!: GraphEdge[]
  private prevEdges!: GraphEdge[]
  private pointer: number = 0
  private direction: Direction = Direction.NEXT
  private end: boolean = false

  constructor (public input: Input) {
    this.iterable = this.createIterator(input)

    return this
  }

  /**
   * Get the next node
   * @param id - The id to the next node, if applicable
   * @returns The next node and edges
   */
  public next (id?: number): IteratorResult<CurrentNode> {
    this.direction = Direction.NEXT
    return this.iterable.next(id)
  }
  /**
   * Get the previous node
   * @param id - The id to the previous node, if applicable
   * @returns The previous node and edges
   */
  public prev (id?: number): IteratorResult<CurrentNode> {
    this.direction = Direction.PREV
    return this.iterable.next(id)
  }
  /**
   * Create the iterator for the nodes
   * @param input - The graph-like input
   * @yields The node and edges, if any
   */
  private *createIterator (input: Input): IterableIterator<CurrentNode> {
    this.pointer = input.root

    while (!this.end) {
      const currentNode = input.nodes.find((node: GraphNode) => this.pointer === node.id)
      if (!currentNode) {
        throw new Error(`Node with id: ${this.pointer} cannot be found.`)
      }

      this.currentNode = currentNode

      this.nextEdges = input.edges.filter((edge) => edge.from === this.pointer)
      this.prevEdges = input.edges.filter((edge) => edge.to === this.pointer)
      const edges = this.direction === Direction.PREV ? this.prevEdges : this.nextEdges
      this.end = edges.length === 0

      const id: undefined | number = yield {
        node: this.currentNode,
        edges: {
          next: this.nextEdges,
          prev: this.prevEdges
        }
      }

      if (edges.length > 1) {
        if (typeof id === 'undefined') {
          throw new Error('Id must be supplied for nodes with multiple edges.')
        }

        this.pointer = id
      } else if (edges.length === 1) {
        this.pointer = this.direction === Direction.PREV ? edges[0].from : edges[0].to
      }
    }
  }
}
