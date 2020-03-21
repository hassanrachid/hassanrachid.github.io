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
		// initialize sprite...
		super(config.scene, config.x, config.y, image, frame);

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
			item: this
		});


	}
}
