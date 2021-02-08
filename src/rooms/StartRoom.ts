import { COLS, ROWS } from '../common/config'
import { Room } from './Room'
import { CellType } from './CellType'

export class StartRoom extends Room {
  public generate(): CellType[] {
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        let cell: CellType = CellType.EMPTY
        if (x == 0) {
          cell = CellType.WALL
        }
        if (y == 0) {
          cell = CellType.WALL
        }
        if (x == COLS - 1) {
          cell = CellType.WALL
        }
        if (y == ROWS - 1) {
          cell = CellType.WALL
        }

        this.cells.push(cell)
      }
    }

    return this.cells
  }
}