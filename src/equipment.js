import Item from "./item";
import ItemSlot from './itemslot';

export default class Equipment extends Phaser.GameObjects.Rectangle {
	constructor(scene) {
		super(scene);
		this.scene = scene;
		this.gamescene = this.scene.game.scene.keys["GameScene"];
		this.scene.add.existing(this);

		this.types = {
			weapon: {
				id: 0,
				type: "weapon",
				position: {
					x: 125,
					y: 660
				}
			},
			helmet: {
				id: 1,
				type: "helmet",
				position: {
					x: 200,
					y: 550
				}
			},
			armor: {
				id: 2,
				type: "armor",
				position: {
					x: 200,
					y: 620
				}
			},
			boots: {
				id: 3,
				type: "boots",
				position: {
					x: 200,
					y: 690
				}
			},
			gloves: {
				id: 4,
				type: "shield",
				position: {
					x: 275,
					y: 660
				}
			},
			shield: {
				id: 5,
				type: "gloves",
				position: {
					x: 127,
					y: 767
				}
			}
		};

		this.slots = [];

		this.create();
		this.show();
	}

	show() {
		this.setVisible(!this.visible);
		for (var s in this.slots) {
			this.slots[s].image.setVisible(!this.slots[s].image.visible);
			if (this.slots[s].item != null) {
				this.slots[s].item.setVisible(!this.slots[s].item.visible);
			}
		}
	}

	create() {
		for (var type in this.types) {
			this.slot = new ItemSlot(this.scene, this.types[type].position.x, this.types[type].position.y, 64, 64, null);
			this.slot.setInteractive({ dropZone: false })
			this.slots.push(this.slot);
		}

		this.addItem({ name: "Gold Sword", type: "weapon" })
	}

	addItem(item) {
		// equip the new item
		this.item = new Item({
			scene: this.scene,
			x: this.slots[this.types[item.type].id].x,
			y: this.slots[this.types[item.type].id].y,
			name: item.name,
			attributes: item.attributes
		})
		this.item.tooltip.text = "Press [E] to Unequip";
		this.item.setVisible(this.visible);
		// if there was a previous item.. throw it back in the inventory
		if (this.slots[this.types[item.type].id].item != undefined) {
			this.gamescene.player.inventory.addItem(this.slots[this.types[item.type].id].item);
			// this.slots[this.types[this.item.type].id].item.destroy();
		}

		this.slots[this.types[this.item.type].id].item = this.item;
	}

	getItem(weaponType) {
		if (this.slots[this.types[weaponType].id].item == undefined) {
			return "default";
		}
		return this.slots[this.types[weaponType].id].item;
	}

	recalculateAttributes() {
		// for (var s in this.slots) {
		// 	console.log(this.slots[s]);
		// }
	}
}
