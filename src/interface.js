export default class InterfaceScene extends Phaser.Scene {
	constructor() {
		super({
			key: "InterfaceScene"
		});
	}

	preload() { }

	create() {
		this.input.topOnly = false;
	}
}
