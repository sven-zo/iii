class GameOver extends GameObj {

  private audio
  private score: TextRender

  constructor (g: Game) {
    super(g, 'block', 0, 0, 1404, 936, 'assets/gameOver.png')
    this.g.state = 'gameover'
    this.audio = new Audio('assets/gameover.wav')
    this.audio.play()
    this.score = new TextRender(this.g, 100, 100, "Score: " + ((this.g.level.getScore() - 0.5) * 10)  
  }

  delete () {
    console.log('remove')
    this.g.stage.removeChild(this.p.sprite)
    this.score.delete()
  }
}