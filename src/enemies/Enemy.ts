

export abstract class Enemy {
  protected abstract life: number

  public takeDamage(amount: number) {
    this.life -= amount
  }

  public isDead(): boolean {
    return this.life <= 0
  }
}