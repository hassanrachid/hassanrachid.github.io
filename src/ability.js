export default class Ability extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.key);
		config.scene.physics.world.enable(this);
		config.scene.add.existing(this);

		this.setScale(0.25);
		this.body.setSize(500, 200);
		this.body.setOffset(125, 1900);
		this.collided = false;

		this.on(
			"animationupdate",
			function(frame, index) {
				this.casting = true;
				if (index.index >= 4 && !this.collided) {
					this.scene.physics.world.collide(this, this.player, this.collision);
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

	collision() {
		console.log("collide");
	}
}
