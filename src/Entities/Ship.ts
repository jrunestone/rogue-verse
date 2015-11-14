/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Entities {
    export class Ship extends Phaser.Sprite {
        Thrust: number = 400;
        ThrustDamping:number = 0.4;
        TurnRate: number = 50;
        BrakeRate: number = 0.9;
        
        braking: boolean = false;
        coupled: boolean = true;
        
        constructor(game: Phaser.Game, key: string) {
            super(game, game.world.centerX, game.world.centerY, key);
        }
        
        strafeForward() {
            this.body.thrust(this.Thrust);
        }
        
        strafeReverse() {
            this.body.reverse(this.Thrust);
        }
        
        yaw(angle: number) {
            this.body.rotateLeft(this.TurnRate * angle);
        }
        
        update() {
            if (this.braking) {
                this.body.damping = this.BrakeRate;
            } else {
                this.body.damping = this.coupled ? this.ThrustDamping : 0;
            }
        }
    }
}