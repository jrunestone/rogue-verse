/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Entities/Player"/>

namespace RogueVerse.Components {
    export class Hud {
        game: Phaser.Game;
        player: Entities.Player;
        text: Phaser.Text;

        constructor(game: Phaser.Game, player: Entities.Player) {
            this.player = player;
            this.game = game;
            
            this.text = this.game.add.text(20, 20, "", {
                font: "16px Arial"
            });
        }

        update() {
            var speed = "Speed: " + Math.round(this.player.ship.body.velocity.x) + ", " + Math.round(this.player.ship.body.velocity.y);
            var mode = "Mode: " + (this.player.ship.coupled ? "coupled" : "decoupled");
            
            this.text.setText(speed + "\n" + mode);
        }
    }
}