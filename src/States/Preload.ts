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

            this.game.load.spritesheet("lights.point", "assets/lights/point.png", 128, 128);
            this.game.load.spritesheet("lights.spot", "assets/lights/spot.png", 193, 66);
            this.game.load.image("lights.laser", "assets/lights/laser.png");

            this.game.load.spritesheet("particles.impact", "assets/particles/debris.png", 42, 42);

            this.game.load.shader("shaders.lightmap", "assets/shaders/lightmap.frag");
        }

        create() {
            this.game.state.start(States.Testbed.Key);
        }
    }
}