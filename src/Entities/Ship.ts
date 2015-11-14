/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

namespace RogueVerse.Entities {
    export class Ship extends Phaser.Sprite {
        Thrust: number = 400;
        ThrustDamping:number = 0.4;
        TurnRate: number = 50;
        BrakeRate: number = 0.9;
        MaxSpeed: number = 200;
        MaxSpeedDamping: number = 0.1;
        
        braking: boolean = false;
        coupled: boolean = true;
        
        constructor(game: Phaser.Game, key: string) {
            super(game, game.world.centerX, game.world.centerY, key);
        }
        
        strafeForward() {
            if (this.getTotalSpeed() < this.MaxSpeed) {
                this.strafe(this.body.angle, this.Thrust);
            }
        }
        
        strafeReverse() {
            if (this.getTotalSpeed() < this.MaxSpeed) {
                this.strafe(this.body.angle, -this.Thrust);
            }
        }
        
        strafeLeft() {
            if (this.getTotalSpeed() < this.MaxSpeed) {
                this.strafe(this.body.angle - 90, this.Thrust);
            }
        }
        
        strafeRight() {
            if (this.getTotalSpeed() < this.MaxSpeed) {
                this.strafe(this.body.angle + 90, this.Thrust);
            }
        }
        
        strafe(angle: number, thrust: number) {
            var magnitude = this.game.physics.p2.pxmi(-thrust);
            
            // body.data.angle/force is in radians and aligned -90 by default so correct for this here
            var rads = Phaser.Math.degToRad(angle + 90); 

            this.body.data.force[0] += magnitude * Math.cos(rads);
            this.body.data.force[1] += magnitude * Math.sin(rads);
        }
        
        yaw(angle: number) {
            this.body.rotateLeft(this.TurnRate * angle);
        }
        
        getTotalSpeed() {
            return new Phaser.Point(this.body.velocity.x, this.body.velocity.y).getMagnitude();
        }
        
        update() {
            if (this.braking) {
                this.body.damping = this.BrakeRate;
            } else {
                if (this.getTotalSpeed() > this.MaxSpeed) {
                    this.body.damping = this.MaxSpeedDamping;
                } else {
                    this.body.damping = this.coupled ? this.ThrustDamping : 0;
                }
            }
        }
    }
}