export enum HorizontalDirection {
  LEFT,
  RIGHT
}

export enum VerticalDirection {
  UP,
  BOTTOM
}

export interface Directions {
  horizontalDirection?: HorizontalDirection
  verticalDirection?: VerticalDirection
}

export class Player {
  private directions: Directions

  public constructor() {
    this.directions = {}
  }

  public chooseDirection(directions: Directions) {
    this.directions = directions
  }

  public getDirections(): Directions {
    return this.directions
  }
}