/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.States {
    export class Boot extends Phaser.State {
        init() {
            this.game.stage.setBackgroundColor('#fff8dc');
        }
    }
}