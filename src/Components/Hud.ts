/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Entities/Player"/>

namespace RogueVerse.Components {
    export class Hud {
        game: Phaser.Game;
        player: Entities.Player;
        text: Phaser.Text;

        constructor(game: Phaser.Game, player: Entities.Player) {
            this.game = game;
            this.player = player;
            this.game.time.advancedTiming = true;
            
            this.text = this.game.add.text(20, 20, "", {
                font: "16px Arial",
                fill: "#ffffff"
            });
            
            this.text.fixedToCamera = true;
        }

        update() {
            var fps = this.game.time.fps.toString();
            var angle = "Angle: " + Math.round(this.player.ship.body.angle);
            var speed = "Speed: " + Math.round(this.player.ship.getTotalSpeed());
            var mode = "Mode: " + (this.player.ship.coupled ? "coupled" : "decoupled");
            var pos = "Position: " + Math.round(this.player.ship.x) + ", " + Math.round(this.player.ship.y);
            var fuel = "Boost fuel: " + Math.round(this.player.ship.boostFuel) + "/" + this.player.ship.boostFuelCapacity;
            var boost = this.player.ship.boosting ? " BOOST" : "";
            
            var weapons: string[] = this.player.ship.mountPoints.map(mount => {
                return mount.name + ": " + Math.round(mount.overheatTimer) + "/" + mount.cooldownTime + (mount.overheated ? " OVERHEATED" : "");
            });
            
            this.text.setText(fps + "\n" + angle + "\n" + speed + "\n" + pos + "\n" + mode + "\n" + fuel + boost + "\n" + weapons.join("\n"));
        }
    }
}