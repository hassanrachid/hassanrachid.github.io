export default class HealthBar {
	constructor(sprite, scene) {
		this.sprite = sprite;
		this.scene = scene;
		this.minLimit = 0;
		this.maxLimit = 1;
		this.rect = new Phaser.GameObjects.Rectangle(
			this.scene,
			this.sprite.x,
			this.sprite.y - 50,
			100,
			10
		);
		this.healthRect = new Phaser.GameObjects.Rectangle(
			this.scene,
			this.sprite.x,
			this.sprite.y - 50,
			100,
			10
		);
		this.rect.isStroked = true;
		this.healthRect.setFillStyle("056653", 1);
		this.scene.add.existing(this.healthRect);
		this.scene.add.existing(this.rect);
	}

	update() {
		this.rect.x = this.sprite.x;
		this.rect.y = this.sprite.y - 50;

		this.healthRect.x = this.sprite.x;
		this.healthRect.y = this.sprite.y - 50;

		this.healthRect.width = this.normalize();

		if (this.healthRect.width == 0) {
			this.rect.destroy();
			this.healthRect.destroy();
		}
	}

	normalize() {
		var max = this.maxLimit;
		var min = this.minLimit;
		var delta = max - min;
		return (this.sprite.currentHealth - min) / delta;
	}
}
