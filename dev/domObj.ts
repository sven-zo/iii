 class domObj {

  obj: gameObj
  name: string
  div: HTMLImageElement

  constructor (name, obj) {
    this.name = name
    this.obj = obj

    this.div = document.createElement('img')
    this.div.className = 'iii-' + this.name
    this.div.width = this.obj.width
    this.div.height = this.obj.height
    this.div.src = this.obj.image

    document.body.appendChild(this.div)
  }

  tick() {
    this.div.style.transform = "translate("+this.obj.x+"px, "+this.obj.y+"px)"
  }
}