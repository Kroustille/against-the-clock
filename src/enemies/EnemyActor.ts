import { Actor, CollisionType, Color, EmitterType, Engine, ParticleEmitter, PreCollisionEvent, SpriteSheet } from 'excalibur'
import { BulletActor } from '../bullets/BulletActor'
import { txIdlePlayer0, txIdlePlayer1, txIdlePlayer2, txIdlePlayer3, txRunningPlayer0, txRunningPlayer1, txRunningPlayer2, txRunningPlayer3 } from '../common/resources'
import { PlayerActor } from '../players/PlayerActor'
import { Enemy } from './Enemy'

export class EnemyActor extends Actor {
  private enemy: Enemy

  constructor(enemy: Enemy) {
    super({ x: 100, y: 100, width: 24, height: 24 })

    this.enemy = enemy

    this.body.collider.type = CollisionType.Active
    this.on('precollision', this.onPreCollision)
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
    this.scale.setTo(1, 1)
  }

  public onPreCollision(event: PreCollisionEvent) {
    const isOtherActorABullet = event.other instanceof BulletActor
    if (isOtherActorABullet) {
      const bullet = event.other as BulletActor
      const shooter = bullet.owner
      const isShooterAPlayer = shooter instanceof PlayerActor
      if (isShooterAPlayer) {
        const damage = bullet.getDamage()
        this.enemy.takeDamage(damage)
        this.playDamageAnimation()
      }
    }

    if (this.enemy.isDead()) {
      this.kill()
    }
  }

  private playDamageAnimation() {
    const emitter = this.getShotParticleEmitter()
    this.add(emitter)
    setTimeout(() => {
      emitter.isEmitting = false
      emitter.kill()
    }, 100)
  }

  private getShotParticleEmitter(): ParticleEmitter {
    const emitter = new ParticleEmitter()
    emitter.emitterType = EmitterType.Circle // Shape of emitter nozzle
    emitter.radius = 2
    emitter.minVel = 100
    emitter.maxVel = 200
    emitter.minAngle = 0
    emitter.maxAngle = Math.PI * 2
    emitter.emitRate = 300 // 300 particles/second
    emitter.opacity = 0.3
    emitter.fadeFlag = true // fade particles overtime
    emitter.particleLife = 100 // in milliseconds = 1 sec
    emitter.maxSize = 3 // in pixels
    emitter.minSize = 1
    emitter.color = Color.Rose
    // set emitter settings
    emitter.isEmitting = true  // should the emitter be emitting
    return emitter
  }
}