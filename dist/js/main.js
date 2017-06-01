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
var domObj = (function () {
    function domObj(name, obj) {
        this.name = name;
        this.obj = obj;
        this.div = document.createElement('img');
        this.div.className = 'iii-' + this.name;
        this.div.width = this.obj.width;
        this.div.height = this.obj.height;
        this.div.src = this.obj.image;
        document.body.appendChild(this.div);
    }
    domObj.prototype.tick = function () {
        this.div.style.transform = "translate(" + this.obj.x + "px, " + this.obj.y + "px)";
    };
    return domObj;
}());
var Game = (function () {
    function Game(renderDom) {
        if (renderDom === void 0) { renderDom = true; }
        this._renderDom = true;
        this.allObjects = [];
        this._renderDom = renderDom;
        this.allObjects.push(new gameObj(this, 'logo', 200, 200, 80, 80, '/iii/assets/cat.png'));
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Object.defineProperty(Game.prototype, "renderDom", {
        get: function () {
            return this._renderDom;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.gameLoop = function () {
        this.allObjects.forEach(function (element) {
            element.tick();
        });
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Game;
}());
window.addEventListener('load', function (e) {
    new Game();
});
var gameObj = (function () {
    function gameObj(g, name, x, y, width, height, image) {
        this.g = g;
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.createNode();
    }
    gameObj.prototype.createNode = function () {
        this.d = new domObj(this.name, this);
    };
    gameObj.prototype.tick = function () {
        this.d.tick();
    };
    return gameObj;
}());
var Logo = (function (_super) {
    __extends(Logo, _super);
    function Logo(g, x, y) {
        return _super.call(this, g, x, y, 720, 720, '/iii/iiilogo.png') || this;
    }
    return Logo;
}(gameObj));
//# sourceMappingURL=main.js.map