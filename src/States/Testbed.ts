/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Entities/Player"/>
/// <reference path="../Entities/Ship"/>
/// <reference path="../Components/Hud"/>

namespace RogueVerse.States {
    export class Testbed extends Phaser.State {
        static Key = "testbed";
        
        player: Entities.Player;
        hud: Components.Hud;
        
        starField: Phaser.TileSprite;
        nebulaField: Phaser.TileSprite;
        // lights: Phaser.Filter;
        
        create() {
            this.starField = game.add.tileSprite(0, 0, 2000, 2000, "starfield");
            this.nebulaField = game.add.tileSprite(0, 0, 2000, 2000, "nebulafield");
            this.nebulaField.alpha = 0.3;
            
            var ship = new Entities.Ship(this.game, "ship1");
            
            ship.x = this.game.world.centerX;
            ship.y = this.game.world.centerY;
            
            this.player = new Entities.Player(this.game, ship);
            this.hud = new Components.Hud(this.game, this.player);
            
            // this.lights = new Phaser.Filter(this.game, null, this.game.cache.getShader("lights"));
            // this.lights.addToWorld(0, 0, 1280, 960);
            
            this.starField.autoScroll(5, 0);
            this.nebulaField.autoScroll(-5, 0);
        }
        
        update() {
            this.player.update();
            this.hud.update();
            // this.lights.update();
            
            if (this.player.ship.getTotalSpeed() > 0) {
                this.nebulaField.tilePosition.x -= this.player.ship.body.velocity.x * 0.001;
                this.nebulaField.tilePosition.y -= this.player.ship.body.velocity.y * 0.001;
                this.starField.tilePosition.x -= this.player.ship.body.velocity.x * 0.01;
                this.starField.tilePosition.y -= this.player.ship.body.velocity.y * 0.01;
            }
        }
    }
}