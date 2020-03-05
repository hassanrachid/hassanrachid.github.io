import Item from "./item";
import Weapon from './weapon';

export default class Equipment extends Phaser.GameObjects.Container {
	constructor(scene) {
		super(scene);
		this.scene = scene;
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
			this.slot = new Phaser.GameObjects.Rectangle(
				this.scene,
				this.types[type].position.x,
				this.types[type].position.y,
				64,
				64
			);
			this.slots.push(this.slot);
		}
		this.add(this.slots);

		// add item to equipment to test
		this.addItem(
			new Weapon({
				scene: this.scene,
				x: 50,
				y: 50,
				image: "swords",
				frame: "ShortSword_[Paint].png"
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
	}

	getItem(weaponType) {
		return this.slots[this.types[weaponType].id].item;
	}
}
