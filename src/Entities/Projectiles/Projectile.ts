/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Debris/Asteroid"/>
/// <reference path="../Ships/Ship"/>

namespace RogueVerse.Entities.Projectiles {
    export abstract class Projectile extends Phaser.Sprite {
        damageRating: number;
        speed: number;
        timeToLive: number;

        static collisionGroup: Phaser.Physics.P2.CollisionGroup;

        constructor(game: Phaser.Game, x: number, y: number, key: string, frame?: number|string) {
            super(game, x, y, key, frame);

            if (!Projectile.collisionGroup) {
                Projectile.collisionGroup = this.game.physics.p2.createCollisionGroup();
            }

            this.game.physics.p2.enable(this);
            this.body.setCollisionGroup(Projectile.collisionGroup);

            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;
            this.body.collideWorldBounds = false;

            (<RogueVerse.Game>this.game).setupCollisions.add(this.setupCollisions, this);
        }

        setupCollisions() {
            this.body.collides(Entities.Debris.Asteroid.collisionGroup);
        }
    }
}