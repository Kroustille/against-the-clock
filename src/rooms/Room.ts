import { CellType } from './CellType'

export abstract class Room {
  protected cells: CellType[]

  public constructor() {
    this.cells = []
  }
}