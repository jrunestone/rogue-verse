/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Entities/Player"/>
/// <reference path="./Pip"/>

namespace RogueVerse.Components {
    export class Hud {
        game: Phaser.Game;
        player: Entities.Player;
        text: Phaser.Text;

        fixedPip: Components.Pip;
        lagPip: Components.Pip;
        pipLine: Phaser.BitmapData;

        constructor(game: Phaser.Game, player: Entities.Player) {
            this.game = game;
            this.player = player;

            // the fixed pip is indicating where the ship's cannons are pointing
            this.fixedPip = new Pip(this.game, "hud.pip", this.player.ship.kinematicAnchor, 8);
            this.fixedPip.scale.set(0.8, 0.8);
            this.game.add.existing(this.fixedPip);

            // the lag pip is indicating where the projectile would hit were they fired right now
            // TODO: calibrate lag to projectile speed
            this.lagPip = new Pip(this.game, "hud.pip", this.player.ship.kinematicAnchor, 27);
            this.lagPip.scale.set(0.6, 0.6);
            this.lagPip.angle = 45;
            this.game.add.existing(this.lagPip);

            this.pipLine = this.game.add.bitmapData(this.game.width, this.game.height);
            this.pipLine.ctx.lineWidth = "1";
            this.pipLine.ctx.strokeStyle = "#ffffff";
            this.pipLine.ctx.setLineDash([2, 3]);
            this.pipLine.fixedToCamera = true;
            this.pipLine.addToWorld().fixedToCamera = true;

            this.text = this.game.add.text(20, 20, "", {
                font: "16px Arial",
                fill: "#ffffff"
            });

            this.text.fixedToCamera = true;
        }

        update() {
            var fps = this.game.time.fps.toString();
            var speed = "Speed: " + Math.round(this.player.ship.getTotalSpeed());
            var mode = "Mode: " + (this.player.ship.coupled ? "coupled" : "decoupled");
            var pos = "Position: " + Math.round(this.player.ship.x) + ", " + Math.round(this.player.ship.y);
            var fuel = "Boost fuel: " + Math.round(this.player.ship.boostFuel) + "/" + this.player.ship.boostFuelCapacity;
            var boost = this.player.ship.boosting ? " BOOST" : "";

            var weapons: string[] = this.player.ship.mountPoints.map(mount => {
                return mount.name + ": " + Math.round(mount.overheatTimer) + "/" + mount.cooldownTime + (mount.overheated ? " OVERHEATED" : "");
            });

            this.text.setText(fps + "\n\n" + pos + "\n" + speed + "\n" + mode + "\n" + fuel + boost + "\n" + weapons.join("\n"));

            this.pipLine.clear();
            this.pipLine.ctx.beginPath();
            this.pipLine.ctx.moveTo(this.fixedPip.worldPosition.x, this.fixedPip.worldPosition.y);
            this.pipLine.ctx.lineTo(this.lagPip.worldPosition.x, this.lagPip.worldPosition.y);
            this.pipLine.ctx.stroke();
            this.pipLine.ctx.closePath();
        }
    }
}