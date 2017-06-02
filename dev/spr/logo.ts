class Logo extends GameObj {

  constructor (g: Game, x: number, y: number) {
    super(g, 'logo', x, y, window.innerHeight / 4, window.innerHeight / 4, 'assets/iiilogo.png')
  }

  tick () {
    this.correctPosition()
    super.tick()
  }

  private correctPosition (): void {
    this.width = window.innerHeight / 4
    this.height = window.innerHeight / 4
  }
}