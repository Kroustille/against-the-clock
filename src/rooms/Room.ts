import { LevelGenerationState } from '../levels/LevelGenerationState'
import { CellType } from './CellType'
import { StartRoom } from './StartRoom'

export abstract class Room {
  protected cells: CellType[] = []

  protected upRoom?: Room
  protected downRoom?: Room
  protected leftRoom?: Room
  protected rightRoom?: Room

  public constructor(
    protected x: number,
    protected y: number,
    protected depth: number
  ) {
  }

  public abstract generate(): CellType[]
  public fillRooms(levelGenerationState: LevelGenerationState) {
    const canGenerateUpRoom = levelGenerationState.canGenerateRoom(this.depth)
    if (canGenerateUpRoom) {
      levelGenerationState.addRoom()
      this.upRoom = new StartRoom(this.x + 1, this.y, this.depth + 1)
      this.upRoom.fillRooms(levelGenerationState)
    }

    const canGenerateRightRoom = levelGenerationState.canGenerateRoom(this.depth)
    if (canGenerateRightRoom) {
      levelGenerationState.addRoom()
      this.rightRoom = new StartRoom(this.x + 1, this.y, this.depth + 1)
      this.rightRoom.fillRooms(levelGenerationState)
    }

    const canGenerateLeftRoom = levelGenerationState.canGenerateRoom(this.depth)
    if (canGenerateLeftRoom) {
      levelGenerationState.addRoom()
      this.leftRoom = new StartRoom(this.x + 1, this.y, this.depth + 1)
      this.leftRoom.fillRooms(levelGenerationState)
    }

    const canGenerateDownRoom = levelGenerationState.canGenerateRoom(this.depth)
    if (canGenerateDownRoom) {
      levelGenerationState.addRoom()
      this.downRoom = new StartRoom(this.x + 1, this.y, this.depth + 1)
      this.downRoom.fillRooms(levelGenerationState)
    }
  }
}
