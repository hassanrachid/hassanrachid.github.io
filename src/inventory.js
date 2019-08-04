import Item from "phaser3-project-template/src/item";

export default class Inventory extends Phaser.GameObjects.Rectangle {
	constructor(config) {
		super(config.scene, config.x, config.y);
		this.scene = config.scene;

		this.slotArray = [];
		this.width = 256;
		this.height = 256;
		this.x = config.x;
		this.y = config.y;
		this.create();
	}

	create() {
		this.inventoryContainer = new Phaser.Geom.Rectangle(
			this.x,
			this.y,
			this.width,
			this.height
		);
		this.cols = this.width / 64;
		this.rows = this.height / 64;

		for (var x = 0; x < this.rows; x++) {
			this.slotArray[x] = [];
			for (var y = 0; y < this.cols; y++) {
				this.rect = new Phaser.GameObjects.Rectangle(
					this.scene,
					this.inventoryContainer.x + x * 64,
					this.inventoryContainer.y + y * 64,
					64,
					64
				);
				this.rect.setOrigin(0.5, 0.5);
				this.rect.isStroked = true;
				this.rect.setInteractive({ dropZone: true });
				this.slotArray[x][y] = this.rect;
				this.scene.add.existing(this.rect);
			}
		}

		this.handleEvents();
		this.addItem();
	}

	addItem(item) {
		// this.slotArray[0][0].item = new Item({
		// 	scene: this.scene,
		// 	x: this.slotArray[0][0].x,
		// 	y: this.slotArray[0][0].y,
		// 	image: "swords",
		// 	frame: "SmallAxe.png"
		// });
	}

	handleEvents() {
		this.scene.input.on("dragstart", (pointer, gameObject) => {
			this.scene.children.bringToTop(gameObject);
			console.log(gameObject.getTopLeft());
			gameObject.xx = gameObject.x;
			gameObject.yy = gameObject.y;
		});
		this.scene.input.on("drag", (pointer, gameObject, dragX, dragY) => {
			gameObject.x = dragX;
			gameObject.y = dragY;
		});
		this.scene.input.on("drop", (pointer, gameObject, target) => {
			var x = (gameObject.xx - this.inventoryContainer.x) / 64;
			var y = (gameObject.yy - this.inventoryContainer.y) / 64;

			var previous = this.slotArray[x][y];
			this.slotArray[x][y].item = undefined;
			if (target.item != undefined) {
				previous.item = target.item;
				previous.item.x = previous.x;
				previous.item.y = previous.y;
			}
			target.item = gameObject;
			target.item.x = target.x;
			target.item.y = target.y;
		});
		this.scene.input.on("dragend", (pointer, gameObject, dropped) => {
			if (!dropped) {
				gameObject.x = gameObject.xx;
				gameObject.y = gameObject.yy;
			}
		});
	}
}
