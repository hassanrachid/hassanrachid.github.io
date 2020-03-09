import ItemSlot from './itemslot';
import Item from './item';
export default class Inventory extends Phaser.GameObjects.Rectangle {
	constructor(config) {
		super(config.scene, config.x, config.y, config.width, config.height);
		this.scene = config.scene;
		this.gamescene = this.scene.game.scene.keys["GameScene"];

		this.slotArray = [];
		this.width = config.width;
		this.height = config.height;
		this.x = config.x;
		this.y = config.y;

		this.create();
		this.show();

	}

	create() {
		this.cols = this.width / 64;
		this.rows = this.height / 64;

		for (var x = 0; x < this.rows; x++) {
			this.slotArray[x] = [];
			for (var y = 0; y < this.cols; y++) {
				this.slotArray[x][y] = new ItemSlot(
					this.scene,
					this.x + x * 72,
					this.y + y * 72,
					64,
					64,
					null
				);

				this.slotArray[x][y].setInteractive({ dropZone: true });
				this.scene.add.existing(this.slotArray[x][y]);
			}
		}


		this.addItem({ name: "Short Sword" });
		this.handleEvents();

	}

	addItem(item) {
		for (var x = 0; x < this.rows; x++) {
			for (var y = 0; y < this.cols; y++) {
				if (this.slotArray[y][x].item == undefined) {
					this.slotArray[y][x].item = new Item({
						scene: this.scene,
						x: this.slotArray[y][x].x,
						y: this.slotArray[y][x].y,
						name: item.name
					});
					return;
				}
			}
		}
	}

	removeItem(item) {
		for (var x = 0; x < this.rows; x++) {
			for (var y = 0; y < this.cols; y++) {
				if (this.slotArray[y][x].item == item) {
					item.destroy();
					item.tooltip.destroy();
					this.slotArray[y][x].item = null;
					return;
				}
			}
		}
	}

	handleEvents() {
		var pointer = this.scene.input.activePointer;
		this.equipKey = this.scene.input.keyboard.addKey("E");
		this.equipKey.on("up", () => {
			if (this.gamescene.player.inventory.getSlot(pointer.x, pointer.y)) {
				var item = this.gamescene.player.inventory.getSlot(pointer.x, pointer.y).item;
				if (item) {
					// equip item
					this.gamescene.player.equipment.addItem(item);
					this.removeItem(item);
				}
			}
		});

		this.scene.input.on("dragstart", (pointer, gameObject) => {
			this.scene.children.bringToTop(gameObject);
			gameObject.tooltip.show(false);
			gameObject.xx = gameObject.x;
			gameObject.yy = gameObject.y;
		});
		this.scene.input.on("drag", (pointer, gameObject, dragX, dragY) => {
			gameObject.x = dragX;
			gameObject.y = dragY;
		});
		this.scene.input.on("drop", (pointer, gameObject, target) => {
			var x = (gameObject.xx - this.x) / 72;
			var y = (gameObject.yy - this.y) / 72;

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
			this.scene.children.bringToTop(gameObject.tooltip);
			gameObject.tooltip.show(true, pointer.x, pointer.y);
			if (!dropped) {
				gameObject.x = gameObject.xx;
				gameObject.y = gameObject.yy;
			}
		});
	}

	show() {
		// store these in a container later on..
		this.setVisible(!this.visible);
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

	getSlot(xx, yy) {
		if (this.visible) {
			for (var x = 0; x < this.rows; x++) {
				for (var y = 0; y < this.cols; y++) {
					var bottomLeft = this.slotArray[x][y].getBottomLeft();
					var topRight = this.slotArray[x][y].getTopRight();
					if ((xx > bottomLeft.x && xx < topRight.x) && (yy < bottomLeft.y && yy > topRight.y)) {
						return this.slotArray[x][y];
					}
				}
			}
		}
	}
}
