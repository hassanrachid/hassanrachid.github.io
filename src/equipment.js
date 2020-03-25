import Item from "./item";
import ItemSlot from './itemslot';

export default class Equipment extends Phaser.GameObjects.Rectangle {
	constructor(scene, player) {
		super(scene);
		this.scene = scene;
		this.player = player;
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

		this.addItem({ name: "Short Spear", type: "weapon" })
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
		this.item.text.setVisible(false);
		this.item.setInteractive(false);

		// if there was a previous item.. throw it back in the inventory
		if (this.slots[this.types[item.type].id].item != undefined) {
			this.player.inventory.addItem(this.slots[this.types[item.type].id].item);
		}
		// set new item to correct slot
		this.slots[this.types[this.item.type].id].item = this.item;

		// if new item was a weapon, set collider box
		if (this.getItem("weapon") != undefined) {
			this.player.collider.body.setSize(this.getItem("weapon").collider.width, this.getItem("weapon").collider.height);
		}

		this.recalculateAttributes();
	}

	getItem(weaponType) {
		if (this.slots[this.types[weaponType].id].item == undefined) {
			return "default";
		}
		return this.slots[this.types[weaponType].id].item;
	}

	recalculateAttributes() {
		if (this.player != undefined) {
			this.player.resetAttributes();
			for (var s in this.slots) {
				if (this.slots[s].item) {
					this.player.attributesWithEquipment.strength += this.slots[s].item.attributes.strength
					this.player.attributesWithEquipment.health += this.slots[s].item.attributes.health
					this.player.attributesWithEquipment.agility += this.slots[s].item.attributes.agility
					this.player.attributesWithEquipment.intelligence += this.slots[s].item.attributes.intelligence
					this.player.attributesWithEquipment.defense += this.slots[s].item.attributes.defense
				}
			}
		}
	}
}
