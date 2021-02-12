export class LevelGenerationState {
  private roomCount = 0

  constructor(
    private maxRoomCount: number,
    private maxDepth: number
  ) { }

  public canGenerateRoom(depth: number): boolean {
    return this.roomCount < this.maxRoomCount && depth < this.maxDepth
  }

  public addRoom() {
    this.roomCount++
  }
}
