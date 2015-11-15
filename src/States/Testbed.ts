/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Entities/Player"/>
/// <reference path="../Entities/Ship"/>
/// <reference path="../Components/Hud"/>

namespace RogueVerse.States {
    export class Testbed extends Phaser.State {
        static Key = "testbed";
        
        player: Entities.Player;
        hud: Components.Hud;
        // lights: Phaser.Filter;
        
        create() {
            var starField = game.add.tileSprite(0, 0, 2000, 2000, "starfield");
            var nebulaField = game.add.tileSprite(0, 0, 2000, 2000, "nebulafield");
            nebulaField.alpha = 0.3;
            
            var ship = new Entities.Ship(this.game, "ship1");
            
            ship.x = this.game.world.centerX;
            ship.y = this.game.world.centerY;
            
            this.player = new Entities.Player(this.game, ship);
            this.hud = new Components.Hud(this.game, this.player);
            
            // this.lights = new Phaser.Filter(this.game, null, this.game.cache.getShader("lights"));
            // this.lights.addToWorld(0, 0, 1280, 960);
        }
        
        update() {
            this.player.update();
            this.hud.update();
            // this.lights.update();
        }
    }
}