export default class UtilityIcon extends Phaser.GameObjects.Rectangle {
	constructor(config) {
		super(config.scene, config.x, config.y, config.width, config.height);
		this.scene = config.scene;
		this.x = config.x;
		this.y = config.y;
		this.name = config.name;
		this.player = config.player;
		this.open = false;
		this.scene.add.existing(
			new Phaser.GameObjects.Image(this.scene, this.x, this.y, this.name)
		);

		this.setInteractive({ enabled: true });

		this.on("pointerdown", () => {
			this.openInterface();
		});
	}

	openInterface() {
		this.player[this.name].show();
		this.player.utilitybar.closeOtherInterfaces(this.name);
	}
}
