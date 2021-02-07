import { TileMap } from 'excalibur'
import { COLS, ROWS, TILE_SIZE } from '../config'

export class TileMapFactory {
  public static getEmptyTileMap(): TileMap {
    return new TileMap(0, 0, TILE_SIZE, TILE_SIZE, ROWS, COLS)
  }
}