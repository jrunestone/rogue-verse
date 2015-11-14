/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="States/Boot"/>

namespace RogueVerse {
    export class Game extends Phaser.Game {
        constructor() {
            super('100', '100', Phaser.AUTO);

            this.state.add('Boot', RogueVerse.States.Boot);
            this.state.start('Boot');
        }
    }
}