export default class UtilityIcon extends Phaser.GameObjects.Rectangle {
	constructor(config) {
		super(config.scene, config.x, config.y, config.width, config.height);
		this.scene = config.scene;
		this.x = config.x;
		this.y = config.y;
		this.name = config.name;
		this.scene.add.existing(true);

		if (this.name == "inventory") {
			this.scene.add.existing(
				new Phaser.GameObjects.Image(
					this.scene,
					this.x,
					this.y,
					"inventoryIcon"
				).setScale(0.125)
			);
		}
	}
}
