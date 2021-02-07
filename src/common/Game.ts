import { DisplayMode, Engine, Loader, Texture } from 'excalibur'
import { Player } from '../players/Player'
import bigDemonIdle from '../assets/images/frames/big_demon_idle_anim_f0.png'

export class Game extends Engine {
  constructor() {
    super({ displayMode: DisplayMode.FullScreen })
  }

  public start() {
    const txPlayer = new Texture(bigDemonIdle)
    const loader = new Loader([txPlayer])
    const player = new Player()

    this.add(player)

    return super.start(loader).then(() => {
      const playerSprite = txPlayer.asSprite()
      player.addDrawing(playerSprite)
    })
  }
}