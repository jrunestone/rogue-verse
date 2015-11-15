/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Projectiles/Projectile"/>

namespace RogueVerse.Entities.Weapons {
    export abstract class Weapon extends Phaser.Sprite {
        name: string;
        
        firingRate: number;
        overheatTime: number;
        overheatCooldown: number;
        projectiles: Phaser.Group;
        
        constructor(game: Phaser.Game, name: string, weaponKey: string, projectileType: any) {
            super(game, 0, 0, weaponKey);
            this.name = name;
            
            this.projectiles = this.game.add.physicsGroup(Phaser.Physics.P2JS);
            this.projectiles.classType = projectileType;
        }
        
        fire() {
            
        }
    }
}