/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Components {
    export class Meter extends Phaser.Group {
        bar: Phaser.Graphics;
        icon: Phaser.Sprite;

        barWidth: number;
        barHeight: number;
        color: number;
        progress: number;

        constructor(game: Phaser.Game, x: number, y: number, width: number, height: number, color: number = 0xffffff, iconKey: string = null, angle: number = -3.0) {
            super(game);

            this.barWidth = width;
            this.barHeight = height;
            this.color = color;
            this.angle = angle;
            this.x = x;
            this.y = y;

            this.bar = this.game.add.graphics(0, 0);
            this.add(this.bar);
            this.bar.fixedToCamera = true;

            if (iconKey) {
                this.icon = this.game.add.sprite(-25, -5, iconKey); // NOTE: hard-coded offsets on icon
                this.add(this.icon);
                this.icon.fixedToCamera = true;
            }
        }

        update() {
            this.bar.clear();

            // draw background (container) bar
            this.bar.beginFill(0xffffff, 0.1);
            this.bar.drawRect(0, 0, this.barWidth, this.barHeight);

            // draw bar progress value
            this.bar.beginFill(this.color, 1.0);
            this.bar.drawRect(0, 0, this.barWidth * this.progress, this.barHeight);

            super.update();
        }
    }
}