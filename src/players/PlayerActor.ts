import { Actor, CollisionType, Engine, Input, SpriteSheet, Timer } from 'excalibur'
import { BulletActor } from '../bullets/BulletActor'
import { txIdlePlayer0, txIdlePlayer1, txIdlePlayer2, txIdlePlayer3, txRunningPlayer0, txRunningPlayer1, txRunningPlayer2, txRunningPlayer3 } from '../common/resources'
import { Directions, HorizontalDirection, VerticalDirection } from '../common/Directions'
import { Player } from './Player'
import { Config } from '../common/Config'

export class PlayerActor extends Actor {
  private player: Player
  private lastShootTime: number

  constructor(player: Player) {
    super({ x: 50, y: 50, width: 24, height: 24 })

    this.body.collider.type = CollisionType.Active
    this.player = player
    this.lastShootTime = 0
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

    const lifeTimer = new Timer({
      fcn: () => {
        this.player.takeDamageOfTime()
        if (this.player.isDead()) {
          this.kill()
        }
      },
      interval: 1000,
      repeats: true,
      numberOfRepeats: -1
    })

    engine.addTimer(lifeTimer)
  }

  public update(engine: Engine, delta: number) {
    const pressedKeys = engine.input.keyboard.getKeys()
    const directions: Directions = {}
    if (pressedKeys.includes(Input.Keys.S)) {
      directions.verticalDirection = VerticalDirection.DOWN
    } else if (pressedKeys.includes(Input.Keys.Z)) {
      directions.verticalDirection = VerticalDirection.UP
    }

    if (pressedKeys.includes(Input.Keys.Q)) {
      directions.horizontalDirection = HorizontalDirection.LEFT
    } else if (pressedKeys.includes(Input.Keys.D)) {
      directions.horizontalDirection = HorizontalDirection.RIGHT
    }

    this.player.chooseDirection(directions)

    if (pressedKeys.includes(Input.Keys.Right)) {
      this.shoot(engine, HorizontalDirection.RIGHT)
    }

    if (pressedKeys.includes(Input.Keys.Left)) {
      this.shoot(engine, HorizontalDirection.LEFT)
    }

    if (pressedKeys.includes(Input.Keys.Down)) {
      this.shoot(engine, VerticalDirection.DOWN)
    }

    if (pressedKeys.includes(Input.Keys.Up)) {
      this.shoot(engine, VerticalDirection.UP)
    }

    this.move()

    this.limitVelocity()

    super.update(engine, delta)
  }

  private shoot(engine: Engine, direction: HorizontalDirection | VerticalDirection) {
    const now = new Date().getTime()
    const { SHOOT_SPEED } = Config.PLAYER
    const canShoot = now - this.lastShootTime > SHOOT_SPEED

    if (canShoot) {
      this.lastShootTime = now
      const bullet = new BulletActor(this.pos.x, this.pos.y, direction, this.player.getDamage(), this)

      engine.add(bullet)
    }
  }

  private limitVelocity() {
    const { MAX_VELOCITY } = Config.PLAYER
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
    const { BRAKE_VELOCITY, SPEED } = Config.PLAYER
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
        if (this.vel.x < BRAKE_VELOCITY) {
          xVelocityDelta = -this.vel.x
        } else {
          xVelocityDelta = -BRAKE_VELOCITY
        }
      } else if (this.vel.x < 0) {
        if (this.vel.x > BRAKE_VELOCITY) {
          xVelocityDelta = this.vel.x
        } else {
          xVelocityDelta = BRAKE_VELOCITY
        }
      }
    }

    this.vel.x += xVelocityDelta

    let yVelocityDelta = 0
    if (verticalDirection === VerticalDirection.UP) {
      yVelocityDelta = -SPEED
    } else if (verticalDirection === VerticalDirection.DOWN) {
      yVelocityDelta = SPEED
    } else {
      if (this.vel.y > 0) {
        if (this.vel.y < BRAKE_VELOCITY) {
          yVelocityDelta = -this.vel.y
        } else {
          yVelocityDelta = -BRAKE_VELOCITY
        }
      } else if (this.vel.y < 0) {
        if (this.vel.y > BRAKE_VELOCITY) {
          yVelocityDelta = this.vel.y
        } else {
          yVelocityDelta = BRAKE_VELOCITY
        }
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
