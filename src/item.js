import ItemTooltip from "./itemtooltip";

export default class Item extends Phaser.GameObjects.Sprite {
	constructor(config) {
		// grab item from item list
		var GameScene = config.scene.game.scene.keys["GameScene"];
		var frame = GameScene.itemlist.items[config.name].frame;
		var image = GameScene.itemlist.items[config.name].image;
		var type = GameScene.itemlist.items[config.name].type;
		var attributes = GameScene.itemlist.items[config.name].attributes;
		var collider = GameScene.itemlist.items[config.name].collider;
		var description = GameScene.itemlist.items[config.name].description;
		var stackable = GameScene.itemlist.items[config.name].stackable;
		// initialize sprite...
		if (image == null) {
			//single image
			super(config.scene, config.x, config.y, frame);
		} else {
			//image from spritesheet
			super(config.scene, config.x, config.y, image, frame);
		}
		// is it stackable?
		this.stackable = stackable;

		this.quantity = config.quantity;
		this.setDisplaySize(64, 64);
		this.scene = config.scene;
		this.scene.add.existing(this);
		// set name of item
		this.name = config.name;
		// size of hitbox of weapon
		this.collider = collider;
		// set attributes of item (for when we recreate items)
		if (config.attributes == null) {
			this.attributes = attributes;
		} else {
			this.attributes = config.attributes;
		}
		// type of item.. (weapon, armor, etc...)
		this.type = type;

		this.setInteractive({
			draggable: true,
			enabled: true
		});
		this.tooltip = new ItemTooltip({
			scene: this.scene,
			item: this,
			description: config.description
		});


		var style = {
			font: "bold 12px Helvetica",
			fill: "white",
			wordWrap: { width: 280 }
		};
		this.text = this.scene.add.text(0, 0, this.quantity, style);
		this.setTextPosition(config.x, config.y);
	}

	setTextPosition(x, y) {
		this.text.text = this.quantity;
		this.text.x = x - 30;
		this.text.y = y - 33;
	}
}
