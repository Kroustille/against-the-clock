import { Loader, Texture } from 'excalibur'
import knightIdle0 from '../assets/images/frames/knight_m_idle_anim_f0.png'
import knightIdle1 from '../assets/images/frames/knight_m_idle_anim_f1.png'
import knightIdle2 from '../assets/images/frames/knight_m_idle_anim_f2.png'
import knightIdle3 from '../assets/images/frames/knight_m_idle_anim_f3.png'

import knightRunning0 from '../assets/images/frames/knight_m_run_anim_f0.png'
import knightRunning1 from '../assets/images/frames/knight_m_run_anim_f1.png'
import knightRunning2 from '../assets/images/frames/knight_m_run_anim_f2.png'
import knightRunning3 from '../assets/images/frames/knight_m_run_anim_f3.png'

import forestTiles from '../assets/images/forest_tiles.png'

import wallLeft from '../assets/images/frames/wall_left.png'

const txIdlePlayer0 = new Texture(knightIdle0)
const txIdlePlayer1 = new Texture(knightIdle1)
const txIdlePlayer2 = new Texture(knightIdle2)
const txIdlePlayer3 = new Texture(knightIdle3)

const txRunningPlayer0 = new Texture(knightRunning0)
const txRunningPlayer1 = new Texture(knightRunning1)
const txRunningPlayer2 = new Texture(knightRunning2)
const txRunningPlayer3 = new Texture(knightRunning3)

const txWallLeft = new Texture(wallLeft)
const txForestTiles = new Texture(forestTiles)

const loader = new Loader([
  txIdlePlayer0,
  txIdlePlayer1,
  txIdlePlayer2,
  txIdlePlayer3,
  txRunningPlayer0,
  txRunningPlayer1,
  txRunningPlayer2,
  txRunningPlayer3,
  txWallLeft,
  txForestTiles,
])

export {
  txIdlePlayer0,
  txIdlePlayer1,
  txIdlePlayer2,
  txIdlePlayer3,
  txRunningPlayer0,
  txRunningPlayer1,
  txRunningPlayer2,
  txRunningPlayer3,
  txWallLeft,
  txForestTiles,
  loader
}