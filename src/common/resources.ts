import { Loader, Texture } from 'excalibur'
import knightIdle0 from '../assets/images/frames/knight_m_idle_anim_f0.png'
import knightIdle1 from '../assets/images/frames/knight_m_idle_anim_f1.png'
import knightIdle2 from '../assets/images/frames/knight_m_idle_anim_f2.png'
import knightIdle3 from '../assets/images/frames/knight_m_idle_anim_f3.png'

import forestTiles from '../assets/images/forest_tiles.png'

import wallLeft from '../assets/images/frames/wall_left.png'

const txPlayer0 = new Texture(knightIdle0)
const txPlayer1 = new Texture(knightIdle1)
const txPlayer2 = new Texture(knightIdle2)
const txPlayer3 = new Texture(knightIdle3)

const txWallLeft = new Texture(wallLeft)
const txForestTiles = new Texture(forestTiles)

const loader = new Loader([txPlayer0, txPlayer1, txPlayer2, txPlayer3, txWallLeft, txForestTiles])

export {
  txPlayer0,
  txPlayer1,
  txPlayer2,
  txPlayer3,
  txWallLeft,
  txForestTiles,
  loader
}