/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Ship"/>

namespace RogueVerse.Entities {
    export class Player {
        game: Phaser.Game;
        ship: Entities.Ship;
        cursors: Phaser.CursorKeys;
        
        constructor(game: Phaser.Game, ship: Entities.Ship) {
            this.ship = ship;
            this.game = game;
            
            this.game.add.existing(this.ship);
            this.game.physics.p2.enable(this.ship);
            
            this.cursors = this.game.input.keyboard.createCursorKeys();
        }
        
        update() {
            if (this.cursors.up.isDown) {
                this.ship.body.thrust(400);
            } else if (this.cursors.down.isDown) {
                this.ship.body.reverse(400);
            }
        }
    }
}