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

		this.on(
			"animationupdate",
			(frame, index) => {
				this.casting = true;
				if (index.index >= 4 && !this.collided) {
					this.scene.physics.world.collide(
						this,
						this.scene.enemies,
						this.collision
					);
					this.collided = true;
				}
			},
			this
		);
		this.on(
			"animationcomplete",
			function() {
				this.casting = false;
			},
			this
		);
	}

	cast(player) {
		if (!this.casting) {
			this.collided = false;
			this.anims.play("firestrike", true);
			this.player = player;
			this.x = this.scene.input.activePointer.worldX + 25;
			this.y = this.scene.input.activePointer.worldY - 200;
		}
	}

	collision(o1, o2) {
		o2.attacked(o1.damage);
	}
}
