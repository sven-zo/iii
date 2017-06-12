class MainMenu extends GameObj {

  private logo: Logo
  private pressStart: PressStart
  private text: TextRender

  constructor (g) {
    super(g, 'main-menu')
    this.g = g

    this.g.state = 'mainmenu'
    g.addObject( this.logo = new Logo(g) )
    g.addObject( this.pressStart = new PressStart(g) )

    this.text = new TextRender(this.g, 0, 0, ' v1.0.25 \n Made by @sven-zo')
  }

  public startLevel (): void {
    this.g.runLevel(-1)
  }

  public delete () {
    if(! this.g.renderDom) {
      this.logo.hide()
    }
    this.logo.delete()
    this.g.stage.removeChild(this.logo.anim)
    this.pressStart.delete()
    this.text.delete()
  }
}