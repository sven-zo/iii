class Logo extends GameObj {

  constructor (g: Game) {
    super(g, 'logo', 0, 100, 1280/4, 1280/4, 'assets/iiilogo.png')
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