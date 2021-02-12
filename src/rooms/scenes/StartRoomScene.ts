import { Engine, Random, Scene, SpriteSheet, TileMap, TileSprite } from 'excalibur'
import { PlayerActor } from '../../players/PlayerActor'
import { CellType } from '../CellType'
import { StartRoom } from '../StartRoom'
import { Config } from '../../common/Config'
import { txFloor, txForestTiles } from '../../common/resources'
import { TileMapFactory } from '../../common/scenes/TileMapFactory'
import { EnemyActor } from '../../enemies/EnemyActor'
import { Diplodocus } from '../../enemies/Diplodocus'

interface MapDefinition {
  cells: CellType[]
  // tileSheets: MapTileSheet[]
  width: number
  height: number
  tileWidth: number
  tileHeight: number
}

export class StartRoomScene extends Scene {
  private tileMap: TileMap
  private mapDefiniton: MapDefinition
  private player: PlayerActor

  constructor(engine: Engine, player: PlayerActor) {
    super(engine)

    const startRoom = new StartRoom()
    const cells = startRoom.generate()
    const { TILE_SIZE, GAME_WIDTH, GAME_HEIGHT } = Config.WORLD

    const mapDefinition: MapDefinition = {
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      cells
    }

    this.mapDefiniton = mapDefinition

    this.player = player
    this.tileMap = TileMapFactory.getEmptyTileMap()
  }

  public onInitialize(): void {
    const forestIndex = '1'
    const forestSpriteSheet = new SpriteSheet(txForestTiles, 16, 12, 32, 32)

    const floorIndex = '2'
    const floorSpriteSheet = new SpriteSheet(txFloor, 11, 1, 16, 16)
    floorSpriteSheet.sprites.forEach(sprite => sprite.scale.setTo(2, 2))

    this.tileMap.registerSpriteSheet(forestIndex, forestSpriteSheet)
    const wallSprite = new TileSprite(forestIndex, 10)
    const doorSprite = new TileSprite(forestIndex, 3)

    this.tileMap.registerSpriteSheet(floorIndex, floorSpriteSheet)
    const floor0 = new TileSprite(floorIndex, 0)
    const floor1 = new TileSprite(floorIndex, 1)
    const floor2 = new TileSprite(floorIndex, 2)
    const floor3 = new TileSprite(floorIndex, 3)

    this.mapDefiniton.cells.forEach((cell: CellType, index: number) => {
      this.addFloorSprites(index, cell, wallSprite, doorSprite, [floor0, floor1, floor2, floor3])
    })
    const diplodocus = new Diplodocus()
    const enemyActor = new EnemyActor(diplodocus)

    this.add(this.tileMap)
    this.add(this.player)
    this.add(enemyActor)
  }

  private addFloorSprites(index: number, cell: CellType, wallSprite: TileSprite, doorSprite: TileSprite, floorSprites: TileSprite[]) {
    const { ROWS } = Config.WORLD
    const x = Math.floor(index / ROWS)
    const y = index % ROWS
    const rand = new Random()

    if (cell == CellType.WALL) {
      this.tileMap.getCell(x, y).pushSprite(wallSprite)
      this.tileMap.getCell(x, y).solid = true
    } else if (cell == CellType.DOOR) {
      this.tileMap.getCell(x, y).pushSprite(doorSprite)
    } else {
      const floorIndex = rand.integer(0, floorSprites.length - 1)
      this.tileMap.getCell(x, y).pushSprite(floorSprites[floorIndex])
    }
  }
}
