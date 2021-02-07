import { Actor, CollisionType, Color } from 'excalibur'

export class Player extends Actor {
  constructor() {
    super({ x: 100, y: 100, width: 100, height: 100 })
  }

  public onInitialize() {
    this.color = Color.Cyan
    this.body.collider.type = CollisionType.Fixed
  }
}