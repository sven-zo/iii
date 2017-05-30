var Cat = (function () {
    function Cat(stage, renderer) {
        this.stage = stage;
        this.renderer = renderer;
        this.loadAssets();
    }
    Cat.prototype.loadAssets = function () {
        this.texture = PIXI.utils.TextureCache["iii/assets/cat.png"];
        this.sprite = new PIXI.Sprite(this.texture);
    };
    return Cat;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        console.log('[GAME] Created. Creating renderer.');
        this.render = new Renderer();
        PIXI.loader
            .add("/iii/assets/cat.png")
            .load(function () { return _this.createCat; });
    }
    Game.prototype.createCat = function () {
        var cat = new Cat(this.render.stage, this.render.renderer);
        this.render.stage.addChild(cat.sprite);
        this.render.renderer(this.render.stage);
    };
    return Game;
}());
window.addEventListener('load', function (e) {
    new Game();
});
var Renderer = (function () {
    function Renderer() {
        console.log('[RENDER] Created. Setting up stage.');
        this.setUpRender();
    }
    Renderer.prototype.setUpRender = function () {
        var type = 'WebGL';
        if (!PIXI.utils.isWebGLSupported()) {
            type = 'canvas';
        }
        PIXI.utils.sayHello(type);
        var options = {
            'width': window.innerWidth,
            'height': window.innerHeight,
            'transparent': false,
            'autoResize': true,
            'antialias': true,
            'resolution': 1
        };
        this._renderer = PIXI.autoDetectRenderer(options);
        document.body.appendChild(this._renderer.view);
        this._stage = new PIXI.Container();
        this._renderer.render(this.stage);
    };
    Object.defineProperty(Renderer.prototype, "stage", {
        get: function () {
            return this._stage;
        },
        set: function (stage) {
            this._stage = stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "renderer", {
        get: function () {
            return this._renderer;
        },
        set: function (renderer) {
            this._renderer = renderer;
        },
        enumerable: true,
        configurable: true
    });
    return Renderer;
}());
//# sourceMappingURL=main.js.map