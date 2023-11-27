import type { Spritesheet, ISpritesheetData, Application } from "pixi.js"
import { getDeathSpritesheet } from "../../spitesheets/death"
import BaseDestroyableCharacter from "../BaseDestroyableCharacter"
import { beforeBushIdx } from "../../../map"

/**
 * Base enemy class for further customizations.
 */
export default abstract class BaseEnemyCharacter extends BaseDestroyableCharacter {
	constructor(app: Application) {
		super(app, beforeBushIdx)
	}

	protected getDestroySpritesheet(): Spritesheet<ISpritesheetData> {
		return getDeathSpritesheet()
	}
}
