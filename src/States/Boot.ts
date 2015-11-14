/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.States {
    export class Boot extends Phaser.State {
        static Key = "boot";
        
        init() {
            this.game.stage.setBackgroundColor("#fff8dc");
            this.game.physics.startSystem(Phaser.Physics.P2JS);
        }
        
        create() {
            this.game.state.start(States.Preload.Key);
        }
    }
}