import BaseCharacter from "../basecharacter";
import StateMachine from "../statemachine";

export default class Goblin extends BaseCharacter {
	constructor(config) {
		super(config);
		this.direction = "front";
		this.state = "IdleState";
		this.scene = config.scene;
		this.name = "orc";

		this.healthbar.offsetx = -8;
		this.healthbar.offsety = -50;

		this.statemachine = new StateMachine(this, this.scene);
		this.agroRange = 500;
		this.container.immovable = false;
	}

	update() {
		super.update();
	}

	moveTo(target, distance) {
		// If player is out of range, this will stop the enemy
		if (distance >= this.agroRange) {
			this.container.body.setVelocity(0);
			return;
		}

		// Gets the x and y threshold from distance between enemy and target positions
		var absX = Math.abs(Math.abs(this.container.x) - Math.abs(target.x));
		var absY = Math.abs(Math.abs(this.container.y) - Math.abs(target.y));

		// Moves to player
		if (this.container.x > target.x) {
			this.container.body.setVelocityX(-100);
			this.flipX = true;
			this.healthbar.offsetx = 0;
			if (absX >= 0 && absX <= 50) {
				this.container.body.setVelocityX(0);
			}
		} else if (this.container.x < target.x) {
			this.container.body.setVelocityX(100);
			this.flipX = false;
			this.healthbar.offsetx = -8;
			if (absX >= 0 && absX <= 50) {
				this.container.body.setVelocityX(0);
			}
		}
		if (this.container.y > target.y) {
			this.container.body.setVelocityY(-100);
			if (absY >= 0 && absY <= 50) {
				this.container.body.setVelocityY(0);
			}
		} else if (this.container.y < target.y) {
			this.container.body.setVelocityY(100);
			if (absY >= 0 && absY <= 50) {
				this.container.body.setVelocityY(0);
			}
		}
		// if (distance <= 75) {
		// 	if (!this.statemachine.attacking) {
		// 		this.state = "AttackState";
		// 	}
		// }

		if (this.container.body.velocity.x != 0 || this.container.body.velocity.y != 0) {
			for (var i = 0; i < this.scene.enemies.children.entries.length; i++) {
				this.scene.physics.world.overlap(this.container, this.scene.enemies.children.entries[i].container, this.handleCollision);
			}
		}
	}

	handleCollision() {

	}
}
