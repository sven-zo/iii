/// <reference path="../docs/vendor/pixi.js.d.ts"/>

class Game {

  private _renderDom: boolean = true
  private allObjects: Array<GameObj> = []
  private _renderer
  private _stage: PIXI.Container
  private _loader: PIXI.loaders.Loader = PIXI.loader
  private _resources: PIXI.loaders.ResourceDictionary = PIXI.loader.resources
  private mainMenu: MainMenu
  private currentLevel: Level
  private _state: String
  private _player: Player

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

  set state(state: String) {
    this._state = state
  }

  get player() {
    return this._player
  }
  set player(player: Player) {
    this._player = player
  }

  constructor (renderDom: boolean = true) {
    this._renderDom = renderDom

    // Register keyboard event
    window.addEventListener('keydown', (event: KeyboardEvent) => this.keyboardEvent(event) )

    //something.addEventListener('click', (event: MouseEvent) => this.callback(event) )

    // Set up renderers
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
      this.addObject( this.mainMenu = new MainMenu(this) )
      requestAnimationFrame( this.gameLoop.bind(this) )
    }
  }

  private gameLoop(): void {
    //console.log(this.allObjects)
    // Tick elements
    this.allObjects.forEach(element => {
      element.tick()
    })
    // Collide elements
    //for(let i: number = 0; i < this.allObjects.length; i++) {
    //  for(let j: number = 0; j < this.allObjects.length; j++) {
    //    if(! i === j) {
    //      if( this.hasOverlap(this.allObjects[i], this.allObjects[j]) ) {
    //        this.allObjects[i].collide()
    //      }
    //    }
    //  }
    //}
    // Check voor player collision als de game in level mode is
    if (this._state === 'level') {
      for (let i: number = 0; i < this.allObjects.length; i++) {
        //if (! i === 103) {
        //  if (! this.player.y + this.player.height >= this.allObjects.y ) {
        //    console.log('collide')
        //  }
        //}
        if (this.allObjects[i].name === 'player') {
          //do nothing
        } else {
          //console.log(this.player.y + this.player.height)
          //console.log('HELP', this.player.y + this.player.height >= this.allObjects[i].y)
          if (this.hasOverlap(this.player, this.allObjects[i]) ) {
            this.player.collide()
            if (this.player.x + this.player.width > this.allObjects[i].x ) {
              console.log('boem')
            }
          }
          //console.log( '?', this.hasOverlap(this.player, this.allObjects[i]) )
        }
      }
    }
    // Render stage if using non-DOM mode
    if (! this._renderDom) {
      this._renderer.render(this._stage)
    }
    // Request animation frame
    requestAnimationFrame( this.gameLoop.bind(this) )
  }

  private keyboardEvent (event: KeyboardEvent): void {
    console.log('key pressed', event.key)
    console.log('state', this._state)
    switch (event.key) {
      case ' ':
        if (this._state === 'mainmenu') {
          this.mainMenu.startLevel()
        } else if (this._state === 'level') {
          this.player.jump()
        }
        break;

      case 'd':
        console.log(this.allObjects)
        break;

      case 'o':
        for (let i: number = 0; i < this.allObjects.length; i++) {
          console.log(! this.allObjects[i].name === 'player')
        }
        console.log('Is object 103 een speler?', this.allObjects[103].name === 'player')
        break;
    
      default:
        break;
    }
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
        'assets/press_start.png',
        'assets/o.png',
        'assets/block.png',
        'assets/player.png'
      ])
      .load(this.setupPIXIAssetsLoaded.bind(this))
  }
  private setupPIXIAssetsLoaded() {
    this.addObject( this.mainMenu = new MainMenu(this) )
    requestAnimationFrame( this.gameLoop.bind(this) )
  }

  public runLevel(level) {
    this.mainMenu.delete()
    //this.currentLevel = this.addObject( new Level(this, 1) )
    this.addObject( new Level(this, level) )
  }

  public hasOverlap(c1: GameObj, c2: GameObj): boolean {
    return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
  }
}