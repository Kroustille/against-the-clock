import { Engine, Scene, SpriteSheet, TileMap, TileSprite } from 'excalibur'
import { PlayerActor } from '../../players/PlayerActor'
import { CellType } from '../../rooms/CellType'
import { StartRoom } from '../../rooms/StartRoom'
import { GAME_HEIGHT, GAME_WIDTH, ROWS, TILE_SIZE } from '../config'
import { txForestTiles } from '../resources'
import { TileMapFactory } from './TileMapFactory'

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
  private player?: PlayerActor

  constructor(engine: Engine) {
    super(engine)

    const startRoom = new StartRoom()
    const cells = startRoom.generate()

    const mapDefinition: MapDefinition = {
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      cells
    }

    this.mapDefiniton = mapDefinition

    this.tileMap = TileMapFactory.getEmptyTileMap()
  }

  public onInitialize(): void {
    const forestSpriteSheet = new SpriteSheet(txForestTiles, 16, 12, 32, 32)

    this.tileMap.registerSpriteSheet('1', forestSpriteSheet)
    const grassSprite = new TileSprite('1', 0)
    const flowerSprite1 = new TileSprite('1', 1)
    const flowerSprite2 = new TileSprite('1', 2)
    const flowerSprite3 = new TileSprite('1', 3)

    let spriteIndex = 1
    this.mapDefiniton.cells.forEach((cell: CellType, index: number) => {
      const x = Math.floor(index / ROWS)
      const y = index % ROWS
      if (cell == CellType.WALL) {
        if (spriteIndex === 1) {
          this.tileMap.getCell(x, y).pushSprite(flowerSprite1)
          spriteIndex = 2
        } else if (spriteIndex === 2) {
          this.tileMap.getCell(x, y).pushSprite(flowerSprite2)
          spriteIndex = 3
        } else if (spriteIndex === 3) {
          this.tileMap.getCell(x, y).pushSprite(flowerSprite3)
          spriteIndex = 1
        }
        this.tileMap.getCell(x, y).solid = true
      } else {
        this.tileMap.getCell(x, y).pushSprite(grassSprite)
      }
    })

    this.add(this.tileMap)
  }

  public addPlayer(player: PlayerActor): void {
    this.player = player
    super.add(player)
  }

  public update(engine: Engine, delta: number) {
    if (this.player) {
      const collisionVector = this.tileMap.collides(this.player)
      // console.log(collisionVector)
      if (collisionVector) {
        this.player.stop()
      }
    }
    super.update(engine, delta)
  }
}