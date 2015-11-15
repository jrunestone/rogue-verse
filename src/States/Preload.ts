/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.States {
    export class Preload extends Phaser.State {
        static Key = "preload";
        
        preload() {
            this.game.load.image("bg.starfield", "assets/bg/starfield.jpg");
            this.game.load.image("bg.nebulafield", "assets/bg/nebula.jpg");
            
            this.game.load.image("ships.avenger", "assets/ships/avenger.png");
            this.game.load.image("weapons.laser", "assets/weapons/laser.png");
        }
        
        create() {
            this.game.state.start(States.Testbed.Key);
        }
    }
}