/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RogueVerse;
(function (RogueVerse) {
    var States;
    (function (States) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.init = function () {
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
                this.game.time.advancedTiming = true;
                this.game.stage.setBackgroundColor("#000000");
                this.game.world.setBounds(0, 0, 2000, 2000);
                this.game.physics.startSystem(Phaser.Physics.P2JS);
                this.game.physics.p2.setImpactEvents(true);
                this.game.physics.p2.restitution = 0.7;
            };
            Boot.prototype.create = function () {
                this.game.state.start(States.Preload.Key);
            };
            Boot.Key = "boot";
            return Boot;
        })(Phaser.State);
        States.Boot = Boot;
    })(States = RogueVerse.States || (RogueVerse.States = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
var RogueVerse;
(function (RogueVerse) {
    var States;
    (function (States) {
        var Preload = (function (_super) {
            __extends(Preload, _super);
            function Preload() {
                _super.apply(this, arguments);
            }
            Preload.prototype.preload = function () {
                this.game.load.image("bg.starfield", "assets/bg/starfield.jpg");
                this.game.load.image("bg.nebulafield", "assets/bg/nebula.jpg");
                this.game.load.image("ships.avenger", "assets/ships/avenger.png");
                this.game.load.image("weapons.badger", "assets/weapons/badger.png");
                this.game.load.image("projectiles.laser", "assets/projectiles/laser.png");
                this.game.load.spritesheet("asteroids.1", "assets/asteroids/asteroid1.png", 72, 72);
                this.game.load.image("hud.pip", "assets/hud/pip.png");
                this.game.load.image("hud.pulse", "assets/hud/pulse.png");
                this.game.load.image("hud.ammo", "assets/hud/ammo.png");
                this.game.load.image("hud.energy", "assets/hud/energy.png");
                this.game.load.spritesheet("lights.point", "assets/lights/point.png", 128, 128);
                this.game.load.spritesheet("lights.spot", "assets/lights/spot.png", 193, 66);
                this.game.load.image("lights.laser", "assets/lights/laser.png");
                this.game.load.spritesheet("particles.impact", "assets/particles/debris.png", 42, 42);
                this.game.load.shader("shaders.lightmap", "assets/shaders/lightmap.frag");
            };
            Preload.prototype.create = function () {
                this.game.state.start(States.Testbed.Key);
            };
            Preload.Key = "preload";
            return Preload;
        })(Phaser.State);
        States.Preload = Preload;
    })(States = RogueVerse.States || (RogueVerse.States = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
var RogueVerse;
(function (RogueVerse) {
    var Components;
    (function (Components) {
        var Light = (function (_super) {
            __extends(Light, _super);
            function Light(game, key) {
                _super.call(this, game, 0, 0, key);
                this.updateScreenPosition = new Phaser.Signal();
            }
            Light.prototype.update = function () {
                this.updateScreenPosition.dispatch();
            };
            return Light;
        })(Phaser.Sprite);
        Components.Light = Light;
    })(Components = RogueVerse.Components || (RogueVerse.Components = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Ships/Ship"/>
/// <reference path="../Projectiles/Projectile"/>
var RogueVerse;
(function (RogueVerse) {
    var Entities;
    (function (Entities) {
        var Debris;
        (function (Debris) {
            var Asteroid = (function (_super) {
                __extends(Asteroid, _super);
                function Asteroid(game, x, y, key, frame) {
                    var _this = this;
                    _super.call(this, game, x, y, key, frame);
                    if (!Asteroid.collisionGroup) {
                        Asteroid.collisionGroup = this.game.physics.p2.createCollisionGroup();
                    }
                    var scale = this.game.rnd.realInRange(0.2, 1.2);
                    this.scale.setTo(scale);
                    this.game.physics.p2.enable(this);
                    this.body.setCircle(this.width / 2);
                    this.body.setCollisionGroup(Asteroid.collisionGroup);
                    this.checkWorldBounds = false;
                    this.outOfBoundsKill = false;
                    this.body.collideWorldBounds = false;
                    this.body.x = this.game.world.randomX;
                    this.body.y = this.game.world.randomY;
                    this.body.mass = 5 + scale;
                    this.body.angularVelocity = this.game.rnd.realInRange(-1, 1);
                    this.body.velocity.x = this.game.rnd.realInRange(-100, 250);
                    this.body.velocity.y = this.game.rnd.realInRange(-100, 250);
                    this.body.damping = 0;
                    this.body.angularDamping = 0;
                    this.game.addCollisions.add(function () { return _this.addCollisions(); });
                }
                Asteroid.prototype.addCollisions = function () {
                    this.body.collides([Asteroid.collisionGroup, Entities.Ships.Ship.collisionGroup, Entities.Projectiles.Projectile.collisionGroup]);
                };
                Asteroid.prototype.update = function () {
                    this.game.world.wrap(this.body);
                };
                return Asteroid;
            })(Phaser.Sprite);
            Debris.Asteroid = Asteroid;
        })(Debris = Entities.Debris || (Entities.Debris = {}));
    })(Entities = RogueVerse.Entities || (RogueVerse.Entities = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Debris/Asteroid"/>
/// <reference path="../Ships/Ship"/>
var RogueVerse;
(function (RogueVerse) {
    var Entities;
    (function (Entities) {
        var Projectiles;
        (function (Projectiles) {
            var Projectile = (function (_super) {
                __extends(Projectile, _super);
                function Projectile(game, x, y, key, frame) {
                    var _this = this;
                    _super.call(this, game, x, y, key, frame);
                    if (!Projectile.collisionGroup) {
                        Projectile.collisionGroup = this.game.physics.p2.createCollisionGroup();
                    }
                    this.game.physics.p2.enable(this);
                    this.body.setCollisionGroup(Projectile.collisionGroup);
                    this.body.data.shapes[0].sensor = true;
                    this.checkWorldBounds = true;
                    this.outOfBoundsKill = true;
                    this.body.collideWorldBounds = false;
                    this.impactEmitter = this.game.add.emitter(0, 0, 100);
                    this.impactEmitter.makeParticles("particles.impact", [0, 1, 2, 3, 4, 5, 6, 7, 8], 9, true);
                    this.impactEmitter.gravity = 0;
                    this.impactEmitter.minParticleScale = 0.1;
                    this.impactEmitter.maxParticleScale = 0.1;
                    this.game.addCollisions.add(function () { return _this.addCollisions(); });
                }
                Projectile.prototype.addCollisions = function () {
                    this.body.collides(Entities.Debris.Asteroid.collisionGroup);
                    this.body.onBeginContact.add(this.collide, this);
                };
                Projectile.prototype.collide = function (body1, body2, shape1, shape2, contactEquation) {
                    var impactAngle = this.game.physics.arcade.angleBetween(body1, this);
                    this.impactEmitter.position.x = this.x - this.width * 1.5 * Math.cos(impactAngle);
                    this.impactEmitter.position.y = this.y - this.height * 1.5 * Math.sin(impactAngle);
                    this.impactEmitter.explode(200, 4);
                    this.kill();
                };
                Projectile.prototype.kill = function () {
                    this.x = this.parent.x;
                    this.y = this.parent.y;
                    this.worldPosition.x = this.parent.worldPosition.x;
                    this.worldPosition.y = this.parent.worldPosition.y;
                    return _super.prototype.kill.call(this);
                };
                return Projectile;
            })(Phaser.Sprite);
            Projectiles.Projectile = Projectile;
        })(Projectiles = Entities.Projectiles || (Entities.Projectiles = {}));
    })(Entities = RogueVerse.Entities || (RogueVerse.Entities = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Projectiles/Projectile"/>
var RogueVerse;
(function (RogueVerse) {
    var Entities;
    (function (Entities) {
        var Weapons;
        (function (Weapons) {
            var Weapon = (function (_super) {
                __extends(Weapon, _super);
                function Weapon(game, name, weaponKey, projectileType) {
                    _super.call(this, game, 0, 0, weaponKey);
                    this.overheatTimer = 0;
                    this.name = name;
                    this.game.physics.p2.enable(this);
                    this.body.static = true;
                    this.projectiles = this.game.add.group();
                    this.projectiles.classType = projectileType;
                    this.projectiles.createMultiple(20, null);
                    this.game.worldLayer.add(this.projectiles);
                }
                Weapon.prototype.fire = function () {
                    if (this.overheated || this.game.time.elapsedSince(this.lastFireTime) < 1000 / this.firingRate) {
                        return;
                    }
                    var projectile = this.projectiles.getFirstExists(false);
                    if (projectile) {
                        projectile.reset(this.parent.x, this.parent.y);
                        projectile.lifespan = projectile.timeToLive;
                        projectile.scale.setTo(0.5, 0.5);
                        projectile.pivot.set(-this.x * 2, 10);
                        projectile.body.angle = this.parent.body.angle;
                        var velocity = this.game.physics.arcade.velocityFromAngle(projectile.body.angle - 90, projectile.speed);
                        projectile.body.velocity.x = velocity.x;
                        projectile.body.velocity.y = velocity.y;
                    }
                    this.overheatTimer = Math.min(this.cooldownTime, this.overheatTimer + this.overheatFactor * this.cooldownTime);
                    this.lastFireTime = game.time.time;
                };
                Weapon.prototype.update = function () {
                    if (this.overheatTimer >= this.cooldownTime) {
                        this.overheated = true;
                    }
                    if (this.overheatTimer > 0) {
                        this.overheatTimer = Math.max(0, this.overheatTimer - game.time.physicsElapsedMS);
                    }
                    else {
                        this.overheated = false;
                    }
                };
                return Weapon;
            })(Phaser.Sprite);
            Weapons.Weapon = Weapon;
        })(Weapons = Entities.Weapons || (Entities.Weapons = {}));
    })(Entities = RogueVerse.Entities || (RogueVerse.Entities = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../../Components/Light"/>
/// <reference path="../Weapons/Weapon"/>
/// <reference path="../Debris/Asteroid"/>
var RogueVerse;
(function (RogueVerse) {
    var Entities;
    (function (Entities) {
        var Ships;
        (function (Ships) {
            var Ship = (function (_super) {
                __extends(Ship, _super);
                function Ship(game, name, key) {
                    var _this = this;
                    _super.call(this, game, game.world.centerX, game.world.centerY, key);
                    this.coupled = true;
                    this.mountPoints = [];
                    this.weaponGroups = [];
                    if (!Ship.collisionGroup) {
                        Ship.collisionGroup = this.game.physics.p2.createCollisionGroup();
                    }
                    this.name = name;
                    this.anchor.set(0.5, 0.5);
                    this.game.physics.p2.enable(this);
                    this.body.setCircle(this.width / 2);
                    this.body.setCollisionGroup(Ship.collisionGroup);
                    this.body.collideWorldBounds = false;
                    this.checkWorldBounds = false;
                    this.kinematicAnchor = new Phaser.Sprite(this.game, this.x, this.y);
                    this.game.physics.p2.enable(this.kinematicAnchor);
                    this.kinematicAnchor.body.static = true;
                    this.game.addCollisions.add(function () { return _this.addCollisions(); });
                    this.game.addLights.add(function (lights) { return _this.addLights(lights); });
                }
                Ship.prototype.addCollisions = function () {
                    this.body.collides(Entities.Debris.Asteroid.collisionGroup);
                };
                Ship.prototype.addLights = function (lights) {
                    var _this = this;
                    var headlight = new RogueVerse.Components.Light(this.game, "lights.spot");
                    headlight.anchor.set(0.85, 0.55);
                    headlight.scale.set(2, 2);
                    headlight.updateScreenPosition.add(function () {
                        headlight.x = _this.worldPosition.x;
                        headlight.y = _this.worldPosition.y;
                        headlight.angle = -_this.angle - 90;
                    });
                    lights.add(headlight);
                };
                Ship.prototype.addMountPoint = function (x, y, weapon) {
                    weapon.body.x = x;
                    weapon.body.y = y;
                    this.mountPoints.push(weapon);
                    this.addChild(weapon);
                };
                Ship.prototype.strafeForward = function () {
                    this.strafe(this.body.angle, this.thrustRating);
                };
                Ship.prototype.strafeReverse = function () {
                    this.strafe(this.body.angle, -this.thrustRating);
                };
                Ship.prototype.strafeLeft = function () {
                    this.strafe(this.body.angle - 90, this.thrustRating);
                };
                Ship.prototype.strafeRight = function () {
                    this.strafe(this.body.angle + 90, this.thrustRating);
                };
                Ship.prototype.strafe = function (angle, thrust) {
                    if (this.boosting && this.boostFuel > 0) {
                        thrust *= this.boostFactor;
                    }
                    var magnitude = this.game.physics.p2.pxmi(-thrust);
                    var rads = Phaser.Math.degToRad(angle + 90);
                    this.body.data.force[0] += magnitude * Math.cos(rads);
                    this.body.data.force[1] += magnitude * Math.sin(rads);
                };
                Ship.prototype.yaw = function (angle) {
                    this.body.rotateLeft(this.turnRate * angle);
                };
                Ship.prototype.fire = function (group) {
                    var index = group - 1;
                    if (this.weaponGroups.length >= group) {
                        var weaponGroup = this.weaponGroups[index];
                        var mounts = this.mountPoints.filter(function (p, i) { return weaponGroup.indexOf(i) != -1; });
                        mounts.forEach(function (mount) {
                            mount.fire();
                        });
                    }
                };
                Ship.prototype.getTotalSpeed = function () {
                    return new Phaser.Point(this.body.velocity.x, this.body.velocity.y).getMagnitude();
                };
                Ship.prototype.update = function () {
                    var maxSpeed = this.maxSpeed;
                    var brakeRate = this.brakeRate;
                    if (this.boosting && this.boostFuel > 0) {
                        maxSpeed = this.maxSpeed * this.boostFactor;
                        brakeRate = this.boostBrakeRate;
                        this.boostFuel = Math.max(0, this.boostFuel - game.time.physicsElapsedMS);
                    }
                    else if (!this.boosting) {
                        this.boostFuel = Math.min(this.boostFuelCapacity, this.boostFuel + game.time.physicsElapsedMS / 2);
                    }
                    if (this.braking) {
                        this.body.damping = brakeRate;
                    }
                    else {
                        if (this.getTotalSpeed() > maxSpeed) {
                            this.body.damping = this.maxSpeedDamping;
                        }
                        else {
                            this.body.damping = this.coupled ? this.thrustDamping : 0;
                        }
                    }
                    this.children.forEach(function (child) {
                        if (child instanceof Phaser.Sprite) {
                            child.update();
                        }
                    });
                    this.kinematicAnchor.x = this.x;
                    this.kinematicAnchor.y = this.y;
                    this.kinematicAnchor.body.x = this.body.x;
                    this.kinematicAnchor.body.y = this.body.y;
                    this.kinematicAnchor.body.rotation = this.body.rotation;
                    this.game.world.wrap(this.body);
                };
                return Ship;
            })(Phaser.Sprite);
            Ships.Ship = Ship;
        })(Ships = Entities.Ships || (Entities.Ships = {}));
    })(Entities = RogueVerse.Entities || (RogueVerse.Entities = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Ships/Ship"/>
var RogueVerse;
(function (RogueVerse) {
    var Entities;
    (function (Entities) {
        var Player = (function () {
            function Player(game, ship) {
                var _this = this;
                this.game = game;
                this.ship = ship;
                this.game.add.existing(this.ship);
                this.game.worldLayer.add(this.ship);
                this.game.camera.follow(this.ship);
                this.controls = this.game.input.keyboard.addKeys({
                    "forward": Phaser.KeyCode.W,
                    "reverse": Phaser.KeyCode.S,
                    "left": Phaser.KeyCode.A,
                    "right": Phaser.KeyCode.D,
                    "brake": Phaser.KeyCode.SPACEBAR,
                    "toggleCouple": Phaser.KeyCode.C,
                    "boost": Phaser.KeyCode.SHIFT
                });
                this.controls.fireGroup1 = this.game.input.activePointer.leftButton;
                this.controls.toggleCouple.onDown.add(function () { return _this.ship.coupled = !_this.ship.coupled; });
            }
            Player.prototype.update = function () {
                if (this.controls.fireGroup1.isDown) {
                    this.ship.fire(1);
                }
                this.updateShip();
                this.ship.yaw(this.getRotationToPointer());
            };
            Player.prototype.updateShip = function () {
                if (this.controls.brake.isDown) {
                    this.ship.braking = true;
                }
                else {
                    this.ship.braking = false;
                    var strafing = false;
                    if (this.controls.forward.isDown) {
                        this.ship.strafeForward();
                        strafing = true;
                    }
                    else if (this.controls.reverse.isDown) {
                        this.ship.strafeReverse();
                        strafing = true;
                    }
                    if (this.controls.left.isDown) {
                        this.ship.strafeLeft();
                        strafing = true;
                    }
                    else if (this.controls.right.isDown) {
                        this.ship.strafeRight();
                        strafing = true;
                    }
                }
                if (this.controls.boost.isDown && (strafing || this.ship.braking)) {
                    this.ship.boosting = true;
                }
                else {
                    this.ship.boosting = false;
                }
            };
            Player.prototype.getRotationToPointer = function () {
                var angleToPointer = Phaser.Math.angleBetween(this.ship.x, this.ship.y, this.game.input.activePointer.worldX, this.game.input.activePointer.worldY);
                var deltaMouseRad = this.ship.rotation - angleToPointer - Math.PI / 2;
                var mod = Math.PI * 2;
                deltaMouseRad = deltaMouseRad % mod;
                if (deltaMouseRad != deltaMouseRad % (mod / 2)) {
                    deltaMouseRad = (deltaMouseRad < 0) ? deltaMouseRad + mod : deltaMouseRad - mod;
                }
                return deltaMouseRad;
            };
            return Player;
        })();
        Entities.Player = Player;
    })(Entities = RogueVerse.Entities || (RogueVerse.Entities = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Projectile"/>
/// <reference path="../../Components/Light"/>
var RogueVerse;
(function (RogueVerse) {
    var Entities;
    (function (Entities) {
        var Projectiles;
        (function (Projectiles) {
            var Laser = (function (_super) {
                __extends(Laser, _super);
                function Laser(game, x, y, key, frame) {
                    var _this = this;
                    _super.call(this, game, x, y, "projectiles.laser", frame);
                    this.damageRating = 100;
                    this.speed = 900;
                    this.timeToLive = 2000;
                    this.game.addLights.add(function (lights) { return _this.addLights(lights); });
                }
                Laser.prototype.addLights = function (lights) {
                    var _this = this;
                    this.light = new RogueVerse.Components.Light(this.game, "lights.point");
                    this.light.visible = false;
                    this.light.anchor.set(0.5, 0.4);
                    this.light.scale.set(0.3, 1);
                    this.light.tint = 0x00ff00;
                    this.light.alpha = 0.9;
                    this.light.updateScreenPosition.add(function () {
                        _this.light.x = _this.worldPosition.x;
                        _this.light.y = _this.worldPosition.y;
                        _this.light.angle = -_this.angle;
                        _this.light.visible = _this.alive;
                    });
                    lights.add(this.light);
                };
                return Laser;
            })(Entities.Projectiles.Projectile);
            Projectiles.Laser = Laser;
        })(Projectiles = Entities.Projectiles || (Entities.Projectiles = {}));
    })(Entities = RogueVerse.Entities || (RogueVerse.Entities = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Weapon"/>
/// <reference path="../Projectiles/Laser"/>
var RogueVerse;
(function (RogueVerse) {
    var Entities;
    (function (Entities) {
        var Weapons;
        (function (Weapons) {
            var Badger = (function (_super) {
                __extends(Badger, _super);
                function Badger(game) {
                    _super.call(this, game, "Badger laser repeater", "weapons.badger", Entities.Projectiles.Laser);
                    this.firingRate = 10;
                    this.overheatFactor = 0.1;
                    this.cooldownTime = 3000;
                    this.scale.setTo(0.5, 0.5);
                }
                return Badger;
            })(Entities.Weapons.Weapon);
            Weapons.Badger = Badger;
        })(Weapons = Entities.Weapons || (Entities.Weapons = {}));
    })(Entities = RogueVerse.Entities || (RogueVerse.Entities = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Ship"/>
/// <reference path="../../Entities/Weapons/Badger"/>
var RogueVerse;
(function (RogueVerse) {
    var Entities;
    (function (Entities) {
        var Ships;
        (function (Ships) {
            var Avenger = (function (_super) {
                __extends(Avenger, _super);
                function Avenger(game) {
                    _super.call(this, game, "Avenger", "ships.avenger");
                    this.thrustRating = 200;
                    this.thrustDamping = 0.4;
                    this.turnRate = 50;
                    this.brakeRate = 0.8;
                    this.maxSpeed = 200;
                    this.maxSpeedDamping = 0.9;
                    this.boostFactor = 1.4;
                    this.boostFuelCapacity = 4000;
                    this.boostFuel = 4000;
                    this.boostBrakeRate = 0.95;
                    this.body.mass = 1.0;
                    this.addMountPoint(-10, 2, new Entities.Weapons.Badger(game));
                    this.addMountPoint(10, 2, new Entities.Weapons.Badger(game));
                    this.weaponGroups = [
                        [0, 1]
                    ];
                }
                return Avenger;
            })(Entities.Ships.Ship);
            Ships.Avenger = Avenger;
        })(Ships = Entities.Ships || (Entities.Ships = {}));
    })(Entities = RogueVerse.Entities || (RogueVerse.Entities = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
var RogueVerse;
(function (RogueVerse) {
    var Components;
    (function (Components) {
        var Pip = (function (_super) {
            __extends(Pip, _super);
            function Pip(game, key, anchorObject, lag) {
                _super.call(this, game, 0, 0, key);
                this.minDistance = 70;
                this.anchorObject = anchorObject;
                this.game.physics.p2.enable(this);
                this.body.fixedRotation = true;
                this.constraint = this.game.physics.p2.createLockConstraint(this.anchorObject, this, [0, this.minDistance]);
                this.constraint.setRelaxation(lag);
            }
            Pip.prototype.update = function () {
                var distToPointer = Phaser.Math.max(this.minDistance, this.game.physics.arcade.distanceToPointer(this.anchorObject));
                this.constraint.localOffsetB[1] = this.game.physics.p2.pxm(distToPointer);
            };
            return Pip;
        })(Phaser.Sprite);
        Components.Pip = Pip;
    })(Components = RogueVerse.Components || (RogueVerse.Components = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
var RogueVerse;
(function (RogueVerse) {
    var Components;
    (function (Components) {
        var Meter = (function (_super) {
            __extends(Meter, _super);
            function Meter(game, x, y, width, height, color, iconKey, angle) {
                if (color === void 0) { color = 0xffffff; }
                if (iconKey === void 0) { iconKey = null; }
                if (angle === void 0) { angle = -3.0; }
                _super.call(this, game);
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
                    this.icon = this.game.add.sprite(-25, -5, iconKey);
                    this.add(this.icon);
                    this.icon.fixedToCamera = true;
                }
            }
            Meter.prototype.update = function () {
                this.bar.clear();
                this.bar.beginFill(0xffffff, 0.1);
                this.bar.drawRect(0, 0, this.barWidth, this.barHeight);
                this.bar.beginFill(this.color, 1.0);
                this.bar.drawRect(0, 0, this.barWidth * this.progress, this.barHeight);
                _super.prototype.update.call(this);
            };
            return Meter;
        })(Phaser.Group);
        Components.Meter = Meter;
    })(Components = RogueVerse.Components || (RogueVerse.Components = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Entities/Player"/>
/// <reference path="Pip"/>
/// <reference path="Meter"/>
var RogueVerse;
(function (RogueVerse) {
    var Components;
    (function (Components) {
        var Hud = (function () {
            function Hud(game, player) {
                this.game = game;
                this.player = player;
                this.fixedPip = new Components.Pip(this.game, "hud.pip", this.player.ship.kinematicAnchor, 8);
                this.fixedPip.alpha = 0.5;
                this.fixedPip.scale.set(0.8, 0.8);
                this.game.add.existing(this.fixedPip);
                this.game.uiLayer.add(this.fixedPip);
                this.lagPip = new Components.Pip(this.game, "hud.pip", this.player.ship.kinematicAnchor, 27);
                this.lagPip.alpha = 0.5;
                this.lagPip.scale.set(0.6, 0.6);
                this.lagPip.angle = 45;
                this.game.add.existing(this.lagPip);
                this.game.uiLayer.add(this.lagPip);
                this.pipLine = this.game.add.bitmapData(this.game.width, this.game.height);
                this.pipLine.ctx.lineWidth = 1;
                this.pipLine.ctx.strokeStyle = "#ffffff";
                this.pipLine.ctx.setLineDash([2, 3]);
                var pipLineImg = this.pipLine.addToWorld();
                this.game.uiLayer.add(pipLineImg);
                pipLineImg.alpha = 0.1;
                pipLineImg.fixedToCamera = true;
                this.speedBar = new Components.Meter(this.game, 40, this.game.height - 90, 150, 5, 0xffffff, "hud.energy");
                this.game.uiLayer.add(this.speedBar);
                this.overheatBar = new Components.Meter(this.game, 40, this.game.height - 70, 150, 5, 0xffffff, "hud.ammo");
                this.game.uiLayer.add(this.overheatBar);
                this.healthBar = new Components.Meter(this.game, 40, this.game.height - 50, 150, 5, 0xffffff, "hud.pulse");
                this.game.uiLayer.add(this.healthBar);
                this.debugText = this.game.add.text(20, 20, "", {
                    font: "14px Arial",
                    fill: "#ffffff"
                });
                this.game.uiLayer.add(this.debugText);
                this.debugText.fixedToCamera = true;
            }
            Hud.prototype.update = function () {
                /*var mode = "Mode: " + (this.player.ship.coupled ? "coupled" : "decoupled");
                var fuel = "Boost fuel: " + Math.round(this.player.ship.boostFuel) + "/" + this.player.ship.boostFuelCapacity;
                var boost = this.player.ship.boosting ? " BOOST" : "";*/
                this.debugText.setText(this.game.time.fps.toString());
                this.speedBar.progress = this.player.ship.getTotalSpeed() / this.player.ship.maxSpeed;
                this.speedBar.color = this.player.ship.boosting && this.player.ship.boostFuel > 0 ? 0xffcc00 : 0xffffff;
                var defaultMount = this.player.ship.mountPoints[0];
                this.overheatBar.progress = defaultMount.overheatTimer / defaultMount.cooldownTime;
                this.overheatBar.color = defaultMount.overheated ? 0xd9534f : 0xffffff;
                this.healthBar.progress = 1;
                this.pipLine.clear();
                this.pipLine.ctx.beginPath();
                this.pipLine.ctx.moveTo(this.fixedPip.worldPosition.x, this.fixedPip.worldPosition.y);
                this.pipLine.ctx.lineTo(this.lagPip.worldPosition.x, this.lagPip.worldPosition.y);
                this.pipLine.ctx.stroke();
                this.pipLine.ctx.closePath();
            };
            return Hud;
        })();
        Components.Hud = Hud;
    })(Components = RogueVerse.Components || (RogueVerse.Components = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../Entities/Player"/>
/// <reference path="../Entities/Ships/Ship"/>
/// <reference path="../Entities/Ships/Avenger"/>
/// <reference path="../Entities/Debris/Asteroid"/>
/// <reference path="../Components/Hud"/>
/// <reference path="../Components/Light"/>
var RogueVerse;
(function (RogueVerse) {
    var States;
    (function (States) {
        var Testbed = (function (_super) {
            __extends(Testbed, _super);
            function Testbed() {
                _super.apply(this, arguments);
            }
            Testbed.prototype.create = function () {
                this.game.worldLayer = this.game.add.group();
                this.game.uiLayer = this.game.add.group();
                this.starField = game.add.tileSprite(0, 0, 2000, 2000, "bg.starfield");
                this.game.worldLayer.add(this.starField);
                this.starField.autoScroll(5, 0);
                this.nebulaField = game.add.tileSprite(0, 0, 2000, 2000, "bg.nebulafield");
                this.game.worldLayer.add(this.nebulaField);
                this.nebulaField.alpha = 0.3;
                this.nebulaField.autoScroll(-5, 0);
                this.asteroids = this.game.add.group();
                this.asteroids.classType = RogueVerse.Entities.Debris.Asteroid;
                this.asteroids.createMultiple(10, "asteroids.1", null, true);
                this.game.worldLayer.add(this.asteroids);
                var ship = new RogueVerse.Entities.Ships.Avenger(this.game);
                ship.x = this.game.world.centerX;
                ship.y = this.game.world.centerY;
                this.player = new RogueVerse.Entities.Player(this.game, ship);
                this.hud = new RogueVerse.Components.Hud(this.game, this.player);
                this.lights = this.game.make.group(null, null, false);
                this.createLightmap();
                this.game.addLights.dispatch(this.lights);
                this.game.addCollisions.dispatch();
            };
            Testbed.prototype.createLightmap = function () {
                this.lightmap = this.game.add.renderTexture(this.game.width, this.game.height);
                var uniforms = {
                    uLightmap: { type: "sampler2D", value: this.lightmap },
                    ambientColor: { type: "4fv", value: [1, 1, 1, 0.2] }
                };
                var filter = new Phaser.Filter(this.game, uniforms, this.game.cache.getShader("shaders.lightmap"));
                filter.setResolution(this.game.width, this.game.height);
                this.game.worldLayer.filters = [filter];
            };
            Testbed.prototype.update = function () {
                var _this = this;
                this.player.update();
                this.hud.update();
                if (this.player.ship.getTotalSpeed() > 0) {
                    this.nebulaField.tilePosition.x -= this.player.ship.body.velocity.x * 0.001;
                    this.nebulaField.tilePosition.y -= this.player.ship.body.velocity.y * 0.001;
                    this.starField.tilePosition.x -= this.player.ship.body.velocity.x * 0.01;
                    this.starField.tilePosition.y -= this.player.ship.body.velocity.y * 0.01;
                }
                this.lightmap.clear();
                this.lights.forEach(function (light) {
                    light.update();
                    if (light.visible) {
                        _this.lightmap.renderXY(light, light.x, _this.game.height - light.y);
                    }
                });
            };
            Testbed.Key = "testbed";
            return Testbed;
        })(Phaser.State);
        States.Testbed = Testbed;
    })(States = RogueVerse.States || (RogueVerse.States = {}));
})(RogueVerse || (RogueVerse = {}));
/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="States/Boot"/>
/// <reference path="States/Preload"/>
/// <reference path="States/Testbed"/>
var RogueVerse;
(function (RogueVerse) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 1280, 960, Phaser.AUTO);
            this.addCollisions = new Phaser.Signal();
            this.addLights = new Phaser.Signal();
            this.state.add(RogueVerse.States.Boot.Key, RogueVerse.States.Boot);
            this.state.add(RogueVerse.States.Preload.Key, RogueVerse.States.Preload);
            this.state.add(RogueVerse.States.Testbed.Key, RogueVerse.States.Testbed);
            this.state.start(RogueVerse.States.Boot.Key);
        }
        return Game;
    })(Phaser.Game);
    RogueVerse.Game = Game;
})(RogueVerse || (RogueVerse = {}));
/// <reference path="Game"/>
var game = new RogueVerse.Game();
//# sourceMappingURL=main.js.map