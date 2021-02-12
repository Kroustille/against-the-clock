import { Directions } from 'src/common/Directions'

export abstract class Player {
  private directions: Directions
  protected abstract lifeInSeconds: number
  protected abstract baseDamage: number
  protected baseDamageMultiplier: number = 1

  public constructor() {
    this.directions = {}
  }

  public chooseDirection(directions: Directions) {
    this.directions = directions
  }

  public getDirections(): Directions {
    return this.directions
  }

  public getDamage(): number {
    return this.baseDamage * this.baseDamageMultiplier
  }

  public isDead(): boolean {
    return this.lifeInSeconds <= 0
  }

  public takeDamageOfTime() {
    this.lifeInSeconds--
    console.log(this.lifeInSeconds)
  }
}
