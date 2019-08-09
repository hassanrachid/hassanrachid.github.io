import { timingSafeEqual } from "crypto";

export default class Goblin extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y);
		this.idleAnimation = config.idleAnimation;
		this.scene.add.existing(this);
		this.scene.physics.world.enable(this);
		this.setScale(0.33);
		this.body.setSize(256, 256);
		this.body.setOffset(100, 20);
		this.anims.play(this.idleAnimation);
		this.combat = false;
		// Attributes

		this.health = 100;

		this.on("animationcomplete", (anim, frame) => {
			this.emit("animationcomplete_" + anim.key, anim, frame);
		});

		this.on("animationcomplete_goblinhurt", () => {
			this.anims.play("goblinidle");
		});

		this.on("animationcomplete_goblindie", () => {
			this.destroy();
		});
	}

	attacked(damage) {
		// damage is the amount of health the source of damage did
		console.log(this.health);
		this.health -= damage;
		this.anims.play("goblinhurt");
		this.combat = true;
		if (this.health <= 0) {
			this.anims.play("goblindie");
		}
	}
}
