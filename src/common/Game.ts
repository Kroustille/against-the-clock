import { Color, DisplayMode, Engine } from 'excalibur'
import { Player } from '../players/Player'
import { GAME_WIDTH, GAME_HEIGHT } from './config'
import { loader } from './resources'
import { StartRoom } from './scenes/StartRoom'

export class Game extends Engine {
  constructor() {
    super({ displayMode: DisplayMode.FullScreen, backgroundColor: Color.White })

    this.screen.resolution = { width: GAME_WIDTH, height: GAME_HEIGHT }
  }

  public start() {
    return super.start(loader).then(() => {
      const player = new Player()
      const startRoom = new StartRoom(this)
      startRoom.add(player)

      this.add('room', startRoom)

      this.goToScene('room')
    })
  }
}