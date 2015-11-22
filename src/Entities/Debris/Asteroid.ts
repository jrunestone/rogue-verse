/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Ships/Ship"/>
/// <reference path="../Projectiles/Projectile"/>

namespace RogueVerse.Entities.Debris {
    export class Asteroid extends Phaser.Sprite {
        static collisionGroup: Phaser.Physics.P2.CollisionGroup;

        constructor(game: Phaser.Game, x: number, y: number, key: string, frame?: number|string) {
            super(game, x, y, key, frame);

            if (!Asteroid.collisionGroup) {
                Asteroid.collisionGroup = this.game.physics.p2.createCollisionGroup();
            }

            var scale = this.game.rnd.realInRange(0.2, 1.2);
            this.scale.setTo(scale);

            this.game.physics.p2.enable(this);
            this.body.setCircle(this.width / 2);
            this.body.setCollisionGroup(Asteroid.collisionGroup);

            this.checkWorldBounds = false;
            this.outOfBoundsKill = false;
            this.body.collideWorldBounds = false;

            this.body.x = this.game.world.randomX;
            this.body.y = this.game.world.randomY;
            this.body.mass = 5 + scale;

            this.body.angularVelocity = this.game.rnd.realInRange(-1, 1);
            this.body.velocity.x = this.game.rnd.realInRange(-100, 100);
            this.body.velocity.y = this.game.rnd.realInRange(-100, 100);

            this.body.damping = 0;
            this.body.angularDamping = 0;

            (<RogueVerse.Game>this.game).setupCollisions.add(this.setupCollisions, this);
        }

        setupCollisions() {
            this.body.collides([Asteroid.collisionGroup, Entities.Ships.Ship.collisionGroup, Entities.Projectiles.Projectile.collisionGroup]);
        }

        update() {
            this.game.world.wrap(this.body);
        }
    }
}