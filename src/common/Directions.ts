export enum HorizontalDirection {
  LEFT = '0',
  RIGHT = '1'
}

export enum VerticalDirection {
  UP = '2',
  DOWN = '3'
}

export interface Directions {
  horizontalDirection?: HorizontalDirection
  verticalDirection?: VerticalDirection
}
