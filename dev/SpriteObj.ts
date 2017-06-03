class SpriteObj {

  private sprite: PIXI.Sprite
  private obj: GameObj

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

  tick() {
    this.sprite.width = this.obj.width
    this.sprite.height = this.obj.height
    this.sprite.x = this.obj.x
    this.sprite.y = this.obj.y
  }
}