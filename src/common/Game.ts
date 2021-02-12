import { Color, DisplayMode, Engine } from 'excalibur'
import { PlayerActor } from '../players/PlayerActor'
import { Config } from './Config'
import { loader } from './resources'
import { StartRoomScene } from '../rooms/scenes/StartRoomScene'
import { BobGanoush } from '../players/BobGanoush'
import { Prehistoric } from '../levels/Prehistoric'

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

      const level = new Prehistoric()
      const startRoom = level.generate()

      const startRoomScene = new StartRoomScene(this, playerActor, startRoom)

      this.add('room', startRoomScene)

      this.goToScene('room')
    })
  }
}
