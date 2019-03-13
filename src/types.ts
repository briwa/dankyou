export enum Direction {
  PREV,
  NEXT
}

export interface GraphNode {
  id: number | string
  text: string
}

export interface GraphEdge {
  from: number | string
  to: number | string
  text?: void | string
}

export interface Input {
  root: number | string
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
