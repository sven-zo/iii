class SpriteObj {

  private _sprite: PIXI.Sprite
  private obj: GameObj

  get sprite(): PIXI.Sprite {
    return this._sprite
  }
  set sprite(sprite: PIXI.Sprite) {
    this._sprite = sprite
  }

  constructor (obj: GameObj) {
    this.obj = obj
    this.sprite = new PIXI.Sprite(
      obj.g.resources[`${this.obj.image}`].texture
    )
    this.sprite.x = this.obj.x
    this.sprite.y = this.obj.y
    this.sprite.width = this.obj.width
    this.sprite.height = this.obj.height
    obj.g.stage.addChild(this.sprite)
  }

  public tick() {
    this.sprite.width = this.obj.width
    this.sprite.height = this.obj.height
    this.sprite.x = this.obj.x
    this.sprite.y = this.obj.y
  }

  public delete () {
    this.obj.g.stage.removeChild(this.sprite)
  }
}