class DeathBlock extends GameObj {
  constructor (g: Game, x: number, y: number, width: number, height: number, leftSpeed: number) {
    super(g, 'death-block', x, y, width, height, 'assets/block.png')
  }

  tick () {
    if (this.x < 0 - this.width) {
      super.delete()
    }
    super.tick()
  }
}