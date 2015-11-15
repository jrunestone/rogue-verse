/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Entities/Weapons/Weapon"/>

namespace RogueVerse.Components {
    export class MountPoint {
        name: string;
        x: number;
        y: number;
        weapon: Entities.Weapons.Weapon;
        
        constructor(name: string, x: number, y: number, weapon: Entities.Weapons.Weapon) {
            this.name = name;
            this.x = x;
            this.y = y;
            this.weapon = weapon;
        }
    }
}