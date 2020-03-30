export default class StateMachine {
	constructor(sprite, scene) {
		this.sprite = sprite;
		this.scene = scene;
		this.attacking = false;
		this.hurting = false;
		this.dying = false;
		this.previousState = "IdleState";
		this.pointerX;
		this.pointerY;

		this.sprite.on(
			"animationupdate",
			function(anim, frame) {
				if (anim.key.includes("attack")) {
					this.AdjustColliderBox(this.sprite.direction);
					if (frame.index == 2) {
						// get pointer from start of animation
						this.pointerX = this.scene.input.activePointer.worldX;
						this.pointerY = this.scene.input.activePointer.worldY;
					}
					if (frame.isLast) {
						this.attacking = false;
						if (anim.key.includes("Bow")) {
							var angle = Phaser.Math.Angle.Between(this.sprite.container.x, this.sprite.container.y, this.pointerX, this.pointerY);
							// alter firing position based on direction, so arrow doesn't come directly from players body
							var position = this.GetFiringPosition(this.sprite.container.x, this.sprite.container.y, this.sprite.direction);
							var sprite = this.scene.add.sprite(position.x, position.y, "arrow");
							this.scene.physics.world.enable(sprite);
							sprite.setScale(0.15);
							sprite.rotation = angle;
							this.scene.physics.velocityFromRotation(angle, 500, sprite.body.velocity);
						}
					}
				}
			},
			this
		);

		this.sprite.on(
			"animationcomplete",
			function(anim, frame) {
				if (anim.key.includes("dying")) {
					if (frame.isLast) {
						this.sprite.container.destroy();
						this.sprite.healthbar.remove();
						this.sprite.destroy();
						this.dying = false;
					}
				}
			},
			this
		);

		this.sprite.on(
			"animationstart",
			function(anim, frame) {
				if (anim.key.includes("dying")) {
					this.sprite.container.body.setEnable(false);
				}
			},
			this
		);

		this.sprite.on(
			"animationupdate",
			function(anim, frame) {
				if (anim.key.includes("hurt")) {
					if (frame.isLast) {
						this.hurting = false;
					}
				}
			},
			this
		);

		this.sprite.on(
			"animationstart",
			function(anim) {
				if (anim.key.includes("attack")) {
					this.attacking = true;
				}
			},
			this
		);

		this.sprite.on(
			"animationstart",
			function(anim) {
				if (anim.key.includes("dying")) {
					this.dying = true;
				}
			},
			this
		);

		this.sprite.on(
			"animationstart",
			function(anim) {
				if (anim.key.includes("hurt")) {
					this.hurting = true;
				}
			},
			this
		);
	}

	HurtState() {
		this.sprite.anims.play(this.sprite.name + "hurt_" + this.sprite.direction, true);
	}

	DieState() {
		this.attacking = false;
		this.sprite.anims.play(this.sprite.name + "dying_" + this.sprite.direction, true);
	}

	IdleState() {
		this.sprite.anims.play(this.sprite.name + "idle_" + this.sprite.direction, true);
	}

	MoveState() {
		this.attacking = false;
		this.sprite.anims.play(this.sprite.name + "walk_" + this.sprite.direction, true);
	}

	AttackState() {
		if (this.sprite.equipment && this.sprite.equipment.getItem("weapon")) {
			// this.sprite.anims.play("attack_" + this.sprite.direction + "_" + this.sprite.equipment.getItem("weapon").name, true);
			this.sprite.anims.play("attack_" + this.sprite.direction + "_Bow", true);
		}
	}

	UpdateState(state) {
		if (this.previousState != state) {
			this.StateChanged(this.previousState, state);
		}
		this.previousState = state;
		this[state]();
	}

	StateChanged(previousState, state) {
		// this detects whenever a state has changedds
	}

	AdjustColliderBox(direction) {
		var collider = this.sprite.equipment.getItem("weapon").collider;
		if (direction == "side") {
			if (!this.sprite.flipX) {
				this.sprite.collider.body.setSize(collider.height, collider.width);
				this.sprite.collider.body.setOffset(-collider.offset.side - 20, 0);
			} else {
				this.sprite.collider.body.setSize(collider.height, collider.width);
				this.sprite.collider.body.setOffset(collider.offset.side, 0);
			}
		}
		if (direction == "front") {
			this.sprite.collider.body.setSize(collider.width, collider.height);
			this.sprite.collider.body.setOffset(0, collider.offset.front);
		}
		if (direction == "back") {
			this.sprite.collider.body.setSize(collider.width, collider.height);
			this.sprite.collider.body.setOffset(0, -collider.offset.back);
		}
	}

	ResetColliderBox() {
		this.sprite.collider.body.setOffset(0, 0);
	}

	GetFiringPosition(oldX, oldY, direction) {
		if (this.sprite.direction = "front") {
			oldY += 50;
			return { y: oldY, x: oldX };
		}
	}
}
