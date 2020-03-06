import Item from "./item";
import ItemSlot from './itemslot';

export default class Equipment extends Phaser.GameObjects.Container {
	constructor(scene) {
		super(scene);
		this.scene = scene;
		this.gamescene = this.scene.game.scene.keys["GameScene"];
		this.scene.add.existing(this);
		this.name = "equipment";

		this.image = new Phaser.GameObjects.Image(
			this.scene,
			200,
			660,
			"equipmentframe"
		).setOrigin(0.5, 0.5);

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

		this.add(this.image);

		this.create();
		this.show();
	}

	show() {
		this.setVisible(!this.visible);
	}

	create() {
		// looping thru each item type and creating a slot for it in equipment screen
		for (var type in this.types) {
			this.slot = new ItemSlot(this.scene, this.types[type].position.x, this.types[type].position.y, 64, 64, null);
			this.slots.push(this.slot);
		}
		this.add(this.slots);

		// add item to equipment to test
		this.addItem(
			new Item({
				scene: this.scene,
				x: 0,
				y: 0,
				itemlist: this.gamescene.itemlist.items["Gold Sword"]
			})
		);
	}

	addItem(item) {
		this.item = item;
		this.add(this.item);
		this.scene.children.bringToTop(this.item);
		this.item.x = this.slots[this.types[this.item.type].id].x;
		this.item.y = this.slots[this.types[this.item.type].id].y;
		// if item in slot exists, replace the item
		if (this.slots[this.types[this.item.type].id].item != undefined) {
			// remove old item from container
			this.remove(this.slots[this.types[this.item.type].id].item);
			// TODO: after replace item in equipment, move it back to inventory
		}
		this.slots[this.types[this.item.type].id].item = this.item;
		this.recalculateAttributes();
	}

	getItem(weaponType) {
		if (this.slots[this.types[weaponType].id].item == undefined) {
			return "default";
		}
		return this.slots[this.types[weaponType].id].item;
	}

	recalculateAttributes() {
		for (var s in this.slots) {
			console.log(this.slots[s]);
		}
	}
}
