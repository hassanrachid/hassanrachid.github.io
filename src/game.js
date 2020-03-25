import Player from "./player";
import Orc from "./enemy/orc";
import ItemList from "./itemlist";
import Tree from "./tree";

export default class GameScene extends Phaser.Scene {
	constructor() {
		super({
			key: "GameScene"
		});
	}

	preload() {}

	create() {
		this.cursors = this.input.keyboard.addKeys({
			left: "a",
			right: "d",
			up: "w",
			down: "s",
			space: "space"
		});

		this.itemlist = new ItemList();
		this.player = new Player({
			scene: this,
			x: 0,
			y: 0,
			key: "warrior"
		});

		const map = this.make.tilemap({ key: "map" });
		const tileset = map.addTilesetImage("Tiles", "tiles");
		const groundLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
		const treeLayer = map.getObjectLayer("Trees")["objects"];

		this.trees = this.physics.add.staticGroup();
		treeLayer.forEach(object => {
			let obj = new Tree({scene: this, x: object.x, y: object.y, width: object.width, height: object.height, key: "tree"});
			this.trees.add(obj, true);
			obj.setBounds();
		});

		this.physics.add.collider(this.player.container, this.trees, null);

		this.physics.world.bounds.width = groundLayer.width;
		this.physics.world.bounds.height = groundLayer.height;

		this.enemies = this.add.group();

		this.cameras.main.setBounds(0, 0, 6400, 6400);
		this.cameras.main.startFollow(this.player.container, true, 1, 1);
	}

	update() {
		this.player.update(this.cursors);
		this.enemies.getChildren().forEach(c => c.update());
		this.trees.getChildren().forEach(c => c.update());
	}
}
