import { Spritesheet, type ISpritesheetData, BaseTexture } from "pixi.js"
import GemPng from "$lib/assets/games/foxy/spritesheets/gem.png"
import { buildCharacterAtlasData } from "./utils"

const { frames, animations } = buildCharacterAtlasData({
	name: "idle",
	length: 5,
	row: 0,
	offset: { x: 0, y: 0 },
	step: { x: 15, y: 0 },
	w: 15,
	h: 13
})

const atlasData: ISpritesheetData = {
	frames: {
		...frames
	},
	meta: { scale: "1" },
	animations: { ...animations }
}

let spritesheetCache: Spritesheet<ISpritesheetData> | null = null
export const getGemSpritesheet = () => {
	if (!spritesheetCache) spritesheetCache = new Spritesheet(BaseTexture.from(GemPng), atlasData)
	return spritesheetCache
}
