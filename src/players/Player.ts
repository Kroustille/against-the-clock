import { Directions } from 'src/common/Directions'

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