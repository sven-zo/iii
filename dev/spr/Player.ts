class Player extends GameObj {

  private Yspeed: number = 0
  private gameOver: GameOver
  private audio

  constructor (g: Game) {
    super (g, 'player', 50+50+50, 620-49-1000-80-80+800, 49/2, 91/2, 'assets/player.png')
    this.audio = new Audio('assets/jump.wav');
  }

  public collide () {
    this.Yspeed = 0
  }

  private collideUpDown () {

  }

  private collideRight () {
    //game over
  }

  private jump () {
    if (this.Yspeed === 0) { 
      this.audio.play()
      this.Yspeed = -9.9
    }
  }

  public gameOverScreen () {
    if (! this.gameOver) {
      this.gameOver = new GameOver(this.g)
    }
  }

  public tick () {
    this.y += this.Yspeed
    this.Yspeed += 0.5
    super.tick()

    if (this.y > 720) {
      if (! this.gameOver) {
        this.gameOver = new GameOver(this.g)
      }
    }
  }
}