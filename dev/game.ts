class Game {

  private _renderDom: boolean = true
  private allObjects: Array<gameObj> = []

  get renderDom(): boolean {
    return this._renderDom
  }

  constructor (renderDom: boolean = true) {
    this._renderDom = renderDom

    this.allObjects.push( new gameObj(this, 'logo', 200, 200, 80, 80, '/iii/assets/cat.png') )

    requestAnimationFrame( this.gameLoop.bind(this) )
  }

  private gameLoop(): void {
    this.allObjects.forEach(element => {
      element.tick()
    })
    requestAnimationFrame( this.gameLoop.bind(this) )
  }
}

window.addEventListener('load', function (e) {
  new Game()
})