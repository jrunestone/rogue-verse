/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Entities/Player"/>
/// <reference path="Pip"/>
/// <reference path="Meter"/>

namespace RogueVerse.Components {
    export class Hud {
        game: Phaser.Game;
        player: Entities.Player;
        debugText: Phaser.Text;

        fixedPip: Components.Pip;
        lagPip: Components.Pip;
        pipLine: Phaser.BitmapData;

        speedBar: Components.Meter;
        overheatBar: Components.Meter;
        healthBar: Components.Meter;

        constructor(game: Phaser.Game, player: Entities.Player) {
            this.game = game;
            this.player = player;

            // the fixed pip is indicating where the ship's cannons are pointing
            this.fixedPip = new Pip(this.game, "hud.pip", this.player.ship.kinematicAnchor, 8);
            this.fixedPip.alpha = 0.5;
            this.fixedPip.scale.set(0.8, 0.8);
            this.game.add.existing(this.fixedPip);
            (<RogueVerse.Game>this.game).uiLayer.add(this.fixedPip);

            // the lag pip is indicating where the projectile would hit were they fired right now
            // TODO: calibrate lag to projectile speed
            this.lagPip = new Pip(this.game, "hud.pip", this.player.ship.kinematicAnchor, 27);
            this.lagPip.alpha = 0.5;
            this.lagPip.scale.set(0.6, 0.6);
            this.lagPip.angle = 45;
            this.game.add.existing(this.lagPip);
            (<RogueVerse.Game>this.game).uiLayer.add(this.lagPip);

            // draw a line between the pips
            this.pipLine = this.game.add.bitmapData(this.game.width, this.game.height);
            this.pipLine.ctx.lineWidth = 1;
            this.pipLine.ctx.strokeStyle = "#ffffff";
            this.pipLine.ctx.setLineDash([2, 3]);

            var pipLineImg = this.pipLine.addToWorld();
            (<RogueVerse.Game>this.game).uiLayer.add(pipLineImg);

            pipLineImg.alpha = 0.1;
            pipLineImg.fixedToCamera = true;

            // status bars
            this.speedBar = new Components.Meter(this.game, 20, this.game.height - 70, 150, 5, 0xffffff);
            (<RogueVerse.Game>this.game).uiLayer.add(this.speedBar);

            this.overheatBar = new Components.Meter(this.game, 20, this.game.height - 60, 150, 5, 0xffffff);
            (<RogueVerse.Game>this.game).uiLayer.add(this.overheatBar);

            this.healthBar = new Components.Meter(this.game, 20, this.game.height - 50, 150, 5, 0xffffff);
            (<RogueVerse.Game>this.game).uiLayer.add(this.healthBar);

            // debug text
            this.debugText = this.game.add.text(20, 20, "", {
                font: "14px Arial",
                fill: "#ffffff"
            });

            (<RogueVerse.Game>this.game).uiLayer.add(this.debugText);
            this.debugText.fixedToCamera = true;
        }

        update() {
            /*var mode = "Mode: " + (this.player.ship.coupled ? "coupled" : "decoupled");
            var fuel = "Boost fuel: " + Math.round(this.player.ship.boostFuel) + "/" + this.player.ship.boostFuelCapacity;
            var boost = this.player.ship.boosting ? " BOOST" : "";*/

            // draw debug text
            this.debugText.setText(this.game.time.fps.toString());

            // draw status bars
            this.speedBar.progress = this.player.ship.getTotalSpeed() / this.player.ship.maxSpeed;
            this.speedBar.color = this.player.ship.boosting && this.player.ship.boostFuel > 0 ? 0xffcc00 : 0xffffff;

            var defaultMount = this.player.ship.mountPoints[0];
            this.overheatBar.progress = defaultMount.overheatTimer / defaultMount.cooldownTime;
            this.overheatBar.color = defaultMount.overheated ? 0xd9534f : 0xffffff;

            this.healthBar.progress = 1;

            // draw the lines between pips
            this.pipLine.clear();
            this.pipLine.ctx.beginPath();
            this.pipLine.ctx.moveTo(this.fixedPip.worldPosition.x, this.fixedPip.worldPosition.y);
            this.pipLine.ctx.lineTo(this.lagPip.worldPosition.x, this.lagPip.worldPosition.y);
            this.pipLine.ctx.stroke();
            this.pipLine.ctx.closePath();
        }
    }
}