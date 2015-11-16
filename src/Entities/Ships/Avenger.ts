/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Ship"/>
/// <reference path="../../Entities/Weapons/Badger"/>

namespace RogueVerse.Entities.Ships {
    export class Avenger extends Entities.Ships.Ship {
        thrustRating: number = 400;
        thrustDamping:number = 0.4;
        turnRate: number = 50;
        brakeRate: number = 0.9;
        maxSpeed: number = 200;
        maxSpeedDamping: number = 0.9;

        constructor(game: Phaser.Game) {
            super(game, "Avenger", "ships.avenger");
            
            this.addMountPoint(-10, 2, new Entities.Weapons.Badger(game));
            this.addMountPoint(10, 2, new Entities.Weapons.Badger(game));
            
            this.weaponGroups = [
                [0, 1]
            ];
        }
    }
}