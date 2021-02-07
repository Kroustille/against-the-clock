import { Actor, CollisionType, Color, Engine, Input, SpriteSheet } from 'excalibur'

const MAX_VELOCITY = 150
const BRAKE_VELOCITY = 5
const SPEED = 10

export class Player extends Actor {
  constructor() {
    super({ x: 100, y: 100, width: 100, height: 100 })
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