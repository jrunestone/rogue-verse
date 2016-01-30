/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Components {
    export class Meter extends Phaser.Graphics {
        color: number;
        progress: number;
        barWidth: number;
        barHeight: number;

        constructor(game: Phaser.Game, x: number, y: number, width: number, height: number, color: number = 0xffffff, angle: number = -3.0) {
            super(game, x, y);

            this.barWidth = width;
            this.barHeight = height;
            this.color = color;
            this.angle = angle;

            this.fixedToCamera = true;
        }

        update() {
            this.clear();

            // draw background (container) bar
            this.beginFill(0xffffff, 0.1);
            this.drawRect(0, 0, this.barWidth, this.barHeight);

            // draw bar progress value
            this.beginFill(this.color, 1.0);
            this.drawRect(0, 0, this.barWidth * this.progress, this.barHeight);

            super.update();
        }
    }
}