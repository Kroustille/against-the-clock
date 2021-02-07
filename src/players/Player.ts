import { Actor, Engine, Input, SpriteSheet } from 'excalibur'
import { txPlayer0, txPlayer1, txPlayer2, txPlayer3 } from '../common/resources'

const MAX_VELOCITY = 150
const BRAKE_VELOCITY = 5
const SPEED = 10

export class Player extends Actor {
  constructor() {
    super({ x: 300, y: 300 })
  }

  public onInitialize(engine: Engine) {
    const playerSprite0 = txPlayer0.asSprite()
    const playerSprite1 = txPlayer1.asSprite()
    const playerSprite2 = txPlayer2.asSprite()
    const playerSprite3 = txPlayer3.asSprite()

    const playerIdleSheet = new SpriteSheet([playerSprite0, playerSprite1, playerSprite2, playerSprite3])
    const playerIdleAnimation = playerIdleSheet.getAnimationForAll(engine, 125)

    this.addDrawing('idle', playerIdleAnimation)
    this.scale.setTo(2, 2)
  }

  public update(engine: Engine, delta: number) {
    if (
      engine.input.keyboard.isHeld(Input.Keys.S)
    ) {
      this.moveDown()
    } else if (engine.input.keyboard.isHeld(Input.Keys.Z)) {
      this.moveUp()
    } else if (engine.input.keyboard.isHeld(Input.Keys.Q)) {
      this.moveLeft()
    } else if (engine.input.keyboard.isHeld(Input.Keys.D)) {
      this.moveRight()
    } else {
      this.brake()
    }

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

  private moveDown() {
    this.vel.y += SPEED
  }

  private moveUp() {
    this.vel.y -= SPEED
  }

  private moveLeft() {
    this.vel.x -= SPEED
  }

  private moveRight() {
    this.vel.x += SPEED
  }

  private brake() {
    if (this.vel.x > 0) {
      this.vel.x -= BRAKE_VELOCITY
    } else if (this.vel.x < 0) {
      this.vel.x += BRAKE_VELOCITY
    }

    if (this.vel.y > 0) {
      this.vel.y -= BRAKE_VELOCITY
    } else if (this.vel.y < 0) {
      this.vel.y += BRAKE_VELOCITY
    }
  }
}