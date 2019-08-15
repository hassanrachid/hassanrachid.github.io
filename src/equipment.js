import Item from "./item";

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
			shield: {
				id: 4,
				type: "shield",
				position: {
					x: 275,
					y: 660
				}
			},
			gloves: {
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

		this.addItem(
			new Item({
				scene: this.scene,
				x: 50,
				y: 50,
				image: "swords",
				frame: "ShortSword_[Paint].png",
				type: "weapon"
			})
		);

		this.addItem(
			new Item({
				scene: this.scene,
				x: 50,
				y: 50,
				image: "armor",
				frame: "BanditLightArmor_[Paint].png",
				type: "armor"
			})
		);
	}

	addItem(item) {
		this.item = item;
		this.add(this.item);
		console.log(this.item.parentContainer);
		this.scene.children.bringToTop(this.item);
		this.item.x = this.slots[this.types[this.item.type].id].x;
		this.item.y = this.slots[this.types[this.item.type].id].y;
		this.slots[this.types[this.item.type].id].item = this.item;
	}
}
