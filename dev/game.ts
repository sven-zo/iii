/// <reference path="../vendor/pixi.js.d.ts"/>

class Game {

  private _renderDom: boolean = true
  private allObjects: Array<GameObj> = []
  private _renderer
  private _stage: PIXI.Container
  private _loader: PIXI.loaders.Loader = PIXI.loader
  private _resources: PIXI.loaders.ResourceDictionary = PIXI.loader.resources

  get stage(): PIXI.Container {
    return this._stage
  }

  get resources(): PIXI.loaders.ResourceDictionary {
    return this._resources
  }

  get renderDom(): boolean {
    return this._renderDom
  }

  get loader(): PIXI.loaders.Loader {
    return this._loader
  }

  constructor (renderDom: boolean = true) {
    this._renderDom = renderDom

    if (! renderDom) {
      this.setupPIXI()
    } else {
    this.addObject( new Logo(this, window.innerWidth / 2 - window.innerHeight / 8, window.innerHeight / 2 - window.innerHeight / 4) )
    requestAnimationFrame( this.gameLoop.bind(this) )
    }
  }

  private gameLoop(): void {
    this.allObjects.forEach(element => {
      element.tick()
    })
    if (! this._renderDom) {
      this._renderer.render(this._stage)
    }
    requestAnimationFrame( this.gameLoop.bind(this) )
  }

  public addObject(obj: GameObj) {
    this.allObjects.push(obj)
  }

  private setupPIXI() {
    let options: PIXI.RendererOptions = {
        'width': window.innerWidth,
        'height': window.innerHeight,
        'transparent': false,
        'autoResize': true,
        'antialias': true,
        'resolution': 2,
        'backgroundColor': 0xffffff
      }
      this._renderer = PIXI.autoDetectRenderer(options)
      document.body.appendChild(this._renderer.view)
      this._stage = new PIXI.Container()
      this._renderer.render(this._stage)

      this._loader
      .add("assets/iiilogo.png")
      .load(this.setupPIXIAssetsLoaded.bind(this))
  }
  private setupPIXIAssetsLoaded() {
    this.addObject( new Logo(this, window.innerWidth / 2 - window.innerHeight / 8, window.innerHeight / 2 - window.innerHeight / 4) )
    requestAnimationFrame( this.gameLoop.bind(this) )
  }
}

window.addEventListener('load', function (e) {
  new Game(false) //false voor webgl/canvas - true voor DOM
})