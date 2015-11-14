/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="States/Boot"/>
/// <reference path="States/Preload"/>
/// <reference path="States/Testbed"/>

namespace RogueVerse {
    export class Game extends Phaser.Game {
        constructor() {
            super("100", "100", Phaser.AUTO);

            this.state.add(States.Boot.Key, States.Boot);
            this.state.add(States.Preload.Key, States.Preload);
            this.state.add(States.Testbed.Key, States.Testbed);
            
            this.state.start(States.Boot.Key);
        }
    }
}