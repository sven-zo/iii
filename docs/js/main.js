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
        this._audio = new Audio('assets/intro.mp3');
        this._audio.play();
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
    Object.defineProperty(Game.prototype, "player", {
        get: function () {
            return this._player;
        },
        set: function (player) {
            this._player = player;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "audio", {
        get: function () {
            return this._audio;
        },
        set: function (audio) {
            this._audio = audio;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "renderer", {
        get: function () {
            return this._renderer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (level) {
            this._level = level;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.gameLoop = function () {
        this.allObjects.forEach(function (element) {
            element.tick();
        });
        if (this._state === 'level') {
            for (var i = 0; i < this.allObjects.length; i++) {
                if (this.allObjects[i].name === 'player') {
                }
                else {
                    if (this.hasOverlap(this.player, this.allObjects[i])) {
                        this.player.collide();
                        if (this.allObjects[i].name === 'death-block') {
                            this.clearLevelObjects();
                            this.player.gameOverScreen();
                        }
                    }
                }
            }
        }
        if (!this._renderDom) {
            this._renderer.render(this._stage);
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.keyboardEvent = function (event) {
        switch (event.key) {
            case ' ':
                if (this._state === 'mainmenu') {
                    this.mainMenu.startLevel();
                }
                else if (this._state === 'level') {
                    this.player.jump();
                }
                else if (this._state === 'gameover') {
                    this._level.deconstructLevel();
                    this.player.removeGameOverScreen();
                    this.mainMenu.startLevel();
                }
                break;
            case 'd':
                console.log(this.allObjects);
                break;
            case 'o':
                for (var i = 0; i < this.allObjects.length; i++) {
                    console.log(!this.allObjects[i].name === 'player');
                }
                console.log('Is object 103 een speler?', this.allObjects[103].name === 'player');
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
            'assets/logo.json',
            'assets/press_start.png',
            'assets/o.png',
            'assets/block.png',
            'assets/player.png',
            'assets/gameOver.png'
        ])
            .load(this.setupPIXIAssetsLoaded.bind(this));
    };
    Game.prototype.setupPIXIAssetsLoaded = function () {
        this.addObject(this.mainMenu = new MainMenu(this));
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.runLevel = function (level) {
        this.mainMenu.delete();
        this.addObject(this._level = new Level(this, level));
    };
    Game.prototype.clearLevelObjects = function () {
        for (var i = 0; i < this.allObjects.length; i++) {
            if (this.allObjects[i].objName === 'block' || 'death-block') {
                this.allObjects.splice(i--, 1);
            }
        }
    };
    Game.prototype.hasOverlap = function (c1, c2) {
        return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
    };
    return Game;
}());
var neverUseDOM = true;
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
        if (useDOM || forceDOM) {
            if (neverUseDOM) {
                new Game(useDOM);
            }
        }
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
    if (useDOM) {
        if (neverUseDOM) {
            new Game(useDOM);
        }
    }
    if (forceDOM) {
        new Game(true);
    }
    else {
        if (!neverUseDOM) {
            new Game(useDOM);
        }
        else {
            new Game(useDOM);
        }
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
    Object.defineProperty(GameObj.prototype, "p", {
        get: function () {
            return this._p;
        },
        set: function (p) {
            this._p = p;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObj.prototype, "objName", {
        get: function () {
            return this.name;
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
        _this.score = 0;
        _this.g = g;
        _this.num = num;
        _this.g.state = 'level';
        _this.constructLevel();
        return _this;
    }
    Level.prototype.getScore = function () {
        return this.score;
    };
    Level.prototype.addPoint = function () {
        this.score += 0.5;
        console.log(this.score - 0.5);
    };
    Level.prototype.tick = function () {
        if (this.levelConstructed) {
            for (var i = 0; i < this.levelObjects.length; i++) {
                var element = this.levelObjects[i];
                element.x = element.x - this.speed;
                if (element.x < 0 - element.width + 1) {
                    this.levelObjects.splice(i--, 1);
                    this.addPoint();
                }
            }
        }
    };
    Level.prototype.addObj = function (item) {
        this.levelObjects.push(item);
        this.g.addObject(item);
    };
    Level.prototype.deconstructLevel = function () {
        this.levelObjects.forEach(function (element) {
            element.delete();
        });
        this.levelObjects = null;
        this.g.clearLevelObjects();
        this.levelConstructed = false;
        this.audio.pause();
        this.g.player.delete();
    };
    Level.prototype.constructLevel = function () {
        if (this.num === 1) {
            this.speed = 20;
            this.addObj(new Block(this.g, 100, 620, 1080, 100, this.speed));
            this.addObj(new Block(this.g, 1180, 610, 1080, 110, this.speed));
            this.levelConstructed = true;
        }
        else if (this.num === -1) {
            this.g.audio.pause();
            this.audio = new Audio('assets/Tech_Live.mp3');
            this.audio.play();
            this.speed = 10;
            var lengthOfLevel = 2000;
            var randomY = 620;
            var blockLength = 350;
            this.addObj(new Block(this.g, 1 * blockLength + 100, randomY, blockLength, 100, this.speed));
            for (var i = 2; i < lengthOfLevel; i++) {
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
                var blockHeight = 720 - randomY;
                this.addObj(new Block(this.g, i * blockLength + 100, randomY, blockLength, blockHeight, this.speed));
                this.addObj(new DeathBlock(this.g, i * blockLength + 100, randomY + 15, blockLength, 5, this.speed));
            }
            this.g.player = new Player(this.g);
            this.g.addObject(this.g.player);
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
    Object.defineProperty(SpriteObj.prototype, "sprite", {
        get: function () {
            return this._sprite;
        },
        set: function (sprite) {
            this._sprite = sprite;
        },
        enumerable: true,
        configurable: true
    });
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
var TextRender = (function () {
    function TextRender(g, x, y, text) {
        this.g = g;
        if (this.g.renderDom) {
        }
        else {
            var style = new PIXI.TextStyle({
                align: 'left',
                fontFamily: 'Roboto, Tahoma, Geneva, sans-serif',
                fontSize: 26
            });
            this.sprite = new PIXI.Text(text, style);
            this.g.stage.addChild(this.sprite);
        }
    }
    TextRender.prototype.delete = function () {
        this.g.stage.removeChild(this.sprite);
    };
    return TextRender;
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
    Block.prototype.delete = function () {
        this.g.stage.removeChild(this.p.sprite);
    };
    return Block;
}(GameObj));
var DeathBlock = (function (_super) {
    __extends(DeathBlock, _super);
    function DeathBlock(g, x, y, width, height, leftSpeed) {
        return _super.call(this, g, 'death-block', x, y, width, height, 'assets/block.png') || this;
    }
    DeathBlock.prototype.tick = function () {
        if (this.x < 0 - this.width) {
            _super.prototype.delete.call(this);
        }
        _super.prototype.tick.call(this);
    };
    DeathBlock.prototype.delete = function () {
        this.g.stage.removeChild(this.p.sprite);
    };
    return DeathBlock;
}(GameObj));
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver(g) {
        var _this = _super.call(this, g, 'block', 0, 0, 1404, 936, 'assets/gameOver.png') || this;
        _this.g.state = 'gameover';
        _this.audio = new Audio('assets/gameover.wav');
        _this.audio.play();
        _this.score = new TextRender(_this.g, 100, 100, "Score: " + ((_this.g.level.getScore() - 0.5) * 10));
        return _this;
    }
    GameOver.prototype.delete = function () {
        console.log('remove');
        this.g.stage.removeChild(this.p.sprite);
        this.score.delete();
    };
    return GameOver;
}(GameObj));
var Logo = (function (_super) {
    __extends(Logo, _super);
    function Logo(g) {
        var _this = _super.call(this, g, 'logo', 0, 100, 1280 / 4, 1280 / 4, 'assets/iiilogo.png') || this;
        if (!g.renderDom) {
            var frames_1 = [];
            for (var i = 0; i < 50; i++) {
                var val = i < 10 ? '0' + i : i;
                frames_1.push(PIXI.Texture.fromFrame('SpriteAnimation_000' + val + '.png'));
            }
            _this.anim = new PIXI.extras.AnimatedSprite(frames_1);
            _this.anim.width = 1280 / 4;
            _this.anim.height = 1280 / 4;
            _this.anim.x = 1280 / 2;
            _this.anim.y = 1280 / 4 - 60;
            _this.anim.anchor.set(0.5);
            _this.anim.animationSpeed = 0.5;
            _this.anim.play();
            _this.g.stage.addChild(_this.anim);
        }
        return _this;
    }
    Logo.prototype.hide = function () {
        this.anim.visible = false;
    };
    Logo.prototype.tick = function () {
        this.animate();
        _super.prototype.tick.call(this);
    };
    Logo.prototype.animate = function () {
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
        _this.text = new TextRender(_this.g, 0, 0, ' v1.0.27 \n Made by @sven-zo');
        return _this;
    }
    MainMenu.prototype.startLevel = function () {
        this.g.runLevel(-1);
    };
    MainMenu.prototype.delete = function () {
        if (!this.g.renderDom) {
            this.logo.hide();
        }
        this.logo.delete();
        this.g.stage.removeChild(this.logo.anim);
        this.pressStart.delete();
        this.text.delete();
    };
    return MainMenu;
}(GameObj));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(g) {
        var _this = _super.call(this, g, 'player', 50 + 50 + 50, 620 - 49 - 1000 - 80 - 80 + 800, 49 / 2, 91 / 2, 'assets/player.png') || this;
        _this.Yspeed = 0;
        _this.audio = new Audio('assets/jump.wav');
        return _this;
    }
    Player.prototype.collide = function () {
        this.Yspeed = 0;
    };
    Player.prototype.jump = function () {
        if (this.Yspeed === 0) {
            this.audio.play();
            this.Yspeed = -9.9;
        }
    };
    Player.prototype.gameOverScreen = function () {
        if (!this.gameOver) {
            this.gameOver = new GameOver(this.g);
        }
    };
    Player.prototype.removeGameOverScreen = function () {
        this.gameOver.delete();
    };
    Player.prototype.tick = function () {
        this.y += this.Yspeed;
        this.Yspeed += 0.5;
        _super.prototype.tick.call(this);
        if (this.y > 720) {
            if (!this.gameOver) {
                this.gameOver = new GameOver(this.g);
            }
        }
    };
    return Player;
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