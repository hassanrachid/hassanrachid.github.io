import Weapon from './weapon';

export default class Inventory extends Phaser.GameObjects.Rectangle {
	constructor(config) {
		super(config.scene, config.x, config.y);
		this.scene = config.scene;

		this.slotArray = [];
		this.width = 256;
		this.height = 256;
		this.x = config.x;
		this.y = config.y;

		this.b = new Phaser.GameObjects.Image(
			this.scene,
			this.x - 56,
			this.y - 56,
			"inventorybackground"
		);
		this.b.setOrigin(0, 0);
		this.b.setDisplaySize(304, 304);
		this.scene.add.existing(this.b);
		this.create();
		this.show();
	}

	create() {
		this.cols = this.width / 64;
		this.rows = this.height / 64;

		for (var x = 0; x < this.rows; x++) {
			this.slotArray[x] = [];
			for (var y = 0; y < this.cols; y++) {
				this.rect = new Phaser.GameObjects.Rectangle(
					this.scene,
					this.x + x * 64,
					this.y + y * 64,
					64,
					64
				);
				this.rect.image = this.scene.add.existing(
					new Phaser.GameObjects.Image(
						this.scene,
						this.x + x * 64,
						this.y + y * 64,
						"inventoryframe"
					)
				);
				this.rect.setInteractive({ dropZone: true });
				this.slotArray[x][y] = this.rect;
				this.scene.add.existing(this.rect);
			}
		}

		this.handleEvents();
		this.addItem();
	}

	addItem(item) {
		this.slotArray[0][0].item = new Weapon({
			scene: this.scene,
			x: this.slotArray[0][0].x,
			y: this.slotArray[0][0].y,
			image: "swords",
			frame: "ShortDagger_[Paint].png"
		});
		this.slotArray[0][1].item = new Weapon({
			scene: this.scene,
			x: this.slotArray[0][1].x,
			y: this.slotArray[0][1].y,
			image: "swords",
			frame: "ShortSword_[Paint].png"
		});
	}

	handleEvents() {
		this.scene.input.on("pointerdown", (pointer, localX, localY) => {
			console.log(pointer.x);
			console.log(pointer.y);
		});
		this.scene.input.on("dragstart", (pointer, gameObject) => {
			this.scene.children.bringToTop(gameObject);
			gameObject.xx = gameObject.x;
			gameObject.yy = gameObject.y;
		});
		this.scene.input.on("drag", (pointer, gameObject, dragX, dragY) => {
			gameObject.x = dragX;
			gameObject.y = dragY;
		});
		this.scene.input.on("drop", (pointer, gameObject, target) => {
			var x = (gameObject.xx - this.x) / 64;
			var y = (gameObject.yy - this.y) / 64;

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

	show() {
		// store these in a container later on..
		this.setVisible(!this.visible);
		this.b.setVisible(!this.b.visible);
		for (var x = 0; x < this.rows; x++) {
			for (var y = 0; y < this.cols; y++) {
				this.slotArray[x][y].setVisible(!this.slotArray[x][y].visible);
				this.slotArray[x][y].image.setVisible(
					!this.slotArray[x][y].image.visible
				);
				if (this.slotArray[x][y].item != undefined) {
					this.slotArray[x][y].item.setVisible(
						!this.slotArray[x][y].item.visible
					);
				}
			}
		}
	}
}
