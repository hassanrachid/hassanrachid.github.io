export default class Combat {
	constructor(sprite, collider, scene) {
		this.sprite = sprite;
		this.collider = collider;
		this.scene = scene;
		this.collided = false;

		this.sprite.on(
			"animationupdate",
			(frame, index, key) => {
				if (frame.key.includes("attack")) {
					if (index.progress >= 0.5 && index.progress <= 0.55) {
						// this is probably soo inefficient.....
						this.scene.physics.world.overlap(this.collider, this.scene.trees, this.TreeCollision);
						for (var i = 0; i < this.scene.enemies.children.entries.length; i++) {
							if (this.scene.physics.world.overlap(this.collider, this.scene.enemies.children.entries[i].container, this.Collision)) {
								break;
							}
						}
					}
				}
			},
			this
		);
	}

	TreeCollision(o1, o2) {
		var weapon = o1.parentContainer.sprite.equipment.getItem("weapon").name;
		if (weapon.includes("Axe")) {
			o2.damage(50);
			o2.scene.tweens.add({
				targets: o2,
				onStart: function () {
					o2.setTint(16711680)
				},
				onComplete: function () {
					o2.clearTint()
				},
				duration: 50,
				ease: "Cubic",
				x: o2.x - Math.floor(-20 + Math.random() * (20 + 1 - (-20))),
				y: o2.y - Math.random() * 10,
				yoyo: true,
				callbackScope: this
			});
		}
	}

	Collision(o1, o2) {
		/* TODO */
		// make method to take in both object attributes and calculate damage done
		var playerAttributes = o1.parentContainer.sprite.attributesWithEquipment;
		var enemyAttributes = o2.sprite.attributesWithEquipment;

		// damage indicators
		var style = { font: "bold 24px Verdana", fill: "#FF0000", align: "center" };
		var text = o1.scene.add.text(o2.x - 5, o2.y, "-" + playerAttributes.strength, style);
		text.setOrigin(0.5);
		o1.scene.tweens.add({
			targets: text,
			duration: 300,
			ease: "Cubic",
			y: o2.y - Math.random() * 75,
			onComplete: () => {
				text.destroy();
			},
			callbackScope: this
		});

		// play blood particles
		var fn = new Function("return " + o2.scene.cache.text.get("bloodeffect"))();
		fn[0].x = o2.x;
		fn[0].y = o2.y;
		o2.scene.add.particles("blood", fn);
		o2.setDepth(1);

		// o2 is the enemy
		// apply knockback? depending on opposite direction I AM facing
		// if im facing right, you wanna add x coordinate to enemy, if im facing left, subtract x coordinate
		if (o1.parentContainer.sprite.getDirection() == "right") {
			o2.x = o2.x + 25;
		}
		if (o1.parentContainer.sprite.getDirection() == "left") {
			o2.x = o2.x - 25;
		}
		if (o1.parentContainer.sprite.getDirection() == "front") {
			o2.y = o2.y + 25;
		}

		o2.sprite.damage(playerAttributes.strength);
	}

	generateRandomInteger(min, max) {
		return Math.floor(min + Math.random() * (max + 1 - min));
	}
}
