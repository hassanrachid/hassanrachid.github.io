import ItemTooltip from "./itemtooltip";

export default class Item extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.itemlist.image, config.itemlist.frame);
		this.setDisplaySize(48, 48);
		this.scene = config.scene;
		this.scene.add.existing(this);
		this.name = config.itemlist.frame;
		this.type = config.itemlist.type;
		this.setInteractive({
			draggable: true,
			enabled: true
		});
		this.tooltip = new ItemTooltip({
			scene: this.scene,
			item: this
		});

		this.on("pointerdown", (pointer, gameObject, localY) => {
			if (pointer.rightButtonDown()) {

			}
		});
	}
}
