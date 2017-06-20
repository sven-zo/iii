# iii
![Do you like my logo?](https://5ven.stackstorage.com/public-share/OY6zjnbyT5a9ydj/preview?path=/&mode=thumbnail&size=medium)

_i_ am a game. :video_game:
[Click here to play](https://sven-zo.github.io/iii)

[Click here to view UML](https://drive.google.com/file/d/0B4BY0-Gk5LubSTBXb25iSjNoVGM/view?usp=sharing)

# Classes en instances
Bijna elk element in de game is een class, behalve `GameLauncher.ts`. Deze maakt een instance van `Game` aan om het spel te starten. Game maakt weer een instance aan van `MainMenu`, enzovoorts.

# Encapsulation
Alle properties van classes zijn private om te beschermen tegen foute invoer. Door getters en setters te gebruiken zou je kunnen controleren op verkeerde data invoer. Callback methods zijn sowieso altijd private. Methods die door kinderen gebruikt worden staan op `protected`, en methods die door de rest van de classes gebruikt moeten worden staan op `public`.

# Composition
Dit is het gebruikmaken van een ander object door verwijzing. Zo heb ik `GameObj`-types die in `Game` kenbaar zijn, om aangeroepen te worden door de game-loop.

# Inheritance
Mijn project gebruikt best wel veel inheritance. Inheritance is wanneer je een class kan uitbereiden met een andere class. Dit is handig voor bijvoorbeeld meerdere type enemies in een game, die allemaal wel hetzelfde standaard gedrag moeten hebben. Nou heeft mijn game (nog) geen enemies, maar wel veel elementen die naar het scherm getekent moeten worden. Hiervoor heb ik `GameObj`'s, die op basis van de rendermodus (DOM of PIXI.js) een `DomObj` of `SpriteObj` maken. *Waarschuwing: DOM-render werkt niet in de huidige versie van het spel sorry.* 
