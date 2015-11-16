/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Weapons/Weapon"/>

namespace RogueVerse.Entities.Ships {
    export abstract class Ship extends Phaser.Sprite {
        name: string;
        
        thrustRating: number;
        thrustDamping:number;
        turnRate: number;
        brakeRate: number;
        maxSpeed: number;
        boostFactor: number;
        maxSpeedDamping: number;
        
        braking: boolean;
        boosting: boolean;
        coupled: boolean = true;
        
        mountPoints: Entities.Weapons.Weapon[] = [];
        weaponGroups: number[][] = [];
        
        constructor(game: Phaser.Game, name: string, key: string) {
            super(game, game.world.centerX, game.world.centerY, key);
            
            this.name = name;
            this.game.physics.p2.enable(this);
            this.anchor.set(0.5, 0.5);
        }
        
        addMountPoint(x: number, y: number, weapon: Entities.Weapons.Weapon) {
            weapon.body.x = x;
            weapon.body.y = y;
            
            this.mountPoints.push(weapon);
            this.addChild(weapon);
        }
        
        strafeForward() {
            this.strafe(this.body.angle, this.thrustRating);
        }
        
        strafeReverse() {
            this.strafe(this.body.angle, -this.thrustRating);
        }
        
        strafeLeft() {
            this.strafe(this.body.angle - 90, this.thrustRating);
        }
        
        strafeRight() {
            this.strafe(this.body.angle + 90, this.thrustRating);
        }
        
        strafe(angle: number, thrust: number) {
            var magnitude = this.game.physics.p2.pxmi(-thrust);
            
            // body.data.angle/force is in radians and aligned -90 by default so correct for this here
            var rads = Phaser.Math.degToRad(angle + 90); 

            this.body.data.force[0] += magnitude * Math.cos(rads);
            this.body.data.force[1] += magnitude * Math.sin(rads);
        }
        
        yaw(angle: number) {
            this.body.rotateLeft(this.turnRate * angle);
        }
        
        fire(group: number) {
            var index = group - 1;
            
            if (this.weaponGroups.length >= group) {
                var weaponGroup = this.weaponGroups[index];
                var mounts = this.mountPoints.filter((p, i) => weaponGroup.indexOf(i) != -1);
                
                mounts.forEach(mount => {
                    mount.fire();
                });
            }
        }
        
        getTotalSpeed() {
            return new Phaser.Point(this.body.velocity.x, this.body.velocity.y).getMagnitude();
        }
        
        update() {
            var maxSpeed = this.boosting ? (this.maxSpeed * this.boostFactor) : this.maxSpeed;
            
            if (this.braking) {
                this.body.damping = this.brakeRate;
            } else {
                if (this.getTotalSpeed() > maxSpeed) {
                    this.body.damping = this.maxSpeedDamping;
                } else {
                    this.body.damping = this.coupled ? this.thrustDamping : 0;
                }
            }
            
            // sprite children are not updated automatically
            this.children.forEach(child => {
                if (child instanceof Phaser.Sprite) {
                    (<Phaser.Sprite>child).update();
                }
            });
        }
    }
}