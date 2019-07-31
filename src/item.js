export default class Item extends Phaser.GameObjects.GameObject {
	constructor(config) {
		super(config.scene, config.type);
		this.setData("name", config.name);
		this.setData("image", config.image);
	}
}
