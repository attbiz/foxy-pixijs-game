import type { ISpritesheetData, Spritesheet } from "pixi.js"
import { getPlayerSpritesheet } from "./spitesheets/player"
import BaseCharacter from "./BaseCharacter"
import { GAME_WIDTH } from "../const"

/**
 * Contains the functions of the player.
 */
export default class PlayerCharacter extends BaseCharacter {
  protected getSpritesheet(): Spritesheet<ISpritesheetData> {
    return getPlayerSpritesheet()
  }

  /**
   * Receive user input and set values accordingly.
   */
  public input(code: string) {
    if (this.stunned) return
    if (code === "ArrowLeft") this.run(-1)
    if (code === "ArrowRight") this.run(1)
    if (["ArrowUp", "Space"].includes(code) && this.vY === 0) this.jump()
  }

  /**
   * Make a jump.
   */
  public jump() {
    this.vY = -5
  }

  /**
   * Stop actions from stun or arrow key up event
   */
  public stop(code: string) {
    if (this.stunned || !["ArrowLeft", "ArrowRight"].includes(code)) return
    this.vX = 0
  }

  /**
   * Stun the player on damage.
   */
  public stun() {
    this.stunned = true
    this.jump()
    this.run(-1)
  }

  public tick(delta: number): void {
    super.tick(delta)

    // Keep the player in the map
    this.animSprite.x = Math.max(this.animSprite.width / 2, this.animSprite.x)
    this.animSprite.x = Math.min(GAME_WIDTH - this.animSprite.width / 2, this.animSprite.x)
  }
}
