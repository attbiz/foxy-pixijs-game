import type { Spritesheet, ISpritesheetData } from "pixi.js"
import BaseDestroyableCharacter from "../BaseDestroyableCharacter"
import { getCollectSpritesheet } from "../../spitesheets/collect"

/**
 * Base collectable class for further customizations.
 */
export default abstract class BaseCollectableCharacter extends BaseDestroyableCharacter {
	protected getDestroySpritesheet(): Spritesheet<ISpritesheetData> {
		return getCollectSpritesheet()
	}
}
