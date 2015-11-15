/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Projectile"/>

namespace RogueVerse.Entities.Projectiles {
    export class Laser extends Entities.Projectiles.Projectile {
        damageRating: number = 100;
        speed: number = 300;
        lifespan: number = 4000;
        
        constructor(game: Phaser.Game, x: number, y: number, key: string, frame?: number|string) {
            super(game, x, y, "projectiles.laser", frame);
        }
    }
}