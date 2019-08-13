export default class Goblin extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y);
		this.scene.add.existing(this);
		this.scene.physics.world.enable(this);
		this.state = "IdleState";
		this.setScale(0.25);
		this.body.setSize(256, 256);
		this.body.setOffset(100, 20);
		this.attacking = false;
		this.attackDelay = 1000;
		this.lastAttack;
		this.timer;
		// Attributes

		this.health = 100;

		this.on("animationcomplete", (anim, frame) => {
			this.emit("animationcomplete_" + anim.key, anim, frame);
		});

		this.on("animationupdate", (anim, frame) => {
			this.emit("animationupdate_" + anim.key, anim, frame);
		});

		this.on("animationcomplete_goblinattack", () => {
			this.timer = this.scene.time.delayedCall(this.attackDelay, () => {
				this.attacking = false;
			});
		});
		this.on("animationupdate_goblinattack", () => {
			this.attacking = true;
			this.body.setVelocity(0, 0);
		});

		this.on("animationupdate_goblinhurt", (anim, frame) => {
			this.state = "HurtState";
			if (frame.isLast) {
				this.state = "IdleState";
			}

		});
		// this.on("animationcomplete_goblinhurt", (anim, frame) => {
		// });

		this.on("animationcomplete_goblindie", (anim, frame) => {
			if (frame.isLast) {
				this.destroy();
			}
		});
	}

	update() {
		this[this.state]();
	}

	attacked(damage) {
		// damage is the amount of health the source of damage did
		this.health -= damage;

		// TODO, moving and getting hurt do not workwell together

		this.state = "HurtState";
		if (this.health <= 0) {
			this.state = "DieState"
		}
	}

	moveTo(target, distance) {
		var absX = Math.abs(Math.abs(this.x) - Math.abs(target.x));
		var absY = Math.abs(Math.abs(this.y) - Math.abs(target.y));

		if (!this.attacking && this.state != "HurtState" && this.state != "DieState") {
			this.state = "MoveState";
		}
		if (this.state == "MoveState") {
			if (this.x > target.x) {
				this.body.setVelocityX(-120);
				this.flipX = true;
				if (absX >= 0 && absX <= 20) {
					this.body.setVelocityX(0);
				}
			} else if (this.x < target.x) {
				this.body.setVelocityX(120);
				this.flipX = false;
				if (absX >= 0 && absX <= 20) {
					this.body.setVelocityX(0);
				}
			}
			if (this.y > target.y) {
				this.body.setVelocityY(-120);
				if (absY >= 0 && absY <= 20) {
					this.body.setVelocityY(0);
				}
			} else if (this.y < target.y) {
				this.body.setVelocityY(120);
				if (absY >= 0 && absY <= 20) {
					this.body.setVelocityY(0);
				}
			}
		}

		if (distance <= 75) {
			this.state = "AttackState";
			return distance;
		}
	}

	DieState() { 
		this.anims.play("goblindie", true);
	}

	HurtState() {
		this.anims.play("goblinhurt", true);
	}

	IdleState() {
		if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
			this.anims.play("goblinidle", true);
		}
	}

	AttackState() {
		if (!this.attacking) {
			this.anims.play("goblinattack", true);
		}
	}

	MoveState() {
		if (!this.attacking) {
			if (this.body.velocity.x != 0 || this.body.velocity.y != 0) {
				this.anims.play("goblinwalk", true);
			}
		}
	}
}
