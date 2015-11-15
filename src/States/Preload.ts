/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.States {
    export class Preload extends Phaser.State {
        static Key = "preload";
        
        preload() {
            this.game.load.image("starfield", "assets/starfield.jpg");
            this.game.load.image("nebula", "assets/nebula.jpg");
            this.game.load.image("ship1", "assets/ship1.png");
            this.game.load.shader("lights", "assets/lights.frag");
        }
        
        create() {
            this.game.state.start(States.Testbed.Key);
        }
    }
}