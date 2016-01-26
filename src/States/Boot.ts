/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.States {
    export class Boot extends Phaser.State {
        static Key = "boot";

        init() {
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;

            this.game.time.advancedTiming = true;
            this.game.stage.setBackgroundColor("#000000");
            this.game.world.setBounds(0, 0, 2000, 2000);

            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.setImpactEvents(true);
            this.game.physics.p2.restitution = 0.7;
        }

        create() {
            this.game.state.start(States.Preload.Key);
        }
    }
}