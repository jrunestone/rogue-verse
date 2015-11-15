/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Weapon"/>

namespace RogueVerse.Entities.Weapons {
    export class Badger extends Entities.Weapons.Weapon {
        constructor(game: Phaser.Game) {
            super("Badger laser repeater", "weapon.badger", game);
        }
    }
}