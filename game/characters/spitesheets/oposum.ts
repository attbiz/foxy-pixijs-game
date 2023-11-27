import { Spritesheet, type ISpritesheetData, BaseTexture } from "pixi.js"
import OposumPng from "$lib/assets/games/foxy/spritesheets/oposum.png"
import { buildCharacterAtlasData } from "./utils"

const { frames, animations } = buildCharacterAtlasData({
	name: "running",
	length: 6,
	row: 0,
	offset: { x: 1, y: 2 },
	step: { x: 36, y: 0 },
	w: 35,
	h: 26
})

const atlasData: ISpritesheetData = {
	frames: {
		...frames
	},
	meta: { scale: "1" },
	animations: { ...animations }
}

let spritesheetCache: Spritesheet<ISpritesheetData> | null = null
export const getOposumSpritesheet = () => {
	if (!spritesheetCache) spritesheetCache = new Spritesheet(BaseTexture.from(OposumPng), atlasData)
	return spritesheetCache
}
