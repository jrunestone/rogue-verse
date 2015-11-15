/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Entities.Projectiles {
    export abstract class Projectile extends Phaser.Sprite {
        damageRating: number;
        speed: number;
        
        constructor(key: string, game: Phaser.Game) {
            super(game, 0, 0, key);
        }
    }
}