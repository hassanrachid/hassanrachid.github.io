import Ability from "./ability";
import Inventory from "./inventory";
import UtilityBar from "./utilitybar";
import HealthBar from "./healthbar";
import Equipment from "./equipment";
import StateMachine from './statemachine';
export default class Player extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, 0, 0, config.key);
		this.direction = "front";
		this.state = "IdleState";
		this.statemachine = new StateMachine(this, config.scene);
		this.scene = config.scene;
		// always add the sprite to scene first
		this.scene.add.existing(this);

		// create a container for the player
		this.container = this.scene.add.container(config.x, config.y);
		this.container.setSize(this.width, this.height);
		this.scene.physics.world.enable(this.container);
		this.container.add(this);
		this.container.setScale(0.5);
		this.container.sprite = this;
		// weapon collider
		this.collider = this.scene.physics.add.image();
		this.collider.body.setCircle(60);
		this.collider.setDebugBodyColor(0xffff00);
		this.container.add(this.collider)

		// so the player cant go outside the world map
		this.container.body.setCollideWorldBounds(true);

		// Attributes // Move later to another child object..
		this.maxHealth = 100;
		this.currentHealth = 100;
		this.ability = new Ability({
			scene: this.scene,
			x: 0,
			y: 0,
			key: "firestrike"
		});

		this.inventory = new Inventory({
			scene: this.scene.game.scene.keys["InterfaceScene"],
			x: 100,
			y: 580
		});

		this.equipment = new Equipment(
			this.scene.game.scene.keys["InterfaceScene"]
		);

		this.utilitybar = new UtilityBar({
			scene: this.scene.game.scene.keys["InterfaceScene"],
			x: 100,
			y: 860,
			width: 1792,
			height: 64,
			player: this
		});

		this.healthbar = new HealthBar(this.container, this.scene);

	}

	update(cursors) {
		if (this.container) {
			this.statemachine.UpdateState(this.state);
			this.healthbar.update();
			this.container.body.setVelocity(0);

			// Horizontal movement
			if (cursors.left.isDown) {
				this.container.body.setVelocityX(-250);
				this.flipX = false;
				this.direction = "side";
			} else if (cursors.right.isDown) {
				this.container.body.setVelocityX(250);
				this.flipX = true;
				this.direction = "side";
			}

			// Vertical movement
			if (cursors.up.isDown) {
				this.container.body.setVelocityY(-250);
				this.direction = "front";
			} else if (cursors.down.isDown) {
				this.container.body.setVelocityY(250);
				this.direction = "front";
			}

			// so diagonal movement isnt too fast...
			this.container.body.velocity.normalize().scale(200, 200);

			if (!this.statemachine.attacking) {
				this.centerBodyOnBody(this.collider.body, this.container.body);
			}

			// Update states of player based on velocity and if player is attacking
			if (this.container.body.velocity.x == 0 && this.container.body.velocity.y == 0 && !this.statemachine.attacking) {
				this.state = "IdleState";
			}

			if ((this.container.body.velocity.x != 0 || this.container.body.velocity.y != 0) && !this.statemachine.attacking) {
				this.state = "MoveState";
			}

			if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
				this.state = "AttackState";
			}
		}

		// On if move state, check for any enemies near by, and then have the enemy move to the player

		this.scene.enemies.getChildren().forEach(e => {
			// have aggro distance configurable in enemy class ** TODO

			var d = this.distance(e.x, e.y, this.x, this.y);
			e.moveTo(this, d);
		});

		if (Phaser.Input.Keyboard.JustDown(cursors.spell1)) {
			this.ability.cast(this);
		}
	}

	distance(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;

		return Math.sqrt(dx * dx + dy * dy);
	}

	centerBodyOnBody(a, b) {
		a.position.set(
			b.x + b.halfWidth - a.halfWidth,
			b.y + b.halfHeight - a.halfHeight
		);
	}
}
