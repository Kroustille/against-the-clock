import { Config } from '../common/Config'
import { Room } from './Room'
import { CellType } from './CellType'

export class StartRoom extends Room {
  public generate(): CellType[] {
    const { COLS, ROWS } = Config.WORLD
    const midHorizontalWall = Math.floor(COLS / 2)
    const midVerticalWall = Math.floor(ROWS / 2)

    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        let cell: CellType = CellType.EMPTY
        const isLeftWall = x === 0
        if (isLeftWall) {
          if (y == midVerticalWall && this.leftRoom) {
            cell = CellType.DOOR
          } else {
            cell = CellType.WALL
          }
        }

        const isUpWall = y === 0
        if (isUpWall) {
          if (x == midHorizontalWall && this.upRoom) {
            cell = CellType.DOOR
          } else {
            cell = CellType.WALL
          }
        }

        const isRightWall = x === COLS - 1
        if (isRightWall) {
          if (y == midVerticalWall && this.rightRoom) {
            cell = CellType.DOOR
          } else {
            cell = CellType.WALL
          }
        }

        const isDownWall = y === ROWS - 1
        if (isDownWall) {
          const isDoorCell = x == midHorizontalWall
          if (isDoorCell && this.downRoom) {
            cell = CellType.DOOR
          } else {
            cell = CellType.WALL
          }
        }

        this.cells.push(cell)
      }
    }

    return this.cells
  }
}
