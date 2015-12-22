/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Components {
    export class Light extends Phaser.Sprite {
        updateScreenPosition: Phaser.Signal = new Phaser.Signal();

        constructor(game: Phaser.Game, key = "particles.light") {
            super(game, 0, 0, key);
            this.anchor.set(0.5, 0.5);
        }

        update() {
            this.updateScreenPosition.dispatch();
        }
    }
}