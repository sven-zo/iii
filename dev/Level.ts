class Level extends GameObj {
  
  private levelObjects: Array<GameObj> = []
  private num: number
  public g: Game
  private levelConstructed: Boolean = false
  private speed: number

  constructor (g: Game, num: number) {
    super(g, 'level')
    this.g = g
    this.num = num

    this.g.state = 'level'
    this.constructLevel()
  }

  tick () {
    //console.log('tick')
    //move items in level
    if (this.levelConstructed) {
      //this.levelObjects.forEach(element => {
      //  element.x = element.x - this.speed
      //  if (element.x < 0 - element.width) {
      //    
      //  }
      //})
      //console.log(this.levelObjects)
      for (let i: number = 0; i < this.levelObjects.length; i++) {
        let element = this.levelObjects[i]
        element.x = element.x - this.speed
        if (element.x < 0 - element.width + 1) {
          this.levelObjects.splice(i--, 1)
        }
      }
    }
  }

  addObj(item: GameObj) {
    this.levelObjects.push(item)
    this.g.addObject(item)
  }

  private constructLevel() {
    if (this.num === 1) {
      this.speed = 20
      this.addObj(new Block(this.g, 100, 620, 1080, 100, this.speed))
      this.addObj(new Block(this.g, 1180, 610, 1080, 110, this.speed))
      // om de game af te krijgen zou ik voor nu gewoon een score attack game maken waarbij je (gewoon optijd van poortjes moet wisselen) en springen
      this.levelConstructed = true
    } else if (this.num === -1) { //LEVEL GEN MODE ACTIVATE
      this.speed = 10

      let lengthOfLevel = 100
      let randomY = 620
      let blockLength = 350

      //first block is alway this one
      //this.addObj(
      //    new Block(
      //      this.g,
      //      1 * blockLength + 100,
      //      randomY,
      //      blockLength,
      //      100,
      //      this.speed
      //    )
      //)

      for(let i: number = 1; i < lengthOfLevel; i++) {
        // genereer het volgende block of 50 hoger, of 50 lager
        if (Math.round(Math.random())) {
          if (randomY <= 20) {
            randomY += 50
          } else {
            randomY -= 50
          }
        } else {
          if (randomY >= 670) {
            randomY -= 50
          } else {
            randomY += 50
          }
        }

        //let blockHeight = 720 - randomY
        let blockHeight = 6

        this.addObj(
          new Block(
            this.g,
            i * blockLength + 100,
            randomY,
            blockLength,
            blockHeight,
            this.speed
          )
        )
      }

      //add finish

      //add player
      this.g.player = new Player(this.g)
      this.g.addObject(this.g.player)

      this.levelConstructed = true
    }
  }
}