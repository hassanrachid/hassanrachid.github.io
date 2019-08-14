export default class Equipment {
	constructor(scene) {
		this.scene = scene;

		this.image = this.scene.add.existing(
			new Phaser.GameObjects.Image(
				this.scene,
				200,
				660,
				"equipmentframe"
			).setOrigin(0.5, 0.5)
		);

		this.show();
	}

	show() {
		this.image.setVisible(!this.image.visible);
	}
}
