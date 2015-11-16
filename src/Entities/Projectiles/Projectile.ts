/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Entities.Projectiles {
    export abstract class Projectile extends Phaser.Sprite {
        damageRating: number;
        speed: number;
        timeToLive: number;
        
        constructor(game: Phaser.Game, x: number, y: number, key: string, frame?: number|string) {
            super(game, 0, 0, key, frame);
        }
    }
}