import { Engine, Scene, SpriteSheet, TileMap, TileSprite } from 'excalibur'
import { GAME_HEIGHT, GAME_WIDTH } from '../config'
import { txForestTiles, txWallLeft } from '../resources'

interface MapDefinition {
  cells: MapCellDefinition[]
  // tileSheets: MapTileSheet[]
  width: number
  height: number
  tileWidth: number
  tileHeight: number
}

interface MapCellDefinition {
  x: number
  y: number
  // tileId: number
  // sheetId: number
}

export class StartRoom extends Scene {
  private tileMap: TileMap
  private mapDefiniton: MapDefinition
  constructor(engine: Engine) {
    super(engine)

    const mapDefinition: MapDefinition = {
      tileWidth: 32,
      tileHeight: 32,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      cells: [
        {
          x: 0,
          y: 0,
        },
        {
          x: 1,
          y: 0,
        }
      ]
    }

    this.mapDefiniton = mapDefinition

    this.tileMap = new TileMap(0, 0, mapDefinition.tileWidth, mapDefinition.tileHeight,
      mapDefinition.height / mapDefinition.tileHeight, mapDefinition.width / mapDefinition.tileWidth)
  }

  public onInitialize(): void {
    const forestSpriteSheet = new SpriteSheet(txForestTiles, 16, 12, 32, 32)

    this.tileMap.registerSpriteSheet('1', forestSpriteSheet)
    const tileSprite = new TileSprite('1', 0)

    this.tileMap.data.forEach(cell => {
      cell.pushSprite(tileSprite)
    })

    this.add(this.tileMap)
  }

}