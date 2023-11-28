import { Text, type Application, TextStyle, type ITextStyle } from "pixi.js"
import { GAME_WIDTH } from "./const"

const KEY: string = "foxy.highScore"
const TEXT_SETTINGS: TextStyle | Partial<ITextStyle> = {
  fontFamily: "Cabin",
  fontWeight: "bold",
  fontSize: "16pt",
  fill: "0xffffff",
  align: "center"
}

/**
 * Display information about the game.
 */
export default class HUD {
  private score: number = 0
  private highScore: number = 0
  private scoreText: Text
  private highScoreText: Text

  constructor(app: Application) {
    this.highScore = parseInt(window.localStorage.getItem(KEY) || "0")

    this.scoreText = new Text("", TEXT_SETTINGS)
    this.scoreText.anchor.set(0.5)
    this.scoreText.x = GAME_WIDTH / 2
    this.scoreText.y = 300
    app.stage.addChild(this.scoreText)

    this.highScoreText = new Text("", TEXT_SETTINGS)
    this.highScoreText.anchor.set(0.5)
    this.highScoreText.x = GAME_WIDTH / 2
    this.highScoreText.y = 330
    app.stage.addChild(this.highScoreText)

    this.updateText()
  }

  private updateText() {
    this.scoreText.text = `Score: ${this.score}`
    this.highScoreText.text = `High score: ${this.highScore}`
  }

  public increaseScore(): void {
    if (++this.score <= this.highScore) return this.updateText()

    this.highScore = this.score
    window.localStorage.setItem(KEY, this.highScore.toString())
    this.updateText()
  }
}
