class Logo extends GameObj {

  constructor (g: Game) {
    super(g, 'logo', 0, 100, 1280/4, 1280/4, 'assets/iiilogo.png')

    let frames = []
    for (var i = 0; i < 50; i++) {
      var val = i < 10 ? '0' + i : i
      frames.push(PIXI.Texture.fromFrame('SpriteAnimation_000' + val + '.png'))

      var anim = new PIXI.extras.AnimatedSprite(frames)

      anim.width = 1280 / 4
      anim.height = 1280 / 4
      anim.x = 1280 / 2
      anim.y = 1280/4 - 60
      anim.anchor.set(0.5);
      anim.animationSpeed = 0.5;
      anim.play();

      this.g.stage.addChild(anim);
    }
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