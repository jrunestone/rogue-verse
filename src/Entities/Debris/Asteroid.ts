/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Entities.Debris {
    export class Asteroid extends Phaser.Sprite {
        static collisionGroup: Phaser.Physics.P2.CollisionGroup;

        constructor(game: Phaser.Game, x: number, y: number, key: string, frame?: number|string) {
            super(game, x, y, key, frame);

            if (!Asteroid.collisionGroup) {
                Asteroid.collisionGroup = this.game.physics.p2.createCollisionGroup();
            }

            var scale = 0.2 + Math.random() * 1;
            this.scale.setTo(scale);

            this.game.physics.p2.enable(this);
            this.body.setCollisionGroup(Asteroid.collisionGroup);

            this.checkWorldBounds = false;
            this.outOfBoundsKill = false;
            this.body.collideWorldBounds = false;

            this.body.x = this.game.world.randomX;
            this.body.y = this.game.world.randomY;
            this.body.mass = 5;

            this.body.angularVelocity = -1 + Math.random() * 2;
            this.body.velocity.x = -100 + Math.random() * 200;
            this.body.velocity.y = -100 + Math.random() * 200;

            this.body.damping = 0;
            this.body.angularDamping = 0;
        }

        update() {
            this.game.world.wrap(this.body);
        }
    }
}