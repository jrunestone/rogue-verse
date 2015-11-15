/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Entities.Weapons {
    export class Weapon extends Phaser.Sprite {
        name: string;
        
        constructor(name: string, key: string, game: Phaser.Game) {
            super(game, 0, 0, key);
            this.name = name;
        }
    }
}