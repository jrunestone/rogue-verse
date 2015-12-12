/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.States {
    export class Preload extends Phaser.State {
        static Key = "preload";

        preload() {
            this.game.load.image("bg.starfield", "assets/bg/starfield.jpg");
            this.game.load.image("bg.nebulafield", "assets/bg/nebula.jpg");

            this.game.load.image("ships.avenger", "assets/ships/avenger.png");
            this.game.load.image("weapons.badger", "assets/weapons/badger.png");
            this.game.load.image("projectiles.laser", "assets/projectiles/laser.png");

            this.game.load.spritesheet("asteroids.1", "assets/asteroids/asteroid1.png", 72, 72);

            this.game.load.spritesheet("particles.impact", "assets/particles/debris.png", 42, 42);
        }

        create() {
            this.game.state.start(States.Testbed.Key);
        }
    }
}