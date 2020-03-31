export default class UtilityIcon extends Phaser.GameObjects.Rectangle {
	constructor(config) {
		super(config.scene, config.x, config.y, config.width, config.height);
		this.scene = config.scene;
		this.x = config.x;
		this.y = config.y;
		this.name = config.name;
		this.player = config.player;
		this.scene.add.existing(new Phaser.GameObjects.Image(this.scene, this.x, this.y, this.name));

		this.setInteractive({ enabled: true });

		this.on("pointerdown", () => {
			this.openInterface();
		});
		var keyObj = this.scene.input.keyboard.addKey("ESC");
		keyObj.on(
			"down",
			function(event) {
				this.closeInterface(this.name);
			},
			this
		);
	}

	openInterface() {
		this.player[this.name].show();
		this.player.utilitybar.closeOtherInterfaces(this.name);
	}

	closeInterface() {
		if (this.player[this.name] != undefined && this.player[this.name].visible) {
			this.player[this.name].show();
		}
	}
}
