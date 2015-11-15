/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Projectiles/Projectile"/>

namespace RogueVerse.Entities.Weapons {
    export abstract class Weapon extends Phaser.Sprite {
        name: string;
        projectiles: Phaser.Group;
        
        firingRate: number;
        overheatTime: number;
        overheatCooldown: number;
        
        constructor(game: Phaser.Game, name: string, weaponKey: string, projectileType: any) {
            super(game, 0, 0, weaponKey);
            
            this.name = name;
            
            this.projectiles = this.game.add.physicsGroup(Phaser.Physics.P2JS);
            this.projectiles.classType = projectileType;
            this.projectiles.createMultiple(10, null, null, false);
            
            this.projectiles.setAll("body.kinematic", true);
            this.projectiles.setAll("checkWorldBounds", true);
            this.projectiles.setAll("outOfBoundsKill", true);
            
            this.game.physics.p2.enable(this);
            this.body.static = true;
        }
        
        fire() {
            var projectile = this.projectiles.getFirstExists(false);
            
            if (projectile) {
                projectile.reset(this.parent.x, this.parent.y);
                projectile.body.angle = (<Phaser.Sprite>this.parent).body.angle;

                var velocity = this.game.physics.arcade.velocityFromAngle(projectile.body.angle - 90, 600);

                projectile.body.velocity.x = velocity.x;
                projectile.body.velocity.y = velocity.y;
            }
        }
    }
}