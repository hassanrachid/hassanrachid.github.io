import Item from "phaser3-project-template/src/item";

export default class Inventory extends Phaser.GameObjects.Container {
	constructor(config) {
		super(config.scene, config.x, config.y);
		this.scene = config.scene;

		this.slotArray = [];
		this.width = 256;
		this.height = 256;
		this.x = 400;
		this.y = 200;
		this.create();
	}

	create() {
		var inventoryContainer = new Phaser.GameObjects.Rectangle(
			this.scene,
			this.x,
			this.y,
			this.width,
			this.height
		);
		inventoryContainer.setOrigin(0, 0);
		this.scene.add.existing(inventoryContainer);

		this.cols = this.width / 64;
		this.rows = this.height / 64;

		for (var y = 0; y < this.rows; y++) {
			for (var x = 0; x < this.cols; x++) {
				this.rect = new Phaser.GameObjects.Rectangle(
					this.scene,
					inventoryContainer.x + x * 64,
					inventoryContainer.y + y * 64,
					64,
					64
				);
				this.rect.setOrigin(0, 0);
				this.rect.isStroked = true;
				this.rect.setInteractive({ draggable: true, dropZone: true });
				this.slotArray.push({ rect: this.rect, item: null });
				this.scene.add.existing(this.rect);
			}
		}

		this.slotArray.forEach(r => {
			r.rect.on("dragstart", function(pointer, dragX, dragY) {
				r.xx = r.rect.x;
				r.yy = r.rect.y;
				if (r.item != null && r.image != null) {
					r.xxx = r.image.x;
					r.yyy = r.image.y;
				}
				// TODO : for replace method, store r as a temp variable for other event to use
			});
			r.rect.on("drag", function(pointer, dragX, dragY) {
				if (r.item != null && r.image != null) {
					r.image.x = r.rect.x;
					r.image.y = r.rect.y;
				}
				r.rect.x = dragX;
				r.rect.y = dragY;
			});
			r.rect.on("dragend", function(pointer, dragX, dragY, dropped) {
				if (
					r.rect.x < inventoryContainer.x ||
					r.rect.x > inventoryContainer.x
				) {
					r.rect.x = r.xx;
					r.image.x = r.xxx;
				}
				if (
					r.rect.y < inventoryContainer.y ||
					r.rect.y > inventoryContainer.y
				) {
					r.rect.y = r.yy;
					r.image.y = r.yyy;
				}
			});

			r.rect.on("drop", (pointer, target) => {
				// add if statement to check if moved within the box and not utside
				this.slotArray.forEach(rr => {
					if (target.x == rr.rect.x && target.y == rr.rect.y) {
						console.log(rr);
						// TODO: replace rr with
						target.isFilled = false;
					}
				});
			});

			r.rect.on("dragover", function(pointer, target) {
				target.isFilled = true;
			});

			r.rect.on("dragleave", function(pointer, target) {
				target.isFilled = false;
			});
		});

		this.addItem(
			new Item({
				scene: this.scene,
				type: "sword",
				name: "sword of power",
				image: "sword"
			})
		);
	}

	addItem(item) {
		this.slotArray.forEach(r => {
			if (r.item == null) {
				r.item = item;
				r.image = new Phaser.GameObjects.Image(
					this.scene,
					r.rect.x,
					r.rect.y,
					"sword"
				)
					.setOrigin(0.5, 0)
					.setScale(0.15)
					.setRotation(-45);
				this.scene.add.existing(r.image);
				this.scene.add.existing(r.item);
			}
		});
	}
}
