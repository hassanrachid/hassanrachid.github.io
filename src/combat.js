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
						for (var i = 0; i < this.scene.enemies.children.entries.length; i++) {
							this.scene.physics.world.collide(this.collider, this.scene.enemies.children.entries[i].container, this.Collision);
						}
					}
				}
			},
			this
		);
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
			y: o2.y - (Math.random() + 75),
			onComplete: () => {
				text.destroy();
			},
			callbackScope: this
		});

		// play blood particles
		var fn = new Function('return ' + o2.scene.cache.text.get('bloodeffect'))();
		fn[0].x = o2.x;
		fn[0].y = o2.y;
		o2.scene.add.particles('blood', fn);
		o2.setDepth(1);

		o2.sprite.damage(playerAttributes.strength);
	}
}
