import { Actor, CollisionType, Engine, Input, SpriteSheet } from 'excalibur'
import { txIdlePlayer0, txIdlePlayer1, txIdlePlayer2, txIdlePlayer3, txRunningPlayer0, txRunningPlayer1, txRunningPlayer2, txRunningPlayer3 } from '../common/resources'
import { Directions, HorizontalDirection, Player, VerticalDirection } from './Player'

const MAX_VELOCITY = 300
const BRAKE_VELOCITY = 10
const SPEED = 25

export class PlayerActor extends Actor {
  private player: Player

  constructor(player: Player) {
    super({ x: 300, y: 300, width: 24, height: 24 })

    this.body.collider.type = CollisionType.Active
    this.player = player
  }

  public onInitialize(engine: Engine) {
    const idlePlayerSprite0 = txIdlePlayer0.asSprite()
    const idlePlayerSprite1 = txIdlePlayer1.asSprite()
    const idlePlayerSprite2 = txIdlePlayer2.asSprite()
    const idlePlayerSprite3 = txIdlePlayer3.asSprite()

    const idlePlayerIdleSheet = new SpriteSheet([idlePlayerSprite0, idlePlayerSprite1, idlePlayerSprite2, idlePlayerSprite3])
    const idlePlayerIdleAnimation = idlePlayerIdleSheet.getAnimationForAll(engine, 125)

    const runningPlayerSprite0 = txRunningPlayer0.asSprite()
    const runningPlayerSprite1 = txRunningPlayer1.asSprite()
    const runningPlayerSprite2 = txRunningPlayer2.asSprite()
    const runningPlayerSprite3 = txRunningPlayer3.asSprite()

    const playerRunningSheet = new SpriteSheet([runningPlayerSprite0, runningPlayerSprite1, runningPlayerSprite2, runningPlayerSprite3])
    const playerRunningRightAnimation = playerRunningSheet.getAnimationForAll(engine, 100)

    this.addDrawing('idle', idlePlayerIdleAnimation)
    this.addDrawing('moving', playerRunningRightAnimation)

    this.setDrawing('idle')
    this.scale.setTo(1.5, 1.5)
  }

  public update(engine: Engine, delta: number) {
    const pressedKeys = engine.input.keyboard.getKeys()
    const directions: Directions = {}
    if (pressedKeys.includes(Input.Keys.S)) {
      directions.verticalDirection = VerticalDirection.BOTTOM
    } else if (pressedKeys.includes(Input.Keys.Z)) {
      directions.verticalDirection = VerticalDirection.UP
    }

    if (pressedKeys.includes(Input.Keys.Q)) {
      directions.horizontalDirection = HorizontalDirection.LEFT
    } else if (pressedKeys.includes(Input.Keys.D)) {
      directions.horizontalDirection = HorizontalDirection.RIGHT
    }

    this.player.chooseDirection(directions)

    this.move()

    this.limitVelocity()

    super.update(engine, delta)
  }

  private limitVelocity() {
    if (this.vel.x > MAX_VELOCITY) {
      this.vel.x = MAX_VELOCITY
    } else if (this.vel.x < -MAX_VELOCITY) {
      this.vel.x = -MAX_VELOCITY
    }

    if (this.vel.y > MAX_VELOCITY) {
      this.vel.y = MAX_VELOCITY
    } else if (this.vel.y < -MAX_VELOCITY) {
      this.vel.y = -MAX_VELOCITY
    }
  }

  private move() {
    const { horizontalDirection, verticalDirection } = this.player.getDirections()
    let xVelocityDelta = 0
    if (horizontalDirection === HorizontalDirection.LEFT) {
      xVelocityDelta = -SPEED
      this.setDrawing('moving')
    } else if (horizontalDirection === HorizontalDirection.RIGHT) {
      xVelocityDelta = SPEED
      this.setDrawing('moving')
    } else {
      this.setDrawing('idle')
      if (this.vel.x > 0) {
        xVelocityDelta = -BRAKE_VELOCITY
      } else if (this.vel.x < 0) {
        xVelocityDelta = BRAKE_VELOCITY
      }
    }

    this.vel.x += xVelocityDelta

    let yVelocityDelta = 0
    if (verticalDirection === VerticalDirection.UP) {
      yVelocityDelta = -SPEED
    } else if (verticalDirection === VerticalDirection.BOTTOM) {
      yVelocityDelta = SPEED
    } else {
      if (this.vel.y > 0) {
        yVelocityDelta = -BRAKE_VELOCITY
      } else if (this.vel.y < 0) {
        yVelocityDelta = BRAKE_VELOCITY
      }
    }

    this.vel.y += yVelocityDelta
  }

  public stop() {
    this.player.chooseDirection({})
    this.vel.x = 0
    this.vel.y = 0
  }
}