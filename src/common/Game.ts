import { DisplayMode, Engine } from 'excalibur'

export class Game extends Engine {
  constructor() {
    super({ displayMode: DisplayMode.FullScreen })
  }
}