/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Components {
    export class FixedPip extends Phaser.Sprite {
        anchorObject: PIXI.DisplayObject;
        constraint: Phaser.Physics.P2.LockConstraint;

        constructor(game: Phaser.Game, key, anchorObject: PIXI.DisplayObject) {
            super(game, 0, 0, key);

            this.anchorObject = anchorObject;

            this.game.physics.p2.enable(this);
            this.body.fixedRotation = true;

            this.constraint = this.game.physics.p2.createLockConstraint(this.anchorObject, this, [0, 10]);
            this.constraint.setRelaxation(8);
        }

        update() {
            var distToPointer = Phaser.Math.max(70, this.game.physics.arcade.distanceToPointer(this.anchorObject));

            // modify the constraint offset directly to get a smooth interpolation towards the mouse pointer
            this.constraint.localOffsetB[1] = this.game.physics.p2.pxm(distToPointer);
        }
    }
}