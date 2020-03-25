export default class Tree extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.key);
		this.width = config.width;
		this.height = config.height;
		this.scene = config.scene;
		this.x = config.x;
		this.y = config.y;

		this.collider = this.scene.physics.add.image(this.x, this.y);
		this.collider.setSize(this.width, this.height);
		this.collider.setDebugBodyColor(0xffff00);
		this.collider.setImmovable(true);
		this.collider.sprite = this;
		this.tween = null;
		this.setDepth(9999);

		this.health = 100;
		this.cut = false;
	}

	update() {
		if (!this.cut && this.scene.physics.overlap(this.scene.player.container, this.collider, null)) {
			this.alpha = 0.5;
		} else {
			this.alpha = 0.8;
		}

		if (this.tween != null && this.tween.isPlaying()) {
			this.tween.data[2].end = this.scene.player.container.y;
			this.tween.data[3].end = this.scene.player.container.x;
		}
	}

	setBounds() {
		this.body.width = this.width - 150;
		this.body.height = this.height - 150;
		this.body.x = this.x - 50;
		this.body.y = this.y;
	}

	setStumpBounds() {
		this.body.height = this.height - 220;
		this.body.y = this.y + 70;
		this.collider.width = this.body.width - 50;
	}

	damage(damage) {
		if (!this.cut) {
			this.health -= damage;
			this.scene.tweens.add({
				targets: this,
				onStart: function() {
					this.setTint(16711680);
				},
				onComplete: function() {
					this.clearTint();
				},
				duration: 50,
				ease: "Cubic",
				x: this.x - Math.floor(-20 + Math.random() * (20 + 1 - -20)),
				y: this.y - Math.random() * 10,
				yoyo: true,
				callbackScope: this
			});
			if (this.health <= 0) {
				this.cut = true;
				this.setStumpBounds();
				this.icon = this.scene.add.image(this.x - Math.floor(-50 + Math.random() * (50 + 1 - -50)), this.y - Math.random() * 50, "wood_cut");
				this.tween = this.scene.tweens.add({
					targets: this.icon,
					duration: 700,
					alpha: 1,
					scale: "-=1",
					ease: "Power3",
					onStart: function(tween, targets) {
						this.icon.alpha = 0;
						this.anims.play("tree_cut", true);
						this.icon.setDepth(9999);
					},
					completeDelay: 100,
					onComplete: function() {
						this.icon.destroy();
					},
					y: this.scene.player.container.y,
					x: this.scene.player.container.x,
					repeat: 2,
					callbackScope: this
				});
			}
		}
	}
}
