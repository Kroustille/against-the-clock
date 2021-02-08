import { CollisionResolutionStrategy, Color, DisplayMode, Engine, Physics } from 'excalibur'
import { Player } from '../players/Player'
import { PlayerActor } from '../players/PlayerActor'
import { GAME_WIDTH, GAME_HEIGHT } from './config'
import { loader } from './resources'
import { StartRoomScene } from './scenes/StartRoomScene'

export class Game extends Engine {
  constructor() {
    super({ displayMode: DisplayMode.FullScreen, backgroundColor: Color.White })

    this.screen.resolution = { width: GAME_WIDTH, height: GAME_HEIGHT }
    Physics.collisionResolutionStrategy = CollisionResolutionStrategy.RigidBody
  }

  public start() {
    return super.start(loader).then(() => {
      const player = new Player()
      const playerActor = new PlayerActor(player)
      const startRoom = new StartRoomScene(this)
      startRoom.addPlayer(playerActor)

      this.add('room', startRoom)

      this.goToScene('room')
    })
  }
}