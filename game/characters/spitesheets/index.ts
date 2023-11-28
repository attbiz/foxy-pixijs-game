// This folder contains all the sprites to store and avoid re-creating them.

import { getPlayerSpritesheet } from "./player"
import { getOposumSpritesheet } from "./oposum"
import { getDeathSpritesheet } from "./death"
import { getCollectSpritesheet } from "./collect"
import { getGemSpritesheet } from "./gem"

/**
 * Spritesheet parser helper for all of them.
 */
export async function parseAllSpritesheets() {
  await Promise.all([
    getPlayerSpritesheet().parse(),
    getOposumSpritesheet().parse(),
    getGemSpritesheet().parse(),
    getDeathSpritesheet().parse(),
    getCollectSpritesheet().parse()
  ])
}
