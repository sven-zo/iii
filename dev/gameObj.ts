class gameObj {

  g: Game
  x: number
  y: number
  d: domObj
  name: string
  width: number
  height: number
  image: string

  /**
   * A game object.
   * @param g The game instance
   * @param x X coördinate
   * @param y Y coördinate
   * @param width Width of the image
   * @param height Height of the image
   * @param image The image
   */
  constructor (g: Game, name: string, x: number, y: number, width: number, height: number, image: string) {
    this.g = g
    this.name = name
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.image = image

    this.createNode()
  }

  private createNode(): void {
    this.d = new domObj(this.name, this)
  }

  tick() {
    this.d.tick()
  }
}