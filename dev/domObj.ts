 class DomObj {

  private obj: GameObj
  private name: string
  private div: HTMLImageElement

  constructor (name, obj) {
    this.name = name
    this.obj = obj

    this.div = document.createElement('img')
    this.div.className = 'iii-' + this.name
    this.div.width = this.obj.width
    this.div.height = this.obj.height
    this.div.src = this.obj.image

    document.getElementsByTagName('domrender')[0].appendChild(this.div)
  }

  public tick () {
    this.div.width = this.obj.width
    this.div.height = this.obj.height
    this.div.style.transform = "translate("+this.obj.x+"px, "+this.obj.y+"px)"
  }

  public delete () {
    document.getElementsByTagName('domrender')[0].removeChild(this.div)//doesnotwork
    //document.getElementsByTagName('domrender')[0].removeChild(document.getElementsByTagName('iii-' + this.name)[0])
  }
}