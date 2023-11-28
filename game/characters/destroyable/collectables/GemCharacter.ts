import type { ISpritesheetData, Spritesheet } from "pixi.js"
import BaseCollectableCharacter from "./BaseCollectableCharacter"
import { getGemSpritesheet } from "../../spitesheets/gem"

/**
 * One possible collectible.
 */
export default class GemCharacter extends BaseCollectableCharacter {
  public allowFloat: boolean = false
  private floatValue: number = 0

  protected getSpritesheet(): Spritesheet<ISpritesheetData> {
    return getGemSpritesheet()
  }

  protected getInitAnimationState(): Game.AnimationState {
    return "idle"
  }

  public tick(delta: number): void {
    super.tick(delta)

    // Do floating animation if allowed.
    if (!this.allowFloat) return
    this.animSprite.y += Math.cos(Math.PI * this.floatValue) * 0.25 * delta
    this.floatValue = (this.floatValue + 0.005) % 1
  }
}
