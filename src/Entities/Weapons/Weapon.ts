/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Projectiles/Projectile"/>

namespace RogueVerse.Entities.Weapons {
    export abstract class Weapon<T extends Entities.Projectiles.Projectile> extends Phaser.Sprite {
        name: string;
        
        firingRate: number;
        overheatTime: number;
        overheatCooldown: number;
        projectileType: T;
        
        constructor(name: string, weaponKey: string, game: Phaser.Game) {
            super(game, 0, 0, weaponKey);
            this.name = name;
        }
        
        fire() {
            console.log('fire weapon');
        }
    }
}