import { Color, DisplayMode, Engine } from 'excalibur'
import { PlayerActor } from '../players/PlayerActor'
import { Config } from './Config'
import { loader } from './resources'
import { StartRoomScene } from '../rooms/scenes/StartRoomScene'
import { BobGanoush } from '../players/BobGanoush'

export class Game extends Engine {
  constructor() {
    super({ displayMode: DisplayMode.FullScreen, backgroundColor: Color.White, antialiasing: false })

    const { GAME_WIDTH, GAME_HEIGHT } = Config.WORLD

    this.screen.resolution = { width: GAME_WIDTH, height: GAME_HEIGHT }
  }

  public start() {
    return super.start(loader).then(() => {
      const player = new BobGanoush()
      const playerActor = new PlayerActor(player)
      const startRoom = new StartRoomScene(this, playerActor)

      this.add('room', startRoom)

      this.goToScene('room')
    })
  }
}
