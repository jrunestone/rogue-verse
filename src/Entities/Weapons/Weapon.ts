/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Projectiles/Projectile"/>

namespace RogueVerse.Entities.Weapons {
    export abstract class Weapon extends Phaser.Sprite {
        name: string;
        projectiles: Phaser.Group;
        
        firingRate: number;
        overheatTime: number;
        overheatCooldown: number;
        
        lastFireTime: number;
        
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
            if (this.game.time.elapsedSince(this.lastFireTime) < 1000 / this.firingRate) {
                return;
            }
            
            var projectile = this.projectiles.getFirstExists(false);

            if (projectile) {
                projectile.reset(this.parent.x, this.parent.y);
                projectile.lifespan = projectile.timeToLive;

                // scale down and set pivot to make rotations correct
                projectile.scale.setTo(0.5, 0.5);
                projectile.pivot.setTo(-this.x * 2, 10);
                projectile.body.angle = (<Phaser.Sprite>this.parent).body.angle;

                // body.angle is per default oriented -90 degrees
                var velocity = this.game.physics.arcade.velocityFromAngle(projectile.body.angle - 90, projectile.speed);

                projectile.body.velocity.x = velocity.x;
                projectile.body.velocity.y = velocity.y;
            }
            
            this.lastFireTime = game.time.time;
        }
    }
}