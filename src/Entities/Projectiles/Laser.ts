/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Projectile"/>
/// <reference path="../../Components/Light"/>

namespace RogueVerse.Entities.Projectiles {
    export class Laser extends Entities.Projectiles.Projectile {
        damageRating: number = 100;
        speed: number = 900;
        timeToLive: number = 2000;

        light: Components.Light;

        constructor(game: Phaser.Game, x: number, y: number, key: string, frame?: number|string) {
            super(game, x, y, "projectiles.laser", frame);
            (<RogueVerse.Game>this.game).addLights.add((lights: Phaser.Group) => this.addLights(lights));
        }

        addLights(lights: Phaser.Group) {
            this.light = new Components.Light(this.game, "lights.point");

            this.light.visible = false;
            this.light.anchor.set(0.5, 0.4);
            this.light.scale.set(0.3, 1);
            this.light.tint = 0x00ff00;
            this.light.alpha = 0.9;

            this.light.updateScreenPosition.add(() => {
                this.light.x = this.worldPosition.x;
                this.light.y = this.worldPosition.y;
                this.light.angle = -this.angle;
                this.light.visible = this.alive;
            });

            lights.add(this.light);
        }
    }
}