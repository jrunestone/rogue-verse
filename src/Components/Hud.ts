/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Entities/Player"/>

namespace RogueVerse.Components {
    export class Hud {
        game: Phaser.Game;
        player: Entities.Player;
        text: Phaser.Text;

        constructor(player: Entities.Player, game: Phaser.Game) {
            this.player = player;
            this.game = game;
            
            this.text = this.game.add.text(20, 20, "", {
                font: "16px Arial",
                fill: "#ffffff"
            });
            
            this.text.fixedToCamera = true;
        }

        update() {
            var angle = "Angle: " + Math.round(this.player.ship.body.angle);
            var speed = "Speed: " + Math.round(this.player.ship.getTotalSpeed());
            var mode = "Mode: " + (this.player.ship.coupled ? "coupled" : "decoupled");
            var pos = "Position: " + Math.round(this.player.ship.x) + ", " + Math.round(this.player.ship.y);
            
            this.text.setText(angle + "\n" + speed + "\n" + pos + "\n" + mode);
        }
    }
}