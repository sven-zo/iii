class Player extends GameObj {

  private Yspeed: number = 0

  constructor (g: Game) {
    super (g, 'player', 50+50, 620-49-1000, 49/2, 91/2, 'assets/player.png')
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
      this.Yspeed = -9.9
    }
  }

  public tick () {
    this.y += this.Yspeed
    this.Yspeed += 0.5
    super.tick()
  }
}