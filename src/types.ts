export enum Direction {
  PREV,
  NEXT
}

export interface GraphNode {
  id: number
  text: string
}

export interface GraphEdge {
  from: number
  to: number
  text?: void | string
}

export interface Input {
  root: number
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface CurrentNode {
  node: GraphNode
  edges: {
    next: GraphEdge[]
    prev: GraphEdge[]
  }
}
