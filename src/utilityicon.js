export default class UtilityIcon extends Phaser.GameObjects.Rectangle {
	constructor(config) {
		super(config.scene, config.x, config.y, config.width, config.height);
		this.scene = config.scene;
		this.x = config.x;
		this.y = config.y;
		this.name = config.name;
		this.player = config.player;
		this.scene.add.existing(true);
		this.scene.add.existing(
			new Phaser.GameObjects.Image(this.scene, this.x, this.y, this.name)
		);

		this.setInteractive({ enabled: true });

		this.on("pointerdown", function() {
			switch (this.name) {
				case "inventory":
					this.player.inventory.hide();
					break;
			}
		});
	}
}
