/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Weapon"/>

namespace RogueVerse.Entities.Weapons {
    export class Laser extends Entities.Weapons.Weapon {
        constructor(game: Phaser.Game) {
            super(game, "weapon.laser");
        }
    }
}