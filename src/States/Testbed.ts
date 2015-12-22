/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Entities/Player"/>
/// <reference path="../Entities/Ships/Ship"/>
/// <reference path="../Entities/Ships/Avenger"/>
/// <reference path="../Entities/Debris/Asteroid"/>
/// <reference path="../Components/Hud"/>
/// <reference path="../Components/Light"/>

namespace RogueVerse.States {
    export class Testbed extends Phaser.State {
        static Key = "testbed";

        player: Entities.Player;
        hud: Components.Hud;
        starField: Phaser.TileSprite;
        nebulaField: Phaser.TileSprite;
        asteroids: Phaser.Group;

        lights: Phaser.Group;
        lightmap: Phaser.RenderTexture;

        create() {
            this.starField = game.add.tileSprite(0, 0, 2000, 2000, "bg.starfield");
            this.starField.autoScroll(5, 0);

            this.nebulaField = game.add.tileSprite(0, 0, 2000, 2000, "bg.nebulafield");
            this.nebulaField.alpha = 0.3;
            this.nebulaField.autoScroll(-5, 0);

            this.asteroids = this.game.add.group();
            this.asteroids.classType = Entities.Debris.Asteroid;
            this.asteroids.createMultiple(10, "asteroids.1", null, true);

            var ship = new Entities.Ships.Avenger(this.game);

            ship.x = this.game.world.centerX;
            ship.y = this.game.world.centerY;

            this.player = new Entities.Player(this.game, ship);
            this.hud = new Components.Hud(this.game, this.player);

            this.lights = this.game.make.group(null, null, false);
            this.createLightmap();

            (<RogueVerse.Game>this.game).addLights.dispatch(this.lights);
            (<RogueVerse.Game>this.game).addCollisions.dispatch();
        }

        createLightmap() {
            this.lightmap = this.game.add.renderTexture(this.game.width, this.game.height);

            var uniforms = {
                uLightmap: { type: "sampler2D", value: this.lightmap },
                ambientColor: { type: "4fv", value: [1, 1, 1, 0.2]}
            };

            var filter = new Phaser.Filter(this.game, uniforms, this.game.cache.getShader("shaders.lightmap"));
            filter.setResolution(this.game.width, this.game.height);
            this.game.stage.filters = [filter];
        }

        update() {
            this.player.update();
            this.hud.update();

            if (this.player.ship.getTotalSpeed() > 0) {
                this.nebulaField.tilePosition.x -= this.player.ship.body.velocity.x * 0.001;
                this.nebulaField.tilePosition.y -= this.player.ship.body.velocity.y * 0.001;
                this.starField.tilePosition.x -= this.player.ship.body.velocity.x * 0.01;
                this.starField.tilePosition.y -= this.player.ship.body.velocity.y * 0.01;
            }

            this.lightmap.clear();
            this.lights.forEach((light: Components.Light) => { light.update(); this.lightmap.renderXY(light, light.x, this.game.height - light.y); });
        }
    }
}