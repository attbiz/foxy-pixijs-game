import { Spritesheet, type ISpritesheetData, BaseTexture, SCALE_MODES } from "pixi.js"
import CollectPng from "$lib/assets/games/foxy/spritesheets/item-feedback.png"
import { buildCharacterAtlasData } from "./utils"

const { frames, animations } = buildCharacterAtlasData({
	name: "idle",
	length: 5,
	row: 0,
	offset: { x: 0, y: 0 },
	step: { x: 32, y: 0 },
	w: 32,
	h: 32
})

const atlasData: ISpritesheetData = {
	frames: {
		...frames
	},
	meta: { scale: "1" },
	animations: { ...animations }
}

let spritesheetCache: Spritesheet<ISpritesheetData> | null = null
export const getCollectSpritesheet = () => {
	if (!spritesheetCache) spritesheetCache = new Spritesheet(BaseTexture.from(CollectPng), atlasData)
	spritesheetCache.baseTexture.scaleMode = SCALE_MODES.NEAREST
	return spritesheetCache
}
