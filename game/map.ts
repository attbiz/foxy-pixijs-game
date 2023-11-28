import {
  type Application,
  Assets,
  Sprite,
  Spritesheet,
  Texture,
  SCALE_MODES,
  BaseTexture
} from "pixi.js"

import SkyTexture from "$lib/assets/games/foxy/environment/Background/back.png"
import FarTexture from "$lib/assets/games/foxy/environment/Background/middle.png"
import TilesTexture from "$lib/assets/games/foxy/environment/tileset.png"
import PropsTexture from "$lib/assets/games/foxy/environment/Background/props.png"

import { GAME_HEIGHT, GAME_WIDTH, GROUND_LEVEL, SCALE_RATIO } from "./const"

/**
 * Required for enemies to be able to hide behind the bush.
 */
export let beforeBushIdx = 0

/**
 * Add sky first to the stage.
 * @param app
 */
function addSky(app: Application) {
  const texture = Texture.from(SkyTexture)
  texture.baseTexture.scaleMode = SCALE_MODES.NEAREST

  const sky = Sprite.from(texture)
  sky.scale.set(1.7)

  app.stage.addChild(sky)
}

async function addFarBackground(app: Application) {
  const texture = (await Assets.load(FarTexture)) as Texture
  texture.baseTexture.scaleMode = SCALE_MODES.NEAREST

  for (let i = 0; i < 3; i++) {
    const far = Sprite.from(texture)
    far.anchor.set(0.5, 0)
    far.scale.set(SCALE_RATIO)

    // Mirror every odd far background
    if (i % 2 === 0) far.scale.x *= -1

    far.x = 100 + (far.getBounds().right - far.getBounds().left) * i
    far.y = GAME_HEIGHT / 3

    app.stage.addChild(far)
  }
}

async function addTiles(app: Application) {
  const spritesheet = new Spritesheet(
    BaseTexture.from(TilesTexture, { scaleMode: SCALE_MODES.NEAREST }),
    {
      frames: {
        grass0: { frame: { x: 16, y: 16, w: 16, h: 16 } },
        grass1: { frame: { x: 16 * 3, y: 16, w: 16, h: 16 } },
        grass2: { frame: { x: 16 * 5, y: 16, w: 16, h: 16 } },
        dirt: { frame: { x: 48, y: 48, w: 16, h: 16 } }
      },
      meta: { scale: "1" }
    }
  )

  await spritesheet.parse()

  // let ptr = 0
  // const grassIds = Object.keys(
  // 	spritesheet.textures
  // ) as unknown as (keyof typeof spritesheet.textures)[]

  for (let i = 0; i < GAME_WIDTH / spritesheet.textures.grass1.width; i++) {
    const sprite = Sprite.from(spritesheet.textures.grass1)
    sprite.scale.set(SCALE_RATIO)
    sprite.y = GROUND_LEVEL
    sprite.x = sprite.width * i

    app.stage.addChild(sprite)
  }

  for (let row = 1; row < (GAME_HEIGHT - GROUND_LEVEL) / spritesheet.textures.dirt.height; row++)
    for (let i = 0; i < GAME_WIDTH / spritesheet.textures.dirt.width; i++) {
      const sprite = Sprite.from(spritesheet.textures.dirt)
      sprite.scale.set(SCALE_RATIO)
      sprite.y = GROUND_LEVEL + sprite.height * row
      sprite.x = sprite.width * i

      app.stage.addChild(sprite)
    }
}

async function addProps(app: Application) {
  const spritesheet = new Spritesheet(
    BaseTexture.from(PropsTexture, { scaleMode: SCALE_MODES.NEAREST }),
    {
      frames: {
        house: { frame: { x: 318, y: 20, w: 87, h: 108 } },
        tree: { frame: { x: 125, y: 35, w: 105, h: 93 } },
        bush: { frame: { x: 241, y: 100, w: 46, h: 28 } },
        sign: { frame: { x: 373, y: 156, w: 18, h: 20 } },
        bigBox: { frame: { x: 16, y: 176, w: 32, h: 32 } },
        smallBox: { frame: { x: 80, y: 192, w: 16, h: 16 } },
        skulls: { frame: { x: 176, y: 199, w: 16, h: 9 } }
      },
      meta: { scale: "1" }
    }
  )

  await spritesheet.parse()

  const house = Sprite.from(spritesheet.textures.house)
  house.scale.set(SCALE_RATIO)
  house.scale.x *= -1
  house.anchor.set(0.5, 1)

  house.x = 30
  house.y = GROUND_LEVEL

  app.stage.addChild(house)

  const tree = Sprite.from(spritesheet.textures.tree)
  tree.scale.set(2.5)
  tree.anchor.set(0.5, 1)

  tree.x = GAME_WIDTH / 2
  tree.y = GROUND_LEVEL

  app.stage.addChild(tree)

  const sign = Sprite.from(spritesheet.textures.sign)
  sign.scale.set(SCALE_RATIO)
  sign.anchor.set(0.5, 1)

  sign.x = GAME_WIDTH - 40
  sign.y = GROUND_LEVEL

  app.stage.addChild(sign)

  const skulls = Sprite.from(spritesheet.textures.skulls)
  skulls.scale.set(SCALE_RATIO)
  skulls.anchor.set(0.5, 1)

  skulls.x = GAME_WIDTH - 15
  skulls.y = GROUND_LEVEL

  app.stage.addChild(skulls)

  const bigBox = Sprite.from(spritesheet.textures.bigBox)
  bigBox.anchor.set(0.5, 1)

  bigBox.x = 110
  bigBox.y = GROUND_LEVEL

  app.stage.addChild(bigBox)

  const smallBox = Sprite.from(spritesheet.textures.smallBox)
  smallBox.anchor.set(0.5, 1)

  smallBox.x = 125
  smallBox.y = GROUND_LEVEL

  app.stage.addChild(smallBox)

  // Required for enemies to be able to hide behind the bush.
  beforeBushIdx = app.stage.children.length

  const bushX = [220, 500]
  for (let i = 0; i < bushX.length; i++) {
    const bush = Sprite.from(spritesheet.textures.bush)
    bush.scale.set(SCALE_RATIO)
    bush.anchor.set(0.5, 1)
    if (i % 2 === 0) bush.scale.x *= -1

    bush.x = bushX[i]
    bush.y = GROUND_LEVEL

    app.stage.addChild(bush)
  }
}

/**
 * Create the default map for the game.
 * @param app
 */
export async function createMap(app: Application) {
  addSky(app)
  await addFarBackground(app)
  await addTiles(app)
  await addProps(app)
}
