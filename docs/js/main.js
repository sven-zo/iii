class DomObj {
    constructor(name, obj) {
        this.name = name;
        this.obj = obj;
        this.div = document.createElement('img');
        this.div.className = 'iii-' + this.name;
        this.div.width = this.obj.width;
        this.div.height = this.obj.height;
        this.div.src = this.obj.image;
        document.body.appendChild(this.div);
    }
    tick() {
        this.div.width = this.obj.width;
        this.div.height = this.obj.height;
        this.div.style.transform = "translate(" + this.obj.x + "px, " + this.obj.y + "px)";
    }
}
class Game {
    constructor(renderDom = true) {
        this._renderDom = true;
        this.allObjects = [];
        this._loader = PIXI.loader;
        this._resources = PIXI.loader.resources;
        this._renderDom = renderDom;
        if (!renderDom) {
            this.setupPIXI();
        }
        else {
            this.addObject(new Logo(this, window.innerWidth / 2 - window.innerHeight / 8, window.innerHeight / 2 - window.innerHeight / 4));
            requestAnimationFrame(this.gameLoop.bind(this));
        }
    }
    get stage() {
        return this._stage;
    }
    get resources() {
        return this._resources;
    }
    get renderDom() {
        return this._renderDom;
    }
    get loader() {
        return this._loader;
    }
    gameLoop() {
        this.allObjects.forEach(element => {
            element.tick();
        });
        if (!this._renderDom) {
            this._renderer.render(this._stage);
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    addObject(obj) {
        this.allObjects.push(obj);
    }
    setupPIXI() {
        let options = {
            'width': window.innerWidth,
            'height': window.innerHeight,
            'transparent': false,
            'autoResize': true,
            'antialias': true,
            'resolution': 2,
            'backgroundColor': 0xffffff
        };
        this._renderer = PIXI.autoDetectRenderer(options);
        document.body.appendChild(this._renderer.view);
        this._stage = new PIXI.Container();
        this._renderer.render(this._stage);
        this._loader
            .add("assets/iiilogo.png")
            .load(this.setupPIXIAssetsLoaded.bind(this));
    }
    setupPIXIAssetsLoaded() {
        this.addObject(new Logo(this, window.innerWidth / 2 - window.innerHeight / 8, window.innerHeight / 2 - window.innerHeight / 4));
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}
window.addEventListener('load', function (e) {
    new Game(false);
});
class GameObj {
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
    }
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
    }
    get image() {
        return this._image;
    }
    get g() {
        return this._g;
    }
    constructor(g, name, x, y, width, height, image) {
        this._g = g;
        this.name = name;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._image = image;
        if (this._g.renderDom) {
            this.createNode();
        }
        else {
            this.createSprite();
        }
    }
    createNode() {
        this.d = new DomObj(this.name, this);
    }
    createSprite() {
        this.p = new SpriteObj(this);
    }
    tick() {
        if (this._g.renderDom) {
            this.d.tick();
        }
        else {
            this.p.tick();
        }
    }
}
class SpriteObj {
    constructor(obj) {
        this.obj = obj;
        this.sprite = new PIXI.Sprite(obj.g.resources[`${this.obj.image}`].texture);
        this.sprite.x = this.obj.x;
        this.sprite.y = this.obj.y;
        this.sprite.width = this.obj.width;
        this.sprite.height = this.obj.height;
        obj.g.stage.addChild(this.sprite);
    }
    tick() {
        this.sprite.width = this.obj.width;
        this.sprite.height = this.obj.height;
    }
}
class Logo extends GameObj {
    constructor(g, x, y) {
        super(g, 'logo', x, y, window.innerHeight / 4, window.innerHeight / 4, 'assets/iiilogo.png');
    }
    tick() {
        this.correctPosition();
        super.tick();
    }
    correctPosition() {
        this.width = window.innerHeight / 4;
        this.height = window.innerHeight / 4;
    }
}
//# sourceMappingURL=main.js.map