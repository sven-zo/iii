class Logo extends GameObj {

  constructor (g: Game) {
    super(g, 'logo', window.innerWidth / 2, 100, window.innerHeight / 4, window.innerHeight / 4, 'assets/iiilogo.png')
  }

  tick () {
    this.correctPosition()
    super.tick()
  }

  private correctPosition (): void {
    this.width = 1280 / 4
    this.height = 1280 / 4
    this.x = 1280 / 2 - this.width * 0.5
  }
}