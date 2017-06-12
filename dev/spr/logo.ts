class Logo extends GameObj {

  anim: PIXI.extras.AnimatedSprite

  constructor (g: Game) {
    super(g, 'logo', 0, 100, 1280/4, 1280/4, 'assets/iiilogo.png')

    // Only create animation if not using DOM fallback
    if (! g.renderDom) {
      let frames = []
      for (var i = 0; i < 50; i++) {
        var val = i < 10 ? '0' + i : i
        frames.push(PIXI.Texture.fromFrame('SpriteAnimation_000' + val + '.png'))
      }
      this.anim = new PIXI.extras.AnimatedSprite(frames)
      this.anim.width = 1280 / 4
      this.anim.height = 1280 / 4
      this.anim.x = 1280 / 2
      this.anim.y = 1280/4 - 60
      this.anim.anchor.set(0.5)
      this.anim.animationSpeed = 0.5
      this.anim.play()
      this.g.stage.addChild(this.anim)
    }
  }

  hide () {
    this.anim.visible = false
  }

  tick () {
    this.animate()
    super.tick()
  }

  private animate (): void {
    this.width = 1280 / 4
    this.height = 1280 / 4
    this.x = 1280 / 2 - this.width * 0.5
  }
}