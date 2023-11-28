import { Application } from "pixi.js"

import { GAME_HEIGHT, GAME_WIDTH } from "./const"
import { parseAllSpritesheets } from "./characters/spitesheets"
import { createMap } from "./map"
import PlayerCharacter from "./characters/PlayerCharacter"
import OposumCharacter from "./characters/destroyable/enemies/OposumCharacter"
import type BaseEnemyCharacter from "./characters/destroyable/enemies/BaseEnemyCharacter"
import GemCharacter from "./characters/destroyable/collectables/GemCharacter"
import HUD from "./hud"

function random(min: number, max: number): number {
	return Math.random() * (max - min) + min
}

function randomInt(min: number, max: number): number {
	return Math.floor(random(min, max))
}

const SPAWN_COORDINATED = [220, 500, 700]

/**
 * Initiates the game.
 * @returns app view and player
 */
export async function init() {
	let finished = false
	const app = new Application({ width: GAME_WIDTH, height: GAME_HEIGHT })
	await parseAllSpritesheets()

	await createMap(app)
	const player = new PlayerCharacter(app)
	player.animSprite.x = 45

	const hud = new HUD(app)

	let tickCounter = 0
	let gem: GemCharacter | null = null
	let enemies: BaseEnemyCharacter[] = []

	app.ticker.add((delta) => {
		if (finished) return

		// Call ticks for characters
		player.tick(delta)
		enemies.forEach((enemy) => enemy.tick(delta))
		if (gem && !gem.isDestroyed()) gem.tick(delta)

		// Spawn enemies
		if (++tickCounter % (60 * 3) === 0 && enemies.length < 4) {
			const oposum = new OposumCharacter(app)

			oposum.animSprite.x = SPAWN_COORDINATED[randomInt(0, SPAWN_COORDINATED.length)]
			oposum.run(-1, 1, -1)

			enemies.push(oposum)
		}

		// Check if an enemy has reached the door
		finished = enemies
			.filter((enemy) => !enemy.animSprite.destroyed)
			.some((enemy) => enemy.animSprite.x < 50)

		// Check collision with enemies
		// Destroy them if the player is falling
		// Otherwise player gets stunned
		enemies.forEach((enemy) => {
			if (!player.collidedWith(enemy)) return

			if (player.isFalling() && !player.isStunned()) player.jump()
			else {
				player.stun()
				return
			}

			enemy.destroy()
		})

		// Filter out destroyed enemies and let them be garbage collected.
		enemies = enemies.filter((enemy) => !enemy.isDestroyed())

		// Destroy the gem if player collided with it.
		if (gem && player.collidedWith(gem)) {
			gem.destroy()
			gem = null
			hud.increaseScore()
		}

		// Create new game if there is none.
		if (!gem) {
			gem = new GemCharacter(app)
			gem.animSprite.x = random(50, GAME_WIDTH - 50) // Sometimes spawn too close and gets collected right away. More points?
			gem.animSprite.y -= 25
			gem.allowFloat = true
		}
	})

	return { appView: app.view, player }
}
