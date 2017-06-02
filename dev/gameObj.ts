class GameObj {

  private _g: Game
  private _x: number
  private _y: number
  private d: DomObj
  private p: SpriteObj
  private name: string
  private _width: number
  private _height: number
  private _image: string

  get x () {
    return this._x
  }
  set x (x: number) {
    this._x = x
  }
  get y () {
    return this._y
  }
  set y (y: number) {
    this._y = y
  }
  get width () {
    return this._width
  }
  set width (width: number) {
    this._width = width
  }
  get height () {
    return this._height
  }
  set height (height: number) {
    this._height = height
  }
  get image() {
    return this._image
  }
  get g(): Game {
    return this._g
  }

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
    this._g = g
    this.name = name
    this._x = x
    this._y = y
    this._width = width
    this._height = height
    this._image = image

    if (this._g.renderDom) {
      this.createNode()
    } else {
      this.createSprite()
    }
  }

  private createNode(): void {
    this.d = new DomObj(this.name, this)
  }

  private createSprite(): void {
    this.p = new SpriteObj(this)
  }

  tick() {
    if (this._g.renderDom) {
      this.d.tick()
    } else {
      this.p.tick()
    }
  }
}