import "phaser";
import Player from "phaser3-project-template/src/player";

var config = {
	type: Phaser.AUTO,
	antialias: false,
	parent: "phaser-example",
	physics: {
		default: "arcade",
		arcade: { debug: true }
	},
	backgroundColor: 0x666666,
	width: 1600,
	height: 900,
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var cursors;

function preload() {
	this.load.image("wizard", "assets/wizard.png");
	this.load.image("sword", "assets/5.png");

	this.load.atlas({
		key: "idle",
		textureURL: "assets/wizard/animations/idle/spritesheet.png",
		atlasURL: "assets/wizard/animations/idle/spritesheet.json"
	});

	this.load.atlas({
		key: "walk",
		textureURL: "assets/wizard/animations/walk/spritesheet.png",
		atlasURL: "assets/wizard/animations/walk/spritesheet.json"
	});

	this.load.atlas({
		key: "firestrike",
		textureURL: "assets/wizard/animations/spells/fire/spritesheet.png",
		atlasURL: "assets/wizard/animations/spells/fire/spritesheet.json"
	});
}

function create() {
	this.anims.create({
		key: "idle",
		frames: this.anims.generateFrameNames("idle"),
		frameRate: 30,
		repeat: -1
	});
	this.anims.create({
		key: "walk",
		frames: this.anims.generateFrameNames("walk"),
		frameRate: 30,
		repeat: -1
	});
	this.anims.create({
		key: "firestrike",
		frames: this.anims.generateFrameNames("firestrike"),
		frameRate: 30,
		repeat: 0,
		hideOnComplete: true,
		showOnStart: true
	});
	cursors = this.input.keyboard.addKeys({
		left: "a",
		right: "d",
		up: "w",
		down: "s",
		spell1: "q",
		spell2: "w",
		spell3: "e",
		spell4: "r"
	});

	this.player = new Player({
		scene: this,
		x: 400,
		y: 300,
		key: "player"
	});
}

function update() {
	this.player.update(cursors);
}
