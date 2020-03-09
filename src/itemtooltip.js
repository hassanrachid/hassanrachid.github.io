export default class ItemTooltip extends Phaser.GameObjects.Text {
	constructor(config) {
		var style = {
			font: "bold 12px Helvetica",
			fill: "white",
			wordWrap: { width: 280 }
		};
		super(config.scene, 0, 0, "Press [E] to Equip", style);
		this.setAlign("center");

		this.item = config.item;
		this.scene = config.scene;

		this.scene.add.existing(this);
		this.show(false);

		this.item.on("pointerover", (pointer) => {
			console.log(this.item);
			this.show(true, pointer.x, pointer.y);
		});

		this.item.on("pointerout", () => {
			this.show(false);
		});
	}

	show(flag, x, y) {
		this.x = x;
		this.y = y;
		this.setVisible(flag);
	}
}
