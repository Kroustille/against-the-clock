import { Player } from './Player'

export class BobGanoush extends Player {
  protected baseDamage = 10
  protected lifeInSeconds = 120

  public constructor() {
    super()
  }
}
