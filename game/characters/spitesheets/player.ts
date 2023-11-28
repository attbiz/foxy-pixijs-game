import { Spritesheet, type ISpritesheetData, BaseTexture } from "pixi.js"
import PlayerPng from "$lib/assets/games/foxy/spritesheets/player.png"
import { buildCharacterAtlasData } from "./utils"

const { frames: idleFrames, animations: idleAnimations } = buildCharacterAtlasData({
  name: "idle",
  length: 4,
  row: 0,
  offset: { x: 4, y: 10 },
  step: { x: 33, y: 32 },
  w: 22,
  h: 22
})

const { frames: runFrames, animations: runAnimations } = buildCharacterAtlasData({
  name: "running",
  length: 6,
  row: 1,
  offset: { x: 4, y: 10 },
  step: { x: 33, y: 32 },
  w: 22,
  h: 22
})

const { frames: ascendingFrames, animations: ascendingAnimation } = buildCharacterAtlasData({
  name: "ascending",
  length: 1,
  row: 5,
  offset: { x: 4, y: 10 },
  step: { x: 33, y: 32 },
  w: 22,
  h: 22
})

const { frames: fallingFrames, animations: fallingAnimation } = buildCharacterAtlasData({
  name: "falling",
  skip: 1,
  length: 1,
  row: 5,
  offset: { x: 4, y: 10 },
  step: { x: 33, y: 32 },
  w: 22,
  h: 22
})

const { frames: stunnedFrames, animations: stunnedAnimation } = buildCharacterAtlasData({
  name: "stunned",
  length: 2,
  row: 4,
  offset: { x: 4, y: 10 },
  step: { x: 33, y: 32 },
  w: 22,
  h: 22
})

const atlasData: ISpritesheetData = {
  frames: {
    ...idleFrames,
    ...runFrames,
    ...ascendingFrames,
    ...fallingFrames,
    ...stunnedFrames
  },
  meta: {
    scale: "1"
  },
  animations: {
    ...idleAnimations,
    ...runAnimations,
    ...ascendingAnimation,
    ...fallingAnimation,
    ...stunnedAnimation
  }
}

let spritesheetCache: Spritesheet<ISpritesheetData> | null = null
export const getPlayerSpritesheet = () => {
  if (!spritesheetCache) spritesheetCache = new Spritesheet(BaseTexture.from(PlayerPng), atlasData)
  return spritesheetCache
}
