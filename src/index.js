import "phaser";
import InterfaceScene from "./interface";
import GameScene from "./game";
import LoadScene from "./load";

var config = {
	type: Phaser.WEBGL,
	antialias: false,
	parent: "content",
	physics: {
		default: "arcade",
		arcade: { debug: true }
	},
	backgroundColor: 0x666666,
	width: 1600,
	height: 900,
	scene: [LoadScene, GameScene, InterfaceScene]
};

const game = new Phaser.Game(config);
