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
			key: "attack_front_Default",
			textureURL: "assets/warrior/attack_front/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front_Short Sword",
			textureURL: "assets/warrior/attack_front/Short Sword/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Short Sword/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front_Gold Sword",
			textureURL: "assets/warrior/attack_front/Gold Sword/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Gold Sword/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front_Iron Sword",
			textureURL: "assets/warrior/attack_front/Iron Sword/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Iron Sword/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Short Sword",
			textureURL: "assets/warrior/attack_side/Short Sword/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Short Sword/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Iron Sword",
			textureURL: "assets/warrior/attack_side/Iron Sword/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Iron Sword/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Gold Sword",
			textureURL: "assets/warrior/attack_side/Gold Sword/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Gold Sword/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Default",
			textureURL: "assets/warrior/attack_side/Default/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Default/spritesheet.json"
		});
	}

	create() {
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
			key: "attack_front_Default",
			frames: this.anims.generateFrameNames("attack_front_Default"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_front_Short Sword",
			frames: this.anims.generateFrameNames("attack_front_Short Sword"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_front_Iron Sword",
			frames: this.anims.generateFrameNames("attack_front_Iron Sword"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_front_Gold Sword",
			frames: this.anims.generateFrameNames("attack_front_Gold Sword"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_side_Short Sword",
			frames: this.anims.generateFrameNames("attack_side_Short Sword"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_side_Iron Sword",
			frames: this.anims.generateFrameNames("attack_side_Iron Sword"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_side_Gold Sword",
			frames: this.anims.generateFrameNames("attack_side_Gold Sword"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_side_Default",
			frames: this.anims.generateFrameNames("attack_side_Default"),
			frameRate: 60,
			repeat: 0,
		});

	}
}
