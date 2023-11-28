import { AnimatedSprite, Resource, Spritesheet, Texture, type ISpritesheetData } from "pixi.js"
import BaseCharacter from "../BaseCharacter"

/**
 * Contains the necessary functionality for destroyable characters, like enemies or collectables.
 */
export default abstract class BaseDestroyableCharacter extends BaseCharacter {
  private destroyed = false

  protected getDestroySpritesheet(): Spritesheet<ISpritesheetData> {
    throw new Error("Must be implemented")
  }

  /**
   * Makes an post-effect for destroyable characters
   * @returns AnimatedSprite of the destroy effect
   */
  private getDestroyAnimSprite(): AnimatedSprite {
    const spritesheet = this.getDestroySpritesheet()
    const animations: Record<string, Texture<Resource>[]> = spritesheet.animations

    const anim = new AnimatedSprite(animations.idle)
    anim.loop = false
    anim.animationSpeed = 0.1667
    anim.anchor.set(0.5, 1)
    anim.position.set(this.animSprite.x, this.animSprite.y)
    anim.play()

    anim.onComplete = () => {
      anim.destroy()
      this.destroyed = true
    }

    return anim
  }

  /**
   * Destroy character and apply post-effect.
   */
  public destroy(): void {
    const destroyAnim = this.getDestroyAnimSprite()
    this.animSprite.destroy()

    this.app.stage.addChild(destroyAnim)
  }

  /**
   * Safely get destroyed value.
   * @returns is destroyed?
   */
  public isDestroyed(): boolean {
    return this.destroyed
  }
}
