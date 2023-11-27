import type { ISpritesheetData, Spritesheet } from "pixi.js"
import { getOposumSpritesheet } from "../../spitesheets/oposum"
import BaseEnemyCharacter from "./BaseEnemyCharacter"

/**
 * One possible enemy: The Oposum.
 */
export default class OposumCharacter extends BaseEnemyCharacter {
	protected getSpritesheet(): Spritesheet<ISpritesheetData> {
		return getOposumSpritesheet()
	}

	protected getInitAnimationState(): Game.AnimationState {
		return "running"
	}
}
