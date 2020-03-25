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
		this.collider.width = this.body.width;
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
				this.icon = this.scene.add.image(this.x, this.y, "wood_cut");
				this.scene.tweens.add({
					targets: this.icon,
					duration: 800,
					alpha: 1,
					ease: "Linear",
					onStart: function() {
						this.icon.alpha = 0;
						this.anims.play("tree_cut", true);
                    },
                    completeDelay: 300,
					onComplete: function() {
						this.icon.destroy();
					},
					y: this.y - 100,
					repeat: 0,
					callbackScope: this
				});
			}
		}
	}
}
