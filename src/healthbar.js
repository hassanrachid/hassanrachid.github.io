export default class HealthBar {
	constructor(container, scene) {
		this.container = container;
		this.scene = scene;
		this.minLimit = 0;
		this.maxLimit = 1;
		this.rect = new Phaser.GameObjects.Rectangle(
			this.scene,
			this.container.x,
			this.container.y - 50,
			100,
			10
		);
		this.healthRect = new Phaser.GameObjects.Rectangle(
			this.scene,
			this.container.x,
			this.container.y - 50,
			100,
			10
		);
		this.rect.isStroked = true;
		this.healthRect.setFillStyle("056653", 1);
		this.scene.add.existing(this.healthRect);
		this.scene.add.existing(this.rect);
	}

	update() {
		this.rect.x = this.container.x;
		this.rect.y = this.container.y - 50;

		this.healthRect.x = this.container.x;
		this.healthRect.y = this.container.y - 50;

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
		return (this.container.sprite.attributes.currentHealth - min) / delta;
	}
}
