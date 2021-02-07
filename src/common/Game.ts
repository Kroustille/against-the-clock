import { Color, DisplayMode, Engine, Loader, SpriteSheet, Texture } from 'excalibur'
import { Player } from '../players/Player'
import knightIdle0 from '../assets/images/frames/knight_f_idle_anim_f0.png'
import knightIdle1 from '../assets/images/frames/knight_f_idle_anim_f1.png'
import knightIdle2 from '../assets/images/frames/knight_f_idle_anim_f2.png'
import knightIdle3 from '../assets/images/frames/knight_f_idle_anim_f3.png'

export class Game extends Engine {
  constructor() {
    super({ displayMode: DisplayMode.FullScreen, backgroundColor: Color.White })
  }

  public start() {
    const txPlayer0 = new Texture(knightIdle0)
    const txPlayer1 = new Texture(knightIdle1)
    const txPlayer2 = new Texture(knightIdle2)
    const txPlayer3 = new Texture(knightIdle3)
    const loader = new Loader([txPlayer0, txPlayer1, txPlayer2, txPlayer3])

    return super.start(loader).then(() => {
      const playerSprite0 = txPlayer0.asSprite()
      const playerSprite1 = txPlayer1.asSprite()
      const playerSprite2 = txPlayer2.asSprite()
      const playerSprite3 = txPlayer3.asSprite()
      const player = new Player()

      const playerIdleSheet = new SpriteSheet([playerSprite0, playerSprite1, playerSprite2, playerSprite3])
      const playerIdleAnimation = playerIdleSheet.getAnimationForAll(this, 125)

      player.addDrawing('idle', playerIdleAnimation)
      this.add(player)
    })
  }
}