import UtilityIcon from "phaser3-project-template/src/utilityicon";

export default class UtilityBar {
	constructor(config) {
		this.scene = config.scene;
		this.x = config.x;
		this.y = config.y;
		this.width = config.width;
		this.height = config.height;

		this.iconNames = ["inventory", "2", "3", "4", "5", "6", "7"];

		this.create();
	}

	create() {
		for (let index = 0; index < this.iconNames.length; index++) {
			this.utilityicon = new UtilityIcon({
				scene: this.scene,
				x: this.x + index * 64,
				y: this.y,
				width: 64,
				height: 64,
				name: this.iconNames[index]
			});
		}
	}
}
