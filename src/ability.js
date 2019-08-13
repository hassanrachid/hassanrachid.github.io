export default class Ability extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.key);
		this.scene = config.scene;
		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);

		this.setScale(0.25);
		this.body.setSize(500, 200);
		this.body.setOffset(125, 1900);
		this.collided = false;
		this.damage = 10;
		this.body.setImmovable(true);

		this.on(
			"animationupdate",
			(frame, index) => {
				this.casting = true;
				if (!this.collided) {
					this.scene.physics.world.overlap(
						this,
						this.scene.enemies,
						this.collision
					);
					this.collided = true;
				}
			},
			this
		);
		this.on("animationcomplete", function() {
			this.casting = false;
		});
	}

	cast(player) {
		if (!this.casting) {
			this.player = player;
			this.collided = false;
			this.anims.play("firestrike", true);
			this.x = this.scene.input.activePointer.worldX + 25;
			this.y = this.scene.input.activePointer.worldY - 200;
		}
	}

	collision(o1, o2) {
		o2.attacked(o1.damage);
		console.log("collided");
	}
}
