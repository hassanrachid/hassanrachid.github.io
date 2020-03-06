import HealthBar from "../healthbar";

export default class Goblin extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super({ scene: config.scene, x: config.x, y: config.y, key: config.key });
		this.scene.add.existing(this);
		this.scene.physics.world.enable(this);
		this.state = "IdleState";
		this.setScale(0.25);
		this.body.setSize(256, 256);
		this.body.setOffset(100, 20);
		this.attacking = false;
		this.attackDelay = 1000;
		this.agroRange = 250;
		this.lastAttack;
		this.timer;

		// Attributes
		this.maxHealth = 100;
		this.currentHealth = 100;

		this.healthbar = new HealthBar(this, this.scene);

		this.on("animationcomplete", (anim, frame) => {
			this.emit("animationcomplete_" + anim.key, anim, frame);
		});

		this.on("animationupdate", (anim, frame) => {
			this.emit("animationupdate_" + anim.key, anim, frame);
		});

		this.on("animationcomplete_goblinattack", () => {
			this.attackanim = false;
			this.state = "IdleState";
			this.timer = this.scene.time.delayedCall(this.attackDelay, () => {
				this.attacking = false;
			});
		});

		// We need to keep track of the attack animation and set it to true when player attack and set velocity to
		this.on("animationupdate_goblinattack", () => {
			this.attackanim = true;
			this.attacking = true;
			if (this.state != "DieState") {
				this.state = "AttackState";
			}
		});

		// On each animation update, set state of goblin to hurt
		this.on("animationupdate_goblinhurt", (anim, frame) => {
			this.state = "HurtState";
		});

		// When hurt animation completes, set back to IdleState
		this.on("animationcomplete_goblinhurt", (anim, frame) => {
			this.state = "IdleState";
		});

		// On die animation - destroy sprite
		this.on("animationcomplete_goblindie", (anim, frame) => {
			if (frame.isLast) {
				this.destroy();
			}
		});
	}

	update() {
		// this.healthbar.update();
		if (
			this.timer != undefined &&
			this.timer.getElapsed() != this.attackDelay
		) {
			if (this.state != "HurtState" && this.state != "DieState") {
				this.state = "IdleState";
			}
		}

		this[this.state]();
	}

	attacked(damage) {
		// damage is the amount of health the source of damage did
		this.currentHealth -= damage;
		if (this.currentHealth <= 0) {
			this.state = "DieState";
		} else {
			this.state = "HurtState";
		}
	}

	moveTo(target, distance) {
		// If player is out of range, this will stop the enemy
		if (distance >= this.agroRange) {
			if (this.state != "HurtState" && this.state != "DieState") {
				this.state = "IdleState";
				return;
			}
		}

		// Gets the x and y threshold from distance between enemy and target positions
		var absX = Math.abs(Math.abs(this.x) - Math.abs(target.x));
		var absY = Math.abs(Math.abs(this.y) - Math.abs(target.y));

		// Sets the enemy to MoveState only if attack, hurt, or die animation are not playing
		if (
			!this.attackanim &&
			this.state != "HurtState" &&
			this.state != "DieState"
		) {
			this.state = "MoveState";
		}

		// Moves to player
		if (this.state == "MoveState") {
			if (this.x > target.x) {
				this.body.setVelocityX(-100);
				this.flipX = true;
				if (absX >= 0 && absX <= 20) {
					this.body.setVelocityX(0);
				}
			} else if (this.x < target.x) {
				this.body.setVelocityX(100);
				this.flipX = false;
				if (absX >= 0 && absX <= 20) {
					this.body.setVelocityX(0);
				}
			}
			if (this.y > target.y) {
				this.body.setVelocityY(-100);
				if (absY >= 0 && absY <= 20) {
					this.body.setVelocityY(0);
				}
			} else if (this.y < target.y) {
				this.body.setVelocityY(100);
				if (absY >= 0 && absY <= 20) {
					this.body.setVelocityY(0);
				}
			}
		}

		// Attacks player if within distance
		if (distance <= 75) {
			if (!this.attacking) {
				this.state = "AttackState";
			}
		}
	}

	DieState() {
		this.anims.play("goblindie", true);
	}

	HurtState() {
		if (this.anims.currentAnim.key != "goblinattack") {
			this.anims.play("goblinhurt", true);
		}
	}

	IdleState() {
		this.body.setVelocity(0, 0);
		this.anims.play("goblinidle", true);
	}

	AttackState() {
		if (this.anims.currentAnim.key != "goblindie") {
			this.body.setVelocity(0, 0);
			this.anims.play("goblinattack", true);
		}
	}

	MoveState() {
		if (this.body.velocity.x != 0 || this.body.velocity.y != 0) {
			this.anims.play("goblinwalk", true);
		}
	}
}
