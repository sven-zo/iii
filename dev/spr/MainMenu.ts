class MainMenu extends GameObj {

  g: Game
  logo: Logo
  pressStart: PressStart

  constructor (g) {
    super(g, 'main-menu')
    this.g = g

    this.g.state = 'mainmenu'
    g.addObject( this.logo = new Logo(g) )
    g.addObject( this.pressStart = new PressStart(g) )
  }

  public startLevel (): void {
    this.g.runLevel(-1)
  }

  public delete () {
    this.logo.delete()
    this.pressStart.delete()
  }
}