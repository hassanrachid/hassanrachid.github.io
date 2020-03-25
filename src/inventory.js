import ItemSlot from "./itemslot";
import Item from "./item";
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
				this.slotArray[x][y] = new ItemSlot(this.scene, this.x + x * 72, this.y + y * 72, 64, 64, null);

				this.slotArray[x][y].setInteractive({ dropZone: true });
				this.scene.add.existing(this.slotArray[x][y]);
			}
		}

		this.addItem({ name: "Iron Axe" });
		this.addItem({ name: "Steel Axe" });
		this.addItem({ name: "Silver Axe" });
		this.addItem({ name: "Hardened Axe" });
		this.addItem({ name: "Platinum Axe" });
		this.addItem({ name: "Wood", quantity: 1 });
		this.addItem({ name: "Wood", quantity: 6 });
		this.addItem({ name: "Wood", quantity: 1 });


		this.handleEvents();
	}

	addItem(item) {
		var item = new Item({
			scene: this.scene,
			x: 0,
			y: 0,
			name: item.name,
			quantity: item.quantity
		});
		for (var x = 0; x < this.rows; x++) {
			for (var y = 0; y < this.cols; y++) {
				if (this.slotArray[y][x].item != undefined && this.slotArray[y][x].item.stackable && item.stackable && this.slotArray[y][x].item.name == item.name) {
					this.slotArray[y][x].item.quantity += item.quantity;
					item.destroy();
					item.text.destroy();
					return;
				}
				if (this.slotArray[y][x].item == undefined) {
					this.slotArray[y][x].item = item;
					item.x = this.slotArray[y][x].x
					item.y = this.slotArray[y][x].y;
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
				if (item && item.type != "misc") {
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
			gameObject.setTextPosition(gameObject.x, gameObject.y);
		});
		this.scene.input.on("drop", (pointer, gameObject, target) => {
			var x = (gameObject.xx - this.x) / 72;
			var y = (gameObject.yy - this.y) / 72;

			var previous = this.slotArray[x][y];
			var previousItem = this.slotArray[x][y].item;
			this.slotArray[x][y].item = undefined;
			if (target.item != undefined) {
				if (previousItem.stackable && target.item.stackable && target.item.name == previousItem.name) {
					target.item.quantity += previousItem.quantity;
					previousItem.destroy();
					previousItem.text.destroy();
					target.item.setTextPosition(target.item.x, target.item.y);
					return;
				}
				previous.item = target.item;
				previous.item.x = previous.x;
				previous.item.y = previous.y;
				previous.item.setTextPosition(previous.item.x, previous.item.y);

			}
			target.item = gameObject;
			target.item.x = target.x;
			target.item.y = target.y;
			target.item.setTextPosition(gameObject.x, gameObject.y);
		});
		this.scene.input.on("dragend", (pointer, gameObject, dropped) => {
			this.scene.children.bringToTop(gameObject.tooltip);
			gameObject.tooltip.show(true, pointer.x, pointer.y);
			if (!dropped) {
				gameObject.x = gameObject.xx;
				gameObject.y = gameObject.yy;
				gameObject.setTextPosition(gameObject.x, gameObject.y);
			}
		});
	}

	show() {
		// store these in a container later on..
		this.setVisible(!this.visible);
		for (var x = 0; x < this.rows; x++) {
			for (var y = 0; y < this.cols; y++) {
				this.slotArray[x][y].setVisible(!this.slotArray[x][y].visible);
				this.slotArray[x][y].image.setVisible(!this.slotArray[x][y].image.visible);
				if (this.slotArray[x][y].item != undefined) {
					this.slotArray[x][y].item.setVisible(!this.slotArray[x][y].item.visible);
					this.slotArray[x][y].item.text.setVisible(!this.slotArray[x][y].item.text.visible);
					this.slotArray[x][y].item.setTextPosition(this.slotArray[x][y].x, this.slotArray[x][y].y)
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
					if (xx > bottomLeft.x && xx < topRight.x && yy < bottomLeft.y && yy > topRight.y) {
						return this.slotArray[x][y];
					}
				}
			}
		}
	}
}
