export interface GraphNode {
  id: number
  text: string
}

export interface GraphEdge {
  from: number
  to: number
  option?: void | string
}

export interface Input {
  root: number
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface CurrentNode {
  node: GraphNode
  edges: GraphEdge[]
}
