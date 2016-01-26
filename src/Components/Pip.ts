/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Components {
    export class Pip extends Phaser.Sprite {
        anchorObject: PIXI.DisplayObject;
        constraint: Phaser.Physics.P2.LockConstraint;
        minDistance: number = 70;

        constructor(game: Phaser.Game, key:string, anchorObject: PIXI.DisplayObject, lag: number) {
            super(game, 0, 0, key);

            this.anchorObject = anchorObject;

            this.game.physics.p2.enable(this);
            this.body.fixedRotation = true;

            this.constraint = this.game.physics.p2.createLockConstraint(this.anchorObject, this, [0, this.minDistance]);
            this.constraint.setRelaxation(lag);
        }

        update() {
            var distToPointer = Phaser.Math.max(this.minDistance, this.game.physics.arcade.distanceToPointer(this.anchorObject));

            // modify the constraint offset directly to get a smooth interpolation towards the mouse pointer
            this.constraint.localOffsetB[1] = this.game.physics.p2.pxm(distToPointer);
        }
    }
}