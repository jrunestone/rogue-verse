/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../../Components/MountPoint"/>

namespace RogueVerse.Entities.Ships {
    export class Ship extends Phaser.Sprite {
        Thrust: number = 400;
        ThrustDamping:number = 0.4;
        TurnRate: number = 50;
        BrakeRate: number = 0.9;
        MaxSpeed: number = 200;
        MaxSpeedDamping: number = 0.9;
        
        braking: boolean = false;
        coupled: boolean = true;
        
        protected mountPoints: Components.MountPoint[] = [];
        protected weaponGroups: string[][];
        
        constructor(game: Phaser.Game, key: string) {
            super(game, game.world.centerX, game.world.centerY, key);
        }
        
        strafeForward() {
            this.strafe(this.body.angle, this.Thrust);
        }
        
        strafeReverse() {
            this.strafe(this.body.angle, -this.Thrust);
        }
        
        strafeLeft() {
            this.strafe(this.body.angle - 90, this.Thrust);
        }
        
        strafeRight() {
            this.strafe(this.body.angle + 90, this.Thrust);
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
        
        fire(group: number) {
            var index = group - 1;
            
            if (this.weaponGroups.length >= group) {
                var weaponGroup = this.weaponGroups[index];
                var mounts = this.mountPoints.filter(p => weaponGroup.indexOf(p.name) != -1);
                
                mounts.forEach((mount, i) => {
                    console.log("fire mount", i, "weapon", mount.weapon);
                });
            }
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