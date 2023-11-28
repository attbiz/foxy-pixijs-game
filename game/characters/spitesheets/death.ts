import { Spritesheet, type ISpritesheetData, BaseTexture, SCALE_MODES } from "pixi.js"
import DeathPng from "$lib/assets/games/foxy/spritesheets/enemy-deadth.png"
import { buildCharacterAtlasData } from "./utils"

const { frames, animations } = buildCharacterAtlasData({
  name: "idle",
  length: 6,
  row: 0,
  offset: { x: 0, y: 1 },
  step: { x: 40, y: 0 },
  w: 40,
  h: 40
})

const atlasData: ISpritesheetData = {
  frames: {
    ...frames
  },
  meta: { scale: "1" },
  animations: { ...animations }
}

let spritesheetCache: Spritesheet<ISpritesheetData> | null = null
export const getDeathSpritesheet = () => {
  if (!spritesheetCache) spritesheetCache = new Spritesheet(BaseTexture.from(DeathPng), atlasData)
  spritesheetCache.baseTexture.scaleMode = SCALE_MODES.NEAREST
  return spritesheetCache
}
