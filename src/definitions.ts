export interface Mark {
  name: string;
  id: number;
  models: Model[];
}

export interface Model {
  id: number;
  markId: number;
  maxSpeed: number;
  motor: number;
  name: string;
  carInfo: string;
}

export interface MarkNode {
  name: string;
  type: string;
  children?: MarkNode[];
}

export interface NestedTreeNode {
  name: string;
  type: string;
}
