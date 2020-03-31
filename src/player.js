import Ability from "./ability";
import Inventory from "./inventory";
import UtilityBar from "./utilitybar";
import HealthBar from "./healthbar";
import Equipment from "./equipment";
import StateMachine from "./statemachine";
import Combat from "./combat";
import BaseCharacter from "./basecharacter";
import Attributes from "./attributes";
export default class Player extends BaseCharacter {
	constructor(config) {
		super(config);
		this.direction = "front";
		this.state = "IdleState";
		this.scene = config.scene;
		this.statemachine = new StateMachine(this, this.scene);
		this.healthbar.offsetx = 0;
		this.healthbar.offsety = -60;
		this.container.setDepth(999);
		// this.ability = new Ability({
		// 	scene: this.scene,
		// 	x: 0,
		// 	y: 0,
		// 	key: "firestrike"
		// });

		this.inventory = new Inventory({
			scene: this.scene.game.scene.keys["InterfaceScene"],
			x: this.scene.cameras.main.centerX - 75,
			y: this.scene.cameras.main.centerY - 75,
			width: 256,
			height: 256
		});

		this.equipment = new Equipment(this.scene.game.scene.keys["InterfaceScene"], this);
		this.equipment.recalculateAttributes();

		this.utilitybar = new UtilityBar({
			scene: this.scene.game.scene.keys["InterfaceScene"],
			x: 100,
			y: 860,
			width: 1792,
			height: 64,
			player: this
		});

		this.combat = new Combat(this, this.collider, this.scene);

		// allows player to attack
		this.scene.input.on("pointerdown", gameObject => {
			this.utilitybar.closeAllInterfaces();
			this.state = "AttackState";
		});
		
	}

	update(cursors) {
		if (this.container) {
			super.update();
			this.container.body.setVelocity(0);

			let angle = Phaser.Math.Angle.Between(this.container.x, this.container.y, this.scene.input.activePointer.worldX, this.scene.input.activePointer.worldY);
			var degrees = Phaser.Math.RadToDeg(angle);
			// face to the right if pointer is right of player
			if (degrees > -45 && degrees < 45) {
				super.setDirection("right");
			}
			// face to the left if pointer is left of player
			if ((degrees > 135 && degrees < 180) || (degrees > -180 && degrees < -135)) {
				super.setDirection("left");
			}
			// face front if pointer is under player
			if (degrees > 45 && degrees < 135) {
				super.setDirection("front");
			}

			if (degrees < -45 && degrees > -135) {
				super.setDirection("back");
			}

			// Horizontal movement
			if (cursors.left.isDown) {
				this.container.body.setVelocityX(-250);
			} else if (cursors.right.isDown) {
				this.container.body.setVelocityX(250);
			}

			// Vertical movement
			if (cursors.up.isDown) {
				this.container.body.setVelocityY(-250);
			} else if (cursors.down.isDown) {
				this.container.body.setVelocityY(250);
			}

			this.container.body.velocity.normalize().scale(200, 200);

			// if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
			// 	this.state = "AttackState";
			// }
		}

		// On if move state, check for any enemies near by, and then have the enemy move to the player

		this.scene.enemies.getChildren().forEach(e => {
			var d = this.distance(e.container.x, e.container.y, this.container.x, this.container.y);
			e.moveTo(this.container, d);
		});
	}
}
