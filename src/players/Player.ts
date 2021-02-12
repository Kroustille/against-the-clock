import { Directions } from 'src/common/Directions'

export class Player {
  private directions: Directions
  private damage: number

  public constructor() {
    this.directions = {}
    this.damage = 20
  }

  public chooseDirection(directions: Directions) {
    this.directions = directions
  }

  public getDirections(): Directions {
    return this.directions
  }

  public getDamage(): number {
    return this.damage
  }
}