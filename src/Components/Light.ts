/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Components {
    export class Light extends Phaser.Sprite {
        updateScreenPosition: Phaser.Signal = new Phaser.Signal();

        constructor(game: Phaser.Game, key: string) {
            super(game, 0, 0, key);
        }

        update() {
            this.updateScreenPosition.dispatch();
        }
    }
}