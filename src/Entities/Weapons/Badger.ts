/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Weapon"/>
/// <reference path="../Projectiles/Laser"/>

namespace RogueVerse.Entities.Weapons {
    export class Badger extends Entities.Weapons.Weapon {
        firingRate: number = 10;
        overheatFactor: number = 0.1;
        cooldownTime: number = 3000;

        constructor(game: Phaser.Game) {
            super(game, "Badger laser repeater", "weapons.badger", Entities.Projectiles.Laser);
            this.scale.setTo(0.5, 0.5);
        }
    }
}