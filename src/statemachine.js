export default class StateMachine {
	constructor(sprite, scene) {
		this.sprite = sprite;
		this.scene = scene;
		this.attacking = false;
		this.hurting = false;
		this.dying = false;
		this.previousState = "IdleState";

		this.sprite.on(
			"animationupdate",
			function(anim, frame) {
				if (anim.key.includes("attack")) {
					this.AdjustColliderBox(this.sprite.direction);
					if (frame.isLast) {
						this.attacking = false;
						this.ResetColliderBox();
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
		this.sprite.anims.play("attack_" + this.sprite.direction + "_" + this.sprite.equipment.getItem("weapon").name, true);
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
		// first center collider box on body..
		if (direction == "side") {
			if (!this.sprite.flipX) {
				this.sprite.collider.body.setOffset(-60, 0);
			} else {
				this.sprite.collider.body.setOffset(60, 0);
			}
		}
		if (direction == "front") {
			this.sprite.collider.body.setOffset(0, 80);
        }
        // set of the offset after getting weapon
		// console.log(this.sprite.equipment.getItem("weapon"))
	}

	ResetColliderBox() {
		this.sprite.collider.body.setOffset(0, 0);
	}
}
