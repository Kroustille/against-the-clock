import { CollisionType, Color, DisplayMode, Engine } from 'excalibur'
import { Player } from '../players/Player'

export class Game extends Engine {
  constructor() {
    super({ displayMode: DisplayMode.FullScreen })
  }

  public start() {
    const player = new Player()

    this.add(player)

    return super.start()
  }
}