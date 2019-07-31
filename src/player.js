import Ability from "phaser3-project-template/src/ability";
import Inventory from "phaser3-project-template/src/inventory";

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
		this.ability = new Ability({
			scene: this.scene,
			x: 0,
			y: 0,
			key: "firestrike"
		});

		this.inventory = new Inventory({
			scene: this.scene,
			x: 400,
			y: 200
		});
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

		if (Phaser.Input.Keyboard.JustDown(cursors.spell1)) {
			this.ability.cast(this);
		}
	}

	IdleState() {
		this.anims.play("idle", true);
	}

	MoveState() {
		this.anims.play("walk", true);
	}
}
