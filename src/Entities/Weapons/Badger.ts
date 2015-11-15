/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Weapon"/>
/// <reference path="../Projectiles/Laser"/>

namespace RogueVerse.Entities.Weapons {
    export class Badger extends Entities.Weapons.Weapon {
        constructor(game: Phaser.Game) {
            super(game, "Badger laser repeater", "weapon.badger", Entities.Projectiles.Laser);
        }
    }
}