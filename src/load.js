export default class LoadScene extends Phaser.Scene {
	constructor() {
		super({
			key: "LoadScene"
		});
	}

	preload() {
		const progressBar = this.add.graphics();
		const progressBox = this.add.graphics();
		var width = this.cameras.main.width;
		var height = this.cameras.main.height;
		var loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 35,
			text: "Loading...",
			style: {
				font: "20px monospace",
				fill: "#ffffff"
			}
		});
		var percentText = this.make.text({
			x: width / 2,
			y: height / 2 + 15,
			text: "0%",
			style: {
				font: "18px monospace",
				fill: "#ffffff"
			}
		});
		percentText.setOrigin(0.5, 0.5);
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(width / 2 - 160, height / 2 - 10, 320, 50);
		loadingText.setOrigin(0.5, 0.5);

		// Register a load progress event to show a load bar
		this.load.on("progress", value => {
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(width / 2 - 150, height / 2, 300 * value, 30);
			percentText.setText(parseInt(value * 100) + "%");
		});

		// Register a load complete event to launch the title screen when all files are loaded
		this.load.on("complete", () => {
			// prepare all animations, defined in a separate file
			percentText.destroy();
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			this.scene.start("GameScene");
			this.scene.launch("InterfaceScene");
		});

		this.load.image(
			"inventorybackground",
			"assets/inventory/inventorybackground.png"
		);
		this.load.image("inventory", "assets/utilityicons/1.png");
		this.load.image("abilities", "assets/utilityicons/2.png");
		this.load.image("skills", "assets/utilityicons/3.png");
		this.load.image("equipment", "assets/utilityicons/4.png");
		this.load.image("itemtooltip", "assets/inventory/itemtooltip.png");
		this.load.image("inventoryframe", "assets/inventory/inventoryframe.png");
		this.load.image(
			"equipmentframe",
			"assets/inventory/equipmentinterface.png"
		);

		this.load.image("warrior", "assets/warrior.png");


		this.load.atlas({
			key: "armor",
			textureURL: "assets/armor/armor.png",
			atlasURL: "assets/armor/armor.json"
		});
		this.load.atlas({
			key: "swords",
			textureURL: "assets/weapons/swords.png",
			atlasURL: "assets/weapons/swords.json"
		});

		this.load.atlas({
			key: "goblinattack",
			textureURL: "assets/enemy/goblin/attack/spritesheet.png",
			atlasURL: "assets/enemy/goblin/attack/spritesheet.json"
		});
		this.load.atlas({
			key: "goblinidle",
			textureURL: "assets/enemy/goblin/idle/spritesheet.png",
			atlasURL: "assets/enemy/goblin/idle/spritesheet.json"
		});
		this.load.atlas({
			key: "goblinhurt",
			textureURL: "assets/enemy/goblin/hurt/spritesheet.png",
			atlasURL: "assets/enemy/goblin/hurt/spritesheet.json"
		});
		this.load.atlas({
			key: "goblindie",
			textureURL: "assets/enemy/goblin/die/spritesheet.png",
			atlasURL: "assets/enemy/goblin/die/spritesheet.json"
		});
		this.load.atlas({
			key: "goblinwalk",
			textureURL: "assets/enemy/goblin/walk/spritesheet.png",
			atlasURL: "assets/enemy/goblin/walk/spritesheet.json"
		});

		this.load.atlas({
			key: "idle_front",
			textureURL: "assets/warrior/idle_front/spritesheet.png",
			atlasURL: "assets/warrior/idle_front/spritesheet.json"
		});
		this.load.atlas({
			key: "idle_side",
			textureURL: "assets/warrior/idle_side/spritesheet.png",
			atlasURL: "assets/warrior/idle_side/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front",
			textureURL: "assets/warrior/attack_front/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side",
			textureURL: "assets/warrior/attack_side/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/spritesheet.json"
		});
		this.load.atlas({
			key: "walk_front",
			textureURL: "assets/warrior/walk_front/spritesheet.png",
			atlasURL: "assets/warrior/walk_front/spritesheet.json"
		});
		this.load.atlas({
			key: "walk_side",
			textureURL: "assets/warrior/walk_side/spritesheet.png",
			atlasURL: "assets/warrior/walk_side/spritesheet.json"
		});
		this.load.atlas({
			key: "firestrike",
			textureURL: "assets/wizard/animations/spells/fire/spritesheet.png",
			atlasURL: "assets/wizard/animations/spells/fire/spritesheet.json"
		});
	}

	create() {
		this.anims.create({
			key: "goblinidle",
			frames: this.anims.generateFrameNames("goblinidle"),
			frameRate: 30,
			repeat: -1
		});
		this.anims.create({
			key: "goblinwalk",
			frames: this.anims.generateFrameNames("goblinwalk"),
			frameRate: 30,
			repeat: -1
		});
		this.anims.create({
			key: "goblinhurt",
			frames: this.anims.generateFrameNames("goblinhurt"),
			frameRate: 30,
			repeat: 0
		});
		this.anims.create({
			key: "goblinattack",
			frames: this.anims.generateFrameNames("goblinattack"),
			frameRate: 30,
			repeat: 0
		});
		this.anims.create({
			key: "goblindie",
			frames: this.anims.generateFrameNames("goblindie"),
			frameRate: 30,
			repeat: 0
		});
		this.anims.create({
			key: "idle_front",
			frames: this.anims.generateFrameNames("idle_front"),
			frameRate: 30,
			repeat: -1
		});
		this.anims.create({
			key: "walk_front",
			frames: this.anims.generateFrameNames("walk_front"),
			frameRate: 60,
			repeat: -1,
		});
		this.anims.create({
			key: "attack_front",
			frames: this.anims.generateFrameNames("attack_front"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_side",
			frames: this.anims.generateFrameNames("attack_side"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "walk_side",
			frames: this.anims.generateFrameNames("walk_side"),
			frameRate: 60,
			repeat: -1,
		});
		this.anims.create({
			key: "idle_side",
			frames: this.anims.generateFrameNames("idle_side"),
			frameRate: 60,
			repeat: -1,
		});
		this.anims.create({
			key: "firestrike",
			frames: this.anims.generateFrameNames("firestrike"),
			frameRate: 30,
			repeat: 0,
			hideOnComplete: true,
			showOnStart: true
		});
	}
}
