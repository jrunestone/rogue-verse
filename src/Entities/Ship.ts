/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Entities {
    export class Ship extends Phaser.Sprite {
        thrust = 400;
        turnRate = 50;
        
        constructor(game: Phaser.Game, key: string) {
            super(game, game.world.centerX, game.world.centerY, key);
        }
        
        thrustForward() {
            this.body.thrust(this.thrust);
        }
        
        thrustReverse() {
            this.body.reverse(this.thrust);
        }
        
        yaw(angle: number) {
            this.body.rotateLeft(this.turnRate * angle);
        }
    }
}