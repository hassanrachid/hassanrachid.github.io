export default class UtilityIcon extends Phaser.GameObjects.Rectangle {
	constructor(config) {
		super(config.scene, config.x, config.y, config.width, config.height);
		this.scene = config.scene;
		this.x = config.x;
		this.y = config.y;
		this.name = config.name;
		this.player = config.player;
		this.open = false;
		this.scene.add.existing(true);
		this.scene.add.existing(
			new Phaser.GameObjects.Image(this.scene, this.x, this.y, this.name)
		);

		this.setInteractive({ enabled: true });

		this.on("pointerdown", () => {
			this.openInterface(this.name);
		});
	}

	openInterface(name) {
		// show interface
		this.player[name].show();
		// check if another interface is open...
		if (
			this.player.utilitybar.openedInterface != undefined &&
			this.player.utilitybar.openedInterface != name
		) {
			// close this one then
			this.player[this.player.utilitybar.openedInterface].show();
			console.log("hi");
		} else {
			// if no other interface is open, just set the variable to current interface
			this.player.utilitybar.openedInterface = name;
			console.log("hi2");
		}
	}
}
