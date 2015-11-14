/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Entities/Player"/>
/// <reference path="../Entities/Ship"/>

namespace RogueVerse.States {
    export class Testbed extends Phaser.State {
        static Key = 'testbed';
        
        player: Entities.Player;
        
        create() {
            var ship = new Entities.Ship(this.game, 'ship1');
            this.player = new Entities.Player(this.game, ship);
        }
        
        update() {
            this.player.update();
        }
    }
}