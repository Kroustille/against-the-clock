import { StartRoom } from '../rooms/StartRoom'
import { LevelGenerationState } from './LevelGenerationState'

export class Prehistoric {
  public generate(): StartRoom {
    const generationState = new LevelGenerationState(5, 1)

    const startRoom = new StartRoom(0, 0, 0)
    startRoom.fillRooms(generationState)

    return startRoom
  }
}
