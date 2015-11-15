/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Projectile"/>

namespace RogueVerse.Entities.Projectiles {
    export class Laser extends Entities.Projectiles.Projectile {
        constructor(game: Phaser.Game) {
            super("projectiles.laser", game);
        }
    }
}