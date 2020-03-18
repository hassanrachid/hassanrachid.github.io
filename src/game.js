import Player from "./player";
import Orc from "./enemy/orc";
import ItemList from './itemlist';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super({
			key: "GameScene"
		});
	}

	preload() { }

	create() {
		this.cursors = this.input.keyboard.addKeys({
			left: "a",
			right: "d",
			up: "w",
			down: "s",
			space: "space",
			spell1: "q",
			spell2: "w",
			spell3: "e",
			spell4: "r"
		});

		this.itemlist = new ItemList();
		this.player = new Player({
			scene: this,
			x: 0,
			y: 0,
			key: "warrior"
		});
		this.enemies = this.add.group();


		this.goblin = new Orc({
			scene: this,
			x: 100,
			y: 300,
			key: "orc",
			isEnemy: true
		});
		this.enemies.add(this.goblin);
	}

	update() {
		this.player.update(this.cursors);
		this.enemies.getChildren().forEach(c => c.update());
	}
}
