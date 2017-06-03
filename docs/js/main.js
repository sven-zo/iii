class DomObj {
    constructor(name, obj) {
        this.name = name;
        this.obj = obj;
        this.div = document.createElement('img');
        this.div.className = 'iii-' + this.name;
        this.div.width = this.obj.width;
        this.div.height = this.obj.height;
        this.div.src = this.obj.image;
        document.getElementsByTagName('domrender')[0].appendChild(this.div);
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
            console.log('[Game] Starting game in WebGL/Canvas mode');
            this.setupPIXI();
        }
        else {
            console.log('[Game] Starting game in DOM mode');
            let domrender = document.createElement('domrender');
            domrender.style.display = 'block';
            domrender.style.position = 'absolute';
            domrender.style.backgroundColor = 'white';
            document.body.appendChild(domrender);
            this.addObject(new Logo(this));
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
            'width': 1280,
            'height': 720,
            'transparent': false,
            'autoResize': true,
            'antialias': true,
            'resolution': 2,
            'backgroundColor': 0xffffff
        };
        this._renderer = PIXI.autoDetectRenderer(options);
        if (this._renderer instanceof PIXI.WebGLRenderer) {
            console.log('[Game] WebGL supported! Started in WebGL mode.');
        }
        else {
            console.log('[Game] Started in Canvas mode.');
        }
        document.body.appendChild(this._renderer.view);
        this._stage = new PIXI.Container();
        this._renderer.render(this._stage);
        this._loader
            .add([
            'assets/iiilogo.png',
            'assets/press_start.png'
        ])
            .load(this.setupPIXIAssetsLoaded.bind(this));
    }
    setupPIXIAssetsLoaded() {
        this.addObject(new Logo(this));
        this.addObject(new PressStart(this));
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}
var autoStart = true;
var useDOM = true;
var button = document.createElement('button');
button.innerHTML = 'Wait...';
var windowSizeMessage = document.createElement('p');
windowSizeMessage.innerHTML = 'Checking window size...';
var webGlMessage = document.createElement('p');
windowSizeMessage.innerHTML = 'Checking WebGL support...';
var canvasMessage = document.createElement('p');
canvasMessage.innerHTML = 'Checking Canvas support...';
var domMessage = document.createElement('p');
domMessage.innerHTML = 'No support for other renderers found, will use DOM fallback.';
window.addEventListener('load', function (e) {
    document.body.appendChild(windowSizeMessage);
    document.body.appendChild(webGlMessage);
    document.body.appendChild(canvasMessage);
    document.body.appendChild(domMessage);
    if (window.innerWidth < 1280 || window.innerHeight < 720) {
        windowSizeMessage.innerHTML = 'Your window size is too small to play the game.';
        autoStart = false;
    }
    else {
        windowSizeMessage.innerHTML = 'Your window size is perfect.';
    }
    let canvas = document.createElement('canvas');
    let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl && gl instanceof WebGLRenderingContext) {
        webGlMessage.innerHTML = 'Congratulations! Your browser supports WebGL.';
        useDOM = false;
    }
    else {
        webGlMessage.innerHTML = 'It seems like your browser does not support WebGl.';
        autoStart = false;
    }
    if (!!document.createElement("canvas").getContext) {
        canvasMessage.innerHTML = 'Yay! Your browser supports Canvas!';
        useDOM = false;
    }
    else {
        canvasMessage.innerHTML = 'It seems like your browser does not support Canvas.';
    }
    if (!useDOM) {
        domMessage.innerHTML = 'The fastest available renderer will be used.';
    }
    document.body.appendChild(button);
    if (autoStart) {
        startGame();
    }
    else {
        button.innerHTML = 'Start game! (You should fix these things first for an optimal experience!)';
        button.addEventListener('click', startGame);
    }
});
function startGame() {
    document.body.removeChild(button);
    document.body.removeChild(windowSizeMessage);
    document.body.removeChild(webGlMessage);
    document.body.removeChild(canvasMessage);
    document.body.removeChild(domMessage);
    new Game(useDOM);
}
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
        this.sprite.x = this.obj.x;
        this.sprite.y = this.obj.y;
    }
}
class Logo extends GameObj {
    constructor(g) {
        super(g, 'logo', 0, 100, 1280 / 4, 1280 / 4, 'assets/iiilogo.png');
    }
    tick() {
        this.correctPosition();
        super.tick();
    }
    correctPosition() {
        this.width = 1280 / 4;
        this.height = 1280 / 4;
        this.x = 1280 / 2 - this.width * 0.5;
    }
}
class MainMenu extends GameObj {
}
class PressStart extends GameObj {
    constructor(g) {
        super(g, 'PressStart', 12, 1180, 580, 78, 'assets/press_start.png');
    }
    tick() {
    }
}
//# sourceMappingURL=main.js.map