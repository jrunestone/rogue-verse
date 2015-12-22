/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Debris/Asteroid"/>
/// <reference path="../Ships/Ship"/>

namespace RogueVerse.Entities.Projectiles {
    export abstract class Projectile extends Phaser.Sprite {
        damageRating: number;
        speed: number;
        timeToLive: number;
        impactEmitter: Phaser.Particles.Arcade.Emitter;

        static collisionGroup: Phaser.Physics.P2.CollisionGroup;

        constructor(game: Phaser.Game, x: number, y: number, key: string, frame?: number|string) {
            super(game, x, y, key, frame);

            if (!Projectile.collisionGroup) {
                Projectile.collisionGroup = this.game.physics.p2.createCollisionGroup();
            }

            this.game.physics.p2.enable(this);
            this.body.setCollisionGroup(Projectile.collisionGroup);
            this.body.data.shapes[0].sensor = true;

            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;
            this.body.collideWorldBounds = false;

            this.impactEmitter = this.game.add.emitter(0, 0, 100);
            this.impactEmitter.makeParticles("particles.impact", [0, 1, 2, 3, 4, 5, 6, 7, 8], 9, true);
            this.impactEmitter.gravity = 0;
            this.impactEmitter.minParticleScale = 0.1;
            this.impactEmitter.maxParticleScale = 0.1;

            (<RogueVerse.Game>this.game).addCollisions.add(() => this.addCollisions());
        }

        addCollisions() {
            this.body.collides(Entities.Debris.Asteroid.collisionGroup);
            this.body.onBeginContact.add(this.collide, this);
        }

        collide(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body, shape1: any, shape2: any, contactEquation: any) {
            var impactAngle = this.game.physics.arcade.angleBetween(body1, this);

            this.impactEmitter.position.x = this.x - this.width * 1.5 * Math.cos(impactAngle);
            this.impactEmitter.position.y = this.y - this.height * 1.5 * Math.sin(impactAngle);
            this.impactEmitter.explode(200, 4);

            this.kill();
        }
    }
}