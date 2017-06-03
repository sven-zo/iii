/// <reference path="../docs/vendor/pixi.js.d.ts"/>

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
      console.log('[Game] Starting game in WebGL/Canvas mode')
      this.setupPIXI()
    } else {
      console.log('[Game] Starting game in DOM mode')
      let domrender = document.createElement('domrender')
      domrender.style.display = 'block'
      domrender.style.position = 'absolute'
      domrender.style.backgroundColor = 'white'
      document.body.appendChild(domrender)
      this.addObject( new Logo(this) )
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
        'width': 1280,
        'height': 720,
        'transparent': false,
        'autoResize': true,
        'antialias': true,
        'resolution': 2,
        'backgroundColor': 0xffffff
      }
      this._renderer = PIXI.autoDetectRenderer(options)
      if (this._renderer instanceof PIXI.WebGLRenderer) {
        console.log('[Game] WebGL supported! Started in WebGL mode.')
      } else {
        console.log('[Game] Started in Canvas mode.')
      }
      document.body.appendChild(this._renderer.view)
      this._stage = new PIXI.Container()
      this._renderer.render(this._stage)

      this._loader
      .add([
        'assets/iiilogo.png',
        'assets/press_start.png'
      ])
      .load(this.setupPIXIAssetsLoaded.bind(this))
  }
  private setupPIXIAssetsLoaded() {
    this.addObject( new Logo(this) )
    this.addObject( new PressStart(this) )
    requestAnimationFrame( this.gameLoop.bind(this) )
  }
}