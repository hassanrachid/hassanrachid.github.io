export default class Item extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.image, config.frame);
		this.setScale(0.33);
		this.scene.add.existing(this);
		this.setInteractive({
			draggable: true,
			customHitArea: false
		});
	}
}
