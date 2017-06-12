class TextRender {
  private g: Game
  private dom: HTMLElement
  private sprite: PIXI.Text

  constructor (g: Game, x: number, y: number, text: string) {
    this.g = g
    if (this.g.renderDom) {
      //make dom text
    } else {
      //make pixi text

      let style = new PIXI.TextStyle({
        align: 'left',
        fontFamily: 'Roboto',
        fontSize: 26
      })

      this.sprite = new PIXI.Text(text, style)
      this.g.stage.addChild(this.sprite)
    }
  }

  public delete () {
    this.g.stage.removeChild(this.sprite)
  }
}