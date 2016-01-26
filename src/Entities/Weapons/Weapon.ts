/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Projectiles/Projectile"/>

namespace RogueVerse.Entities.Weapons {
    export abstract class Weapon extends Phaser.Sprite {
        name: string;
        projectiles: Phaser.Group;

        firingRate: number;
        overheatFactor: number;
        cooldownTime: number;

        lastFireTime: number;
        overheatTimer: number = 0;
        overheated: boolean;

        constructor(game: Phaser.Game, name: string, weaponKey: string, projectileType: any) {
            super(game, 0, 0, weaponKey);

            this.name = name;

            this.game.physics.p2.enable(this);
            this.body.static = true;

            this.projectiles = this.game.add.group();
            this.projectiles.classType = projectileType;
            this.projectiles.createMultiple(20, null);
            (<RogueVerse.Game>this.game).worldLayer.add(this.projectiles);
        }

        fire() {
            if (this.overheated || this.game.time.elapsedSince(this.lastFireTime) < 1000 / this.firingRate) {
                return;
            }

            var projectile = <Projectiles.Projectile>this.projectiles.getFirstExists(false);

            if (projectile) {
                projectile.reset(this.parent.x, this.parent.y);
                projectile.lifespan = projectile.timeToLive;

                // scale down and set pivot to make rotations correct
                // TODO: remove
                projectile.scale.setTo(0.5, 0.5);
                projectile.pivot.set(-this.x * 2, 10);

                projectile.body.angle = (<Phaser.Sprite>this.parent).body.angle;

                // body.angle is per default oriented -90 degrees
                var velocity = this.game.physics.arcade.velocityFromAngle(projectile.body.angle - 90, projectile.speed);

                projectile.body.velocity.x = velocity.x;
                projectile.body.velocity.y = velocity.y;
            }

            this.overheatTimer = Math.min(this.cooldownTime, this.overheatTimer + this.overheatFactor * this.cooldownTime);
            this.lastFireTime = game.time.time;
        }

        update() {
            if (this.overheatTimer >= this.cooldownTime) {
                this.overheated = true;
            }

            if (this.overheatTimer > 0) {
                this.overheatTimer = Math.max(0, this.overheatTimer - game.time.physicsElapsedMS);
            } else {
                this.overheated = false;
            }
        }
    }
}