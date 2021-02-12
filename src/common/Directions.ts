export enum HorizontalDirection {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export enum VerticalDirection {
  UP = 'UP',
  DOWN = 'DOWN'
}

export interface Directions {
  horizontalDirection?: HorizontalDirection
  verticalDirection?: VerticalDirection
}
