class PressStart extends GameObj {

  constructor(g: Game) {
    super(g, 'PressStart', 380, 500, 580, 78, 'assets/press_start.png')
  }

  tick () {
    this.x = 380
    this.y = 500
    super.tick()
  }
}