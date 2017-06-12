class GameObj {

  private _g: Game
  private _x: number
  private _y: number
  private d: DomObj
  private _p: SpriteObj
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
  set g(g: Game) {
    this._g = g
  }
  get p(): SpriteObj {
    return this._p
  }
  set p(p: SpriteObj) {
    this._p = p
  }
  get objName(): String {
    return this.name
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
  constructor (g: Game, name: string, x: number = 0, y: number = 0, width: number = 1, height: number = 1, image: string = 'assets/o.png') {
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

  public delete(): void {
    if (this._g.renderDom) {
      this.d.delete()
    } else {
      this.p.delete()
    }
  }

  tick() {
    if (this._g.renderDom) {
      this.d.tick()
    } else {
      this.p.tick()
    }
  }
}