import { TileMap } from 'excalibur'
import { Config } from '../Config'

export class TileMapFactory {
  public static getEmptyTileMap(): TileMap {
    const { COLS, ROWS, TILE_SIZE } = Config.WORLD

    return new TileMap(0, 0, TILE_SIZE, TILE_SIZE, ROWS, COLS)
  }
}
