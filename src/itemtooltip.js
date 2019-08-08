export default class ItemTooltip extends Phaser.GameObjects.Image {
	constructor(config) {
		super(config.scene, 197, 490, "itemtooltip");
		this.item = config.item;
		this.scene = config.scene;
		this.scene.add.existing(this);
		this.setVisible(false);

		this.text = this.scene.make.text({
			x: 202,
			y: 480,
			text: this.item.name,
			origin: { x: 0.5, y: 0.5 },
			style: {
				font: "bold 12px Arial",
				fill: "black",
				wordWrap: { width: 280 }
			}
		});
		this.text.setAlign("center");
		this.text.setVisible(false);

		this.item.on("pointerover", () => {
			this.show();
		});

		this.item.on("pointerout", () => {
			this.show();
		});
	}

	show() {
		this.setVisible(!this.visible);
		this.text.setVisible(!this.text.visible);
	}
}
