/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Ship"/>
/// <reference path="../../Components/MountPoint"/>
/// <reference path="../../Entities/Weapons/Laser"/>

namespace RogueVerse.Entities.Ships {
    export class Avenger extends Entities.Ships.Ship {
        MaxSpeed: number = 300;
        
        constructor(game: Phaser.Game) {
            super("Avenger", "ships.avenger", game);
            
            this.mountPoints = [
                new Components.MountPoint("Left wing", 0, 0, new Entities.Weapons.Laser(this.game))
            ];
            
            this.weaponGroups = [
                ["Left wing"]
            ];
        }
    }
}