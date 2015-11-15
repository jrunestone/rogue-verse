/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Entities.Weapons {
    export class Weapon extends Phaser.Sprite {
        constructor(game: Phaser.Game, key: string) {
            super(game, 0, 0, key);
        }
    }
}