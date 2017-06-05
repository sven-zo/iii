class Block extends GameObj {

  leftSpeed: number
  rightSpeed: number

  constructor (g: Game, x: number, y: number, width: number, height: number, leftSpeed: number) {
    super(g, 'block', x, y, width, height, 'assets/block.png')
  }

  tick () {
    if (this.x < 0 - this.width) {
      super.delete()
    }
    //let targetX = this.x - this.leftSpeed + this.rightSpeed
    super.tick()
  }

}