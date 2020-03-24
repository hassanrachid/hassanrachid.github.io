import Player from "./player";
import Orc from "./enemy/orc";
import ItemList from "./itemlist";

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

		let trees = this.physics.add.staticGroup();
		treeLayer.forEach(object => {
			let obj = trees.create(object.x, object.y, "tree");
			obj.body.width = object.width - 150;
			obj.body.height = object.height - 150;
			obj.body.x = obj.x - 50;
			obj.setOrigin(0.5, 1);
		});

		this.physics.add.collider(this.player.container, trees, null)

		this.physics.world.bounds.width = groundLayer.width;
		this.physics.world.bounds.height = groundLayer.height;

		this.enemies = this.add.group();
		this.goblin = new Orc({
			scene: this,
			x: 300,
			y: 300,
			key: "orc"
		});
		this.enemies.add(this.goblin);

		this.cameras.main.setBounds(0, 0, 6400, 6400);
		this.cameras.main.startFollow(this.player.container, true, 0.5, 0.5);
	}

	update() {
		this.player.update(this.cursors);
		this.enemies.getChildren().forEach(c => c.update());
	}
}
