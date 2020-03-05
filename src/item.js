import ItemTooltip from "./itemtooltip";

export default class Item extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, image, frame) {
		super(scene, x, y, image, frame);
		this.setDisplaySize(48, 48);
		this.scene = scene;
		this.scene.add.existing(this);
		this.name = frame;
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
