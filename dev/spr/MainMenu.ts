class MainMenu extends GameObj {

  g: Game
  logo: Logo
  pressStart: PressStart

  constructor (g) {
    super(g, 'main-menu')
    this.g = g

    g.addObject( this.logo = new Logo(g) )
    g.addObject( this.pressStart = new PressStart(g) )

    window.addEventListener('keydown', (event: KeyboardEvent) => this.startLevel(event) )
  }

  private startLevel (event): void {
    this.g.runLevel(1)
  }

  public delete () {
    this.logo.delete()
    this.pressStart.delete()
  }
}