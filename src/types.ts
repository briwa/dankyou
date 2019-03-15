export enum Direction {
  PREV,
  NEXT
}

export interface GraphNode {
  text: string
}

export interface GraphEdge {
  from: string
  to: string
  text?: void | string
}

export interface Input {
  root: string
  nodes: Record<string, GraphNode>
  edges: GraphEdge[]
}

export interface CurrentNode {
  id: string
  node: GraphNode
  edges: {
    next: GraphEdge[]
    prev: GraphEdge[]
  }
}
