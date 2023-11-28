import {
  type Application,
  Spritesheet,
  AnimatedSprite,
  SCALE_MODES,
  Texture,
  Resource
} from "pixi.js"

import { G, GROUND_LEVEL, SCALE_RATIO } from "../const"

/**
 * Necessary functionality for all characters.
 */
export default abstract class BaseCharacter {
  private animations: Record<string, Texture<Resource>[]>
  private prevAnimationState: Game.AnimationState = "idle"

  protected app: Application

  protected vX: number = 0
  protected vY: number = 0
  protected stunned: boolean = false

  public animSprite: AnimatedSprite

  constructor(app: Application, spawnZ: number | null = null) {
    const spritesheet = this.getSpritesheet()
    spritesheet.baseTexture.scaleMode = SCALE_MODES.NEAREST

    this.animations = spritesheet.animations

    // Default animation settings
    this.animSprite = new AnimatedSprite(this.animations[this.getInitAnimationState()])
    this.animSprite.anchor.set(0.5, 1)
    this.animSprite.scale.set(SCALE_RATIO)
    this.animSprite.y = GROUND_LEVEL

    this.animSprite.animationSpeed = 0.1667
    this.animSprite.play()

    // SpawnZ is required for enemies to be able to hide behind the bush.
    // Check map.ts for further details.
    app.stage.addChildAt(this.animSprite, spawnZ ? spawnZ : app.stage.children.length)
    this.app = app
  }

  /**
   * Determine the animation state based on class properties.
   * @returns animation state
   */
  private getAnimationState(): Game.AnimationState {
    if (this.stunned) return "stunned"
    if (this.vY < 0) return "ascending"
    if (this.vY > 0) return "falling"
    if (this.vX !== 0) return "running"

    return "idle"
  }

  /**
   * Spritesheet for every character.
   */
  protected getSpritesheet(): Spritesheet {
    throw new Error("Must be implemented")
  }

  /**
   * Set the initial animation state for a character.
   * @returns inital state
   */
  protected getInitAnimationState(): Game.AnimationState {
    return "idle"
  }

  /**
   * Update character everytime when the app ticks.
   * @param delta tick performance
   */
  public tick(delta: number) {
    if (this.animSprite.destroyed) return

    this.animSprite.x += this.vX * delta
    this.animSprite.y += this.vY * delta

    if (this.vY !== 0) {
      this.vY -= G * delta

      // vY can't be 0 during fall
      if (this.vY === 0) this.vY = -1e-8
    }

    if (this.animSprite.y > GROUND_LEVEL) {
      this.animSprite.y = GROUND_LEVEL
      this.vY = 0
      if (this.stunned) this.vX = 0
      this.stunned = false
    }

    const animationState = this.getAnimationState()
    if (animationState !== this.prevAnimationState) {
      this.animSprite.textures = this.animations[animationState]
      this.animSprite.play()
      this.prevAnimationState = animationState
    }
  }

  /**
   * Make a movement.
   * @param direction left or right (-1, 1)
   * @param speed number
   * @param baseDirection sprites have it differently
   */
  public run(direction: number, speed: number = 4, baseDirection: number = 1) {
    if (direction === Math.sign(this.vX)) return

    this.vX = speed * direction
    this.animSprite.scale.x *= Math.sign(this.animSprite.scale.x) * direction * baseDirection
  }

  /**
   * Determine falling for attack move.
   * @returns boolean
   */
  public isFalling(): boolean {
    return this.vY > 0
  }

  /**
   * Get stunned value safely.
   * @returns boolean
   */
  public isStunned(): boolean {
    return this.stunned
  }

  /**
   * Used to determine collision with an other character.
   * @param character other character
   * @returns is collided
   */
  public collidedWith(character: BaseCharacter): boolean {
    if (character.animSprite.destroyed) return false

    const collisionOffest = 6
    const thisBounds = this.animSprite.getBounds()
    const otherBounds = character.animSprite.getBounds()

    const thisLeft = thisBounds.x
    const thisRight = thisBounds.x + thisBounds.width
    const thisTop = thisBounds.y
    const thisBottom = thisBounds.y + thisBounds.height

    const otherLeft = otherBounds.x
    const otherRight = otherBounds.x + otherBounds.width
    const otherTop = otherBounds.y
    const otherBottom = otherBounds.y + otherBounds.height

    return (
      thisLeft + collisionOffest < otherRight &&
      thisRight - collisionOffest > otherLeft &&
      thisTop + collisionOffest < otherBottom &&
      thisBottom - collisionOffest > otherTop
    )
  }
}
