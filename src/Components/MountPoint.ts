/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Entities/Weapons/Weapon"/>
/// <reference path="../Entities/Projectiles/Projectile"/>

namespace RogueVerse.Components {
    export class MountPoint {
        name: string;
        x: number;
        y: number;
        weapon: Entities.Weapons.Weapon<Entities.Projectiles.Projectile>;
        
        constructor(name: string, x: number, y: number, weapon: Entities.Weapons.Weapon<Entities.Projectiles.Projectile>) {
            this.name = name;
            this.x = x;
            this.y = y;
            this.weapon = weapon;
        }
    }
}