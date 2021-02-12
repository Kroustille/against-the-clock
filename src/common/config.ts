const ROWS = 9
const COLS = 15
const TILE_SIZE = 32

export const Config = {
  WORLD: {
    TILE_SIZE: TILE_SIZE,
    ROWS: ROWS,
    COLS: COLS,
    GAME_WIDTH: COLS * TILE_SIZE,
    GAME_HEIGHT: ROWS * TILE_SIZE
  },
  PLAYER: {
    MAX_VELOCITY: 300,
    BRAKE_VELOCITY: 15,
    SPEED: 25,
    SHOOT_SPEED: 250
  },
  BULLET: {
    SPEED: 150
  }
}
