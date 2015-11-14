/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Entities {
    export class Ship extends Phaser.Sprite {
        constructor(game: Phaser.Game, key: string) {
            super(game, game.world.centerX, game.world.centerY, key);
        }
    }
}