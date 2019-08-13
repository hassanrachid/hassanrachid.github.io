import Ability from "./ability";
import Inventory from "./inventory";
import UtilityBar from "./utilitybar";
import HealthBar from "./healthbar";
export default class Player extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.key);
		this.state = "IdleState";
		config.scene.add.existing(this);
		config.scene.physics.world.enable(this);
		this.setScale(0.25);
		this.body.setSize(250, 315);
		this.body.setOffset(80, 0);
		this.body.setCollideWorldBounds(true);
		this.scene = config.scene;

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

		this.utilitybar = new UtilityBar({
			scene: this.scene.game.scene.keys["InterfaceScene"],
			x: 100,
			y: 860,
			width: 1792,
			height: 64,
			player: this
		});

		this.healthbar = new HealthBar(this, this.scene);
	}

	update(cursors) {
		this[this.state]();
		if (cursors.left.isDown) {
			this.body.setVelocityX(-160);
			this.body.setVelocityY(0);
			this.state = "MoveState";
			this.flipX = true;
		} else if (cursors.right.isDown) {
			this.body.setVelocityX(160);
			this.body.setVelocityY(0);
			this.state = "MoveState";
			this.flipX = false;
		} else if (cursors.up.isDown) {
			this.body.setVelocityY(-160);
			this.state = "MoveState";
			this.body.setVelocityX(0);
		} else if (cursors.down.isDown) {
			this.body.setVelocityY(160);
			this.state = "MoveState";
			this.body.setVelocityX(0);
		} else {
			this.state = "IdleState";
			this.body.setVelocityX(0);
			this.body.setVelocityY(0);
		}

		// On if move state, check for any enemies near by, and then have the enemy move to the player

		this.scene.enemies.getChildren().forEach(e => {
			// have aggro distance configurable in enemy class ** TODO

			var d = this.distance(e.x, e.y, this.x, this.y);
			if (d <= 300) {
				if (e.moveTo(this, d) == undefined) {
					e.moveTo(this, d);
				}
			}
		});

		if (Phaser.Input.Keyboard.JustDown(cursors.spell1)) {
			this.ability.cast(this);
		}
	}

	IdleState() {
		this.anims.play("idle", true);
	}

	MoveState() {
		this.anims.play("walk", true);
		this.healthbar.update();
	}

	distance(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;

		return Math.sqrt(dx * dx + dy * dy);
	}
}
