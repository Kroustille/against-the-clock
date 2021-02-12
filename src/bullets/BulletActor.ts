import { Actor, CollisionType, PreCollisionEvent } from 'excalibur'

import { HorizontalDirection, VerticalDirection } from '../common/Directions'
import { txWallLeft } from '../common/resources'

const BULLET_SPEED = 150

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
    this.addDrawing(txWallLeft)
    switch (this.direction) {
      case HorizontalDirection.LEFT:
        this.vel.x = -BULLET_SPEED
        break
      case HorizontalDirection.RIGHT:
        this.vel.x = BULLET_SPEED
        break
      case VerticalDirection.DOWN:
        this.vel.y = BULLET_SPEED
        break
      case VerticalDirection.UP:
        this.vel.y = -BULLET_SPEED
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