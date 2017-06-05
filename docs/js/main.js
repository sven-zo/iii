var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomObj = (function () {
    function DomObj(name, obj) {
        this.name = name;
        this.obj = obj;
        this.div = document.createElement('img');
        this.div.className = 'iii-' + this.name;
        this.div.width = this.obj.width;
        this.div.height = this.obj.height;
        this.div.src = this.obj.image;
        document.getElementsByTagName('domrender')[0].appendChild(this.div);
    }
    DomObj.prototype.tick = function () {
        this.div.width = this.obj.width;
        this.div.height = this.obj.height;
        this.div.style.transform = "translate(" + this.obj.x + "px, " + this.obj.y + "px)";
    };
    DomObj.prototype.delete = function () {
        document.getElementsByTagName('domrender')[0].removeChild(this.div);
    };
    return DomObj;
}());
var Game = (function () {
    function Game(renderDom) {
        if (renderDom === void 0) { renderDom = true; }
        var _this = this;
        this._renderDom = true;
        this.allObjects = [];
        this._loader = PIXI.loader;
        this._resources = PIXI.loader.resources;
        this._renderDom = renderDom;
        window.addEventListener('keydown', function (event) { return _this.keyboardEvent(event); });
        if (!renderDom) {
            console.log('[Game] Starting game in WebGL/Canvas mode');
            this.setupPIXI();
        }
        else {
            console.log('[Game] Starting game in DOM mode');
            var domrender = document.createElement('domrender');
            domrender.style.display = 'block';
            domrender.style.position = 'absolute';
            domrender.style.backgroundColor = 'white';
            document.body.appendChild(domrender);
            this.addObject(this.mainMenu = new MainMenu(this));
            requestAnimationFrame(this.gameLoop.bind(this));
        }
    }
    Object.defineProperty(Game.prototype, "stage", {
        get: function () {
            return this._stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "resources", {
        get: function () {
            return this._resources;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "renderDom", {
        get: function () {
            return this._renderDom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "loader", {
        get: function () {
            return this._loader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "state", {
        set: function (state) {
            this._state = state;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.gameLoop = function () {
        this.allObjects.forEach(function (element) {
            element.tick();
        });
        if (!this._renderDom) {
            this._renderer.render(this._stage);
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.keyboardEvent = function (event) {
        console.log('key pressed', event.key);
        console.log('state', this._state);
        switch (event.key) {
            case ' ':
                if (this._state === 'mainmenu') {
                    this.mainMenu.startLevel();
                }
                break;
            default:
                break;
        }
    };
    Game.prototype.addObject = function (obj) {
        this.allObjects.push(obj);
    };
    Game.prototype.setupPIXI = function () {
        var options = {
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
            'assets/press_start.png',
            'assets/o.png',
            'assets/block.png'
        ])
            .load(this.setupPIXIAssetsLoaded.bind(this));
    };
    Game.prototype.setupPIXIAssetsLoaded = function () {
        this.addObject(this.mainMenu = new MainMenu(this));
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.runLevel = function (level) {
        this.mainMenu.delete();
        this.addObject(new Level(this, level));
    };
    return Game;
}());
var forceDOM = false;
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
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
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
    if (forceDOM) {
        new Game(true);
    }
    else {
        new Game(useDOM);
    }
}
var GameObj = (function () {
    function GameObj(g, name, x, y, width, height, image) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 1; }
        if (height === void 0) { height = 1; }
        if (image === void 0) { image = 'assets/o.png'; }
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
    Object.defineProperty(GameObj.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this._x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObj.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            this._y = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObj.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (width) {
            this._width = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObj.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (height) {
            this._height = height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObj.prototype, "image", {
        get: function () {
            return this._image;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObj.prototype, "g", {
        get: function () {
            return this._g;
        },
        set: function (g) {
            this._g = g;
        },
        enumerable: true,
        configurable: true
    });
    GameObj.prototype.createNode = function () {
        this.d = new DomObj(this.name, this);
    };
    GameObj.prototype.createSprite = function () {
        this.p = new SpriteObj(this);
    };
    GameObj.prototype.delete = function () {
        if (this._g.renderDom) {
            this.d.delete();
        }
        else {
            this.p.delete();
        }
    };
    GameObj.prototype.tick = function () {
        if (this._g.renderDom) {
            this.d.tick();
        }
        else {
            this.p.tick();
        }
    };
    return GameObj;
}());
var Level = (function (_super) {
    __extends(Level, _super);
    function Level(g, num) {
        var _this = _super.call(this, g, 'level') || this;
        _this.levelObjects = [];
        _this.levelConstructed = false;
        _this.g = g;
        _this.num = num;
        _this.g.state = 'level';
        _this.constructLevel();
        return _this;
    }
    Level.prototype.tick = function () {
        if (this.levelConstructed) {
            for (var i = 0; i < this.levelObjects.length; i++) {
                var element = this.levelObjects[i];
                element.x = element.x - this.speed;
                if (element.x < 0 - element.width + 1) {
                    this.levelObjects.splice(i--, 1);
                }
            }
        }
    };
    Level.prototype.addObj = function (item) {
        this.levelObjects.push(item);
        this.g.addObject(item);
    };
    Level.prototype.constructLevel = function () {
        if (this.num === 1) {
            this.speed = 20;
            this.addObj(new Block(this.g, 100, 620, 1080, 100, this.speed));
            this.addObj(new Block(this.g, 1180, 610, 1080, 110, this.speed));
            this.levelConstructed = true;
        }
        else if (this.num === -1) {
            this.speed = 20;
            var lengthOfLevel = 100;
            var randomY = 620;
            for (var i = 0; i < lengthOfLevel; i++) {
                this.addObj(new Block(this.g, i * 360 + 100, randomY, 360, 100, this.speed));
                if (Math.round(Math.random())) {
                    if (randomY <= 20) {
                        randomY += 50;
                    }
                    else {
                        randomY -= 50;
                    }
                }
                else {
                    if (randomY >= 670) {
                        randomY -= 50;
                    }
                    else {
                        randomY += 50;
                    }
                }
            }
            console.log(this.levelObjects);
            this.levelConstructed = true;
        }
    };
    return Level;
}(GameObj));
var SpriteObj = (function () {
    function SpriteObj(obj) {
        this.obj = obj;
        this.sprite = new PIXI.Sprite(obj.g.resources["" + this.obj.image].texture);
        this.sprite.x = this.obj.x;
        this.sprite.y = this.obj.y;
        this.sprite.width = this.obj.width;
        this.sprite.height = this.obj.height;
        obj.g.stage.addChild(this.sprite);
    }
    SpriteObj.prototype.tick = function () {
        this.sprite.width = this.obj.width;
        this.sprite.height = this.obj.height;
        this.sprite.x = this.obj.x;
        this.sprite.y = this.obj.y;
    };
    SpriteObj.prototype.delete = function () {
        this.obj.g.stage.removeChild(this.sprite);
    };
    return SpriteObj;
}());
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(g, x, y, width, height, leftSpeed) {
        return _super.call(this, g, 'block', x, y, width, height, 'assets/block.png') || this;
    }
    Block.prototype.tick = function () {
        if (this.x < 0 - this.width) {
            _super.prototype.delete.call(this);
        }
        _super.prototype.tick.call(this);
    };
    return Block;
}(GameObj));
var Logo = (function (_super) {
    __extends(Logo, _super);
    function Logo(g) {
        return _super.call(this, g, 'logo', 0, 100, 1280 / 4, 1280 / 4, 'assets/iiilogo.png') || this;
    }
    Logo.prototype.tick = function () {
        this.correctPosition();
        _super.prototype.tick.call(this);
    };
    Logo.prototype.correctPosition = function () {
        this.width = 1280 / 4;
        this.height = 1280 / 4;
        this.x = 1280 / 2 - this.width * 0.5;
    };
    return Logo;
}(GameObj));
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu(g) {
        var _this = _super.call(this, g, 'main-menu') || this;
        _this.g = g;
        _this.g.state = 'mainmenu';
        g.addObject(_this.logo = new Logo(g));
        g.addObject(_this.pressStart = new PressStart(g));
        return _this;
    }
    MainMenu.prototype.startLevel = function () {
        this.g.runLevel(-1);
    };
    MainMenu.prototype.delete = function () {
        this.logo.delete();
        this.pressStart.delete();
    };
    return MainMenu;
}(GameObj));
var PressStart = (function (_super) {
    __extends(PressStart, _super);
    function PressStart(g) {
        return _super.call(this, g, 'PressStart', 380, 500, 580, 78, 'assets/press_start.png') || this;
    }
    PressStart.prototype.tick = function () {
        this.x = 380;
        this.y = 500;
        _super.prototype.tick.call(this);
    };
    return PressStart;
}(GameObj));
//# sourceMappingURL=main.js.map