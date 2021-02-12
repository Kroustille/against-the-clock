import { Actor, CollisionType, PreCollisionEvent } from 'excalibur'
import { Config } from '../common/Config'

import { HorizontalDirection, VerticalDirection } from '../common/Directions'
import { txWallLeft } from '../common/resources'

export class BulletActor extends Actor {
  public owner: Actor
  private direction: HorizontalDirection | VerticalDirection
  private damage: number

  constructor(
    x: number,
    y: number,
    direction: HorizontalDirection | VerticalDirection,
    damage: number,
    owner: Actor,
  ) {
    super({ x, y, width: 24, height: 24 })

    this.damage = damage

    this.direction = direction
    this.body.collider.type = CollisionType.Passive
    this.owner = owner

    this.on('precollision', this.onPreCollision)
  }

  public onInitialize() {
    const { SPEED } = Config.BULLET
    this.addDrawing(txWallLeft)
    switch (this.direction) {
      case HorizontalDirection.LEFT:
        this.vel.x = -SPEED
        break
      case HorizontalDirection.RIGHT:
        this.vel.x = SPEED
        break
      case VerticalDirection.DOWN:
        this.vel.y = SPEED
        break
      case VerticalDirection.UP:
        this.vel.y = -SPEED
        break
    }
  }

  public getDamage(): number {
    return this.damage
  }

  public onPreCollision(event: PreCollisionEvent) {
    const wasShotByOwner = event.other === this.owner
    const wasAnotherBulletShotByOwner = event.other instanceof BulletActor ? (event.other as BulletActor).owner === this.owner : false
    if (!wasShotByOwner && !wasAnotherBulletShotByOwner) {
      this.kill()
    }
  }
}
