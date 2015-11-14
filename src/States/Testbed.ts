/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Entities/Player"/>
/// <reference path="../Entities/Ship"/>
/// <reference path="../Components/Hud"/>

namespace RogueVerse.States {
    export class Testbed extends Phaser.State {
        static Key = "testbed";
        
        player: Entities.Player;
        hud: Components.Hud;
        
        create() {
            var starfield = game.add.tileSprite(0, 0, 2000, 2000, 'starfield');
            
            var ship = new Entities.Ship(this.game, "ship1");
            this.player = new Entities.Player(this.game, ship);
            this.hud = new Components.Hud(this.game, this.player);
        }
        
        update() {
            this.player.update();
            this.hud.update();
        }
    }
}