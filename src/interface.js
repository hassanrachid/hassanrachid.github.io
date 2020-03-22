import Button from "./button";
import Orc from './enemy/orc'

export default class InterfaceScene extends Phaser.Scene {
	constructor() {
		super({
			key: "InterfaceScene"
		});
	}

	preload() {}

	create() {
		this.gamescene = this.game.scene.keys["GameScene"];
		this.spawnGoblin = new Button({ scene: this, width: 100, height: 25, x: 1490, y: 10, key: "button", text: "Spawn Goblin" });
		this.spawnGoblin.on('pointerdown', () => {
			var random = Math.random() * 500;
			this.gamescene.enemies.add(new Orc({
				scene: this.gamescene,
				x: random,
				y: random,
				key: "orc"
			}));
		})

		this.input.topOnly = false;
	}
}
