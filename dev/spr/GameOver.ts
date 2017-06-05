class GameOver extends GameObj {

  private audio

  constructor (g: Game) {
    super(g, 'block', 0, 0, 1404, 936, 'assets/gameOver.png')
    this.g.state = 'gameover'
    this.audio = new Audio('assets/gameover.wav')
    this.audio.play()
  }
}