/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Ship"/>

namespace RogueVerse.Entities {
    export class Player {
        game: Phaser.Game;
        ship: Entities.Ship;
        controls: { forward: Phaser.Key, reverse: Phaser.Key, left: Phaser.Key, right: Phaser.Key };

        constructor(game: Phaser.Game, ship: Entities.Ship) {
            this.ship = ship;
            this.game = game;

            this.game.add.existing(this.ship);
            this.game.physics.p2.enable(this.ship);

            this.controls = this.game.input.keyboard.addKeys({ 'forward': Phaser.KeyCode.W, 'reverse': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D });
        }

        update() {
            if (this.controls.forward.isDown) {
                this.ship.thrustForward();
            } else if (this.controls.reverse.isDown) {
                this.ship.thrustReverse();
            }

            this.ship.yaw(this.getRotationToPointer());
        }
        
        private getRotationToPointer() {
            var angleToPointer = Phaser.Math.angleBetween(this.ship.x, this.ship.y, this.game.input.activePointer.x, this.game.input.activePointer.y);
            var deltaMouseRad = this.ship.rotation - angleToPointer - Math.PI / 2;
  
            var mod = Math.PI * 2;
            deltaMouseRad = deltaMouseRad % mod; 
  
            if (deltaMouseRad != deltaMouseRad % (mod / 2)) {
                deltaMouseRad = (deltaMouseRad < 0) ? deltaMouseRad + mod : deltaMouseRad - mod;
            }
            
            return deltaMouseRad;
        }
    }
}