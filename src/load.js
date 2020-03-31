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

		this.load.image('tiles', 'assets/map/Tiles.png');
		this.load.image('tree', 'assets/map/tree.png');

		this.load.tilemapTiledJSON('map', 'assets/map/map.json');

		this.load.image("inventorybackground", "assets/inventory/inventorybackground.png");
		this.load.image("inventory", "assets/utilityicons/1.png");
		this.load.image("abilities", "assets/utilityicons/2.png");
		this.load.image("skills", "assets/utilityicons/3.png");
		this.load.image("equipment", "assets/utilityicons/4.png");
		this.load.image("exit", "assets/utilityicons/exit.png");
		this.load.image("itemtooltip", "assets/inventory/itemtooltip.png");
		this.load.image("inventoryframe", "assets/inventory/inventoryframe.png");

		this.load.image("equipmentframe", "assets/inventory/equipmentinterface.png");

		// misc items
		this.load.image("wood_cut", "assets/misc items/wood_cut.png");
		this.load.image("arrow", "assets/misc items/Arrow.png");


		this.load.image("warrior", "assets/warrior.png");
		this.load.image("orc", "assets/orc.png");

		this.load.atlas({
			key: "armor",
			textureURL: "assets/armor/armor.png",
			atlasURL: "assets/armor/armor.json"
		});

		this.load.atlas({
			key: "blood",
			textureURL: "assets/particles/blood/blood.png",
			atlasURL: "assets/particles/blood/blood.json"
		});
		this.load.text('bloodeffect', 'assets/particles/blood/bloodeffect.json');
		this.load.text('treehit', 'assets/particles/tree/treehit.json');

		// weapons
		this.load.atlas({
			key: "swords",
			textureURL: "assets/weapons/swords.png",
			atlasURL: "assets/weapons/swords.json"
		});

		this.load.atlas({
			key: "bows",
			textureURL: "assets/weapons/bows.png",
			atlasURL: "assets/weapons/bows.json"
		});

		this.load.atlas({
			key: "spears",
			textureURL: "assets/weapons/spears.png",
			atlasURL: "assets/weapons/spears.json"
		});

		this.load.atlas({
			key: "axes",
			textureURL: "assets/weapons/axes.png",
			atlasURL: "assets/weapons/axes.json"
		});

		// player animations
		this.load.atlas({
			key: "idle_back",
			textureURL: "assets/warrior/idle_back/spritesheet.png",
			atlasURL: "assets/warrior/idle_back/spritesheet.json"
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
			key: "walk_back",
			textureURL: "assets/warrior/walk_back/spritesheet.png",
			atlasURL: "assets/warrior/walk_back/spritesheet.json"
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
		// back animations
		this.load.atlas({
			key: "attack_back_Short Sword",
			textureURL: "assets/warrior/attack_back/Short Sword/spritesheet.png",
			atlasURL: "assets/warrior/attack_back/Short Sword/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_back_Gold Sword",
			textureURL: "assets/warrior/attack_back/Gold Sword/spritesheet.png",
			atlasURL: "assets/warrior/attack_back/Gold Sword/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_back_Iron Sword",
			textureURL: "assets/warrior/attack_back/Iron Sword/spritesheet.png",
			atlasURL: "assets/warrior/attack_back/Iron Sword/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_back_Steel Sword",
			textureURL: "assets/warrior/attack_back/Steel Sword/spritesheet.png",
			atlasURL: "assets/warrior/attack_back/Steel Sword/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_back_Silverlight",
			textureURL: "assets/warrior/attack_back/Silverlight/spritesheet.png",
			atlasURL: "assets/warrior/attack_back/Silverlight/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_back_Iron Axe",
			textureURL: "assets/warrior/attack_back/Iron Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_back/Iron Axe/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_back_Steel Axe",
			textureURL: "assets/warrior/attack_back/Steel Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_back/Steel Axe/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_back_Silver Axe",
			textureURL: "assets/warrior/attack_back/Silver Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_back/Silver Axe/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_back_Hardened Axe",
			textureURL: "assets/warrior/attack_back/Hardened Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_back/Hardened Axe/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_back_Platinum Axe",
			textureURL: "assets/warrior/attack_back/Platinum Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_back/Platinum Axe/spritesheet.json"
		});
		
		// front animations
		this.load.atlas({
			key: "attack_front_Bow",
			textureURL: "assets/warrior/attack_front/Bow/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Bow/spritesheet.json"
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
			key: "attack_front_Steel Sword",
			textureURL: "assets/warrior/attack_front/Steel Sword/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Steel Sword/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front_Silverlight",
			textureURL: "assets/warrior/attack_front/Silverlight/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Silverlight/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front_Short Spear",
			textureURL: "assets/warrior/attack_front/Short Spear/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Short Spear/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front_Iron Spear",
			textureURL: "assets/warrior/attack_front/Iron Spear/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Iron Spear/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front_Steel Spear",
			textureURL: "assets/warrior/attack_front/Steel Spear/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Steel Spear/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front_Hardened Spear",
			textureURL: "assets/warrior/attack_front/Hardened Spear/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Hardened Spear/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front_Onyx Spear",
			textureURL: "assets/warrior/attack_front/Onyx Spear/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Onyx Spear/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front_Iron Axe",
			textureURL: "assets/warrior/attack_front/Iron Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Iron Axe/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front_Steel Axe",
			textureURL: "assets/warrior/attack_front/Steel Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Steel Axe/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front_Silver Axe",
			textureURL: "assets/warrior/attack_front/Silver Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Silver Axe/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front_Hardened Axe",
			textureURL: "assets/warrior/attack_front/Hardened Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Hardened Axe/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_front_Platinum Axe",
			textureURL: "assets/warrior/attack_front/Platinum Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_front/Platinum Axe/spritesheet.json"
		});

		// side animations
		this.load.atlas({
			key: "attack_side_Bow",
			textureURL: "assets/warrior/attack_side/Bow/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Bow/spritesheet.json"
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
			key: "attack_side_Steel Sword",
			textureURL: "assets/warrior/attack_side/Steel Sword/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Steel Sword/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Silverlight",
			textureURL: "assets/warrior/attack_side/Silverlight/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Silverlight/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Short Spear",
			textureURL: "assets/warrior/attack_side/Short Spear/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Short Spear/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Iron Spear",
			textureURL: "assets/warrior/attack_side/Iron Spear/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Iron Spear/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Steel Spear",
			textureURL: "assets/warrior/attack_side/Steel Spear/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Steel Spear/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Hardened Spear",
			textureURL: "assets/warrior/attack_side/Hardened Spear/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Hardened Spear/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Onyx Spear",
			textureURL: "assets/warrior/attack_side/Onyx Spear/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Onyx Spear/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Iron Axe",
			textureURL: "assets/warrior/attack_side/Iron Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Iron Axe/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Steel Axe",
			textureURL: "assets/warrior/attack_side/Steel Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Steel Axe/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Silver Axe",
			textureURL: "assets/warrior/attack_side/Silver Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Silver Axe/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Hardened Axe",
			textureURL: "assets/warrior/attack_side/Hardened Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Hardened Axe/spritesheet.json"
		});
		this.load.atlas({
			key: "attack_side_Platinum Axe",
			textureURL: "assets/warrior/attack_side/Platinum Axe/spritesheet.png",
			atlasURL: "assets/warrior/attack_side/Platinum Axe/spritesheet.json"
		});
		

		// orc animations..
		this.load.atlas({
			key: "orcidle_front",
			textureURL: "assets/enemy/orc/idle_front/spritesheet.png",
			atlasURL: "assets/enemy/orc/idle_front/spritesheet.json"
		});
		this.load.atlas({
			key: "orcdying_front",
			textureURL: "assets/enemy/orc/dying_front/spritesheet.png",
			atlasURL: "assets/enemy/orc/dying_front/spritesheet.json"
		});
		this.load.atlas({
			key: "orchurt_front",
			textureURL: "assets/enemy/orc/hurt_front/spritesheet.png",
			atlasURL: "assets/enemy/orc/hurt_front/spritesheet.json"
		});
		this.load.atlas({
			key: "orcwalk_front",
			textureURL: "assets/enemy/orc/walk_front/spritesheet.png",
			atlasURL: "assets/enemy/orc/walk_front/spritesheet.json"
		});

		// tree animation
		this.load.atlas({
			key: "tree_cut",
			textureURL: "assets/animations/treecut/spritesheet.png",
			atlasURL: "assets/animations/treecut/spritesheet.json"
		});
	}

	create() {
		// #region PLAYER ANIMATIONS
		this.anims.create({
			key: "idle_back",
			frames: this.anims.generateFrameNames("idle_back"),
			frameRate: 30,
			repeat: -1
		});
		this.anims.create({
			key: "idle_front",
			frames: this.anims.generateFrameNames("idle_front"),
			frameRate: 30,
			repeat: -1
		});
		this.anims.create({
			key: "walk_back",
			frames: this.anims.generateFrameNames("walk_back"),
			frameRate: 60,
			repeat: -1
		});
		this.anims.create({
			key: "walk_front",
			frames: this.anims.generateFrameNames("walk_front"),
			frameRate: 60,
			repeat: -1
		});
		this.anims.create({
			key: "walk_side",
			frames: this.anims.generateFrameNames("walk_side"),
			frameRate: 60,
			repeat: -1
		});
		this.anims.create({
			key: "idle_side",
			frames: this.anims.generateFrameNames("idle_side"),
			frameRate: 60,
			repeat: -1
		});

		// back animations
		this.anims.create({
			key: "attack_back_Short Sword",
			frames: this.anims.generateFrameNames("attack_back_Short Sword"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_back_Iron Sword",
			frames: this.anims.generateFrameNames("attack_back_Iron Sword"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_back_Gold Sword",
			frames: this.anims.generateFrameNames("attack_back_Gold Sword"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_back_Steel Sword",
			frames: this.anims.generateFrameNames("attack_back_Steel Sword"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_back_Silverlight",
			frames: this.anims.generateFrameNames("attack_back_Silverlight"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_back_Iron Axe",
			frames: this.anims.generateFrameNames("attack_back_Iron Axe"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_back_Steel Axe",
			frames: this.anims.generateFrameNames("attack_back_Steel Axe"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_back_Silver Axe",
			frames: this.anims.generateFrameNames("attack_back_Silver Axe"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_back_Hardened Axe",
			frames: this.anims.generateFrameNames("attack_back_Hardened Axe"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_back_Platinum Axe",
			frames: this.anims.generateFrameNames("attack_back_Platinum Axe"),
			frameRate: 60,
			repeat: 0,
		});

		// front animations
		this.anims.create({
			key: "attack_front_Bow",
			frames: this.anims.generateFrameNames("attack_front_Bow"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_front_Short Sword",
			frames: this.anims.generateFrameNames("attack_front_Short Sword"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_front_Iron Sword",
			frames: this.anims.generateFrameNames("attack_front_Iron Sword"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_front_Gold Sword",
			frames: this.anims.generateFrameNames("attack_front_Gold Sword"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_front_Steel Sword",
			frames: this.anims.generateFrameNames("attack_front_Steel Sword"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_front_Silverlight",
			frames: this.anims.generateFrameNames("attack_front_Silverlight"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_front_Short Spear",
			frames: this.anims.generateFrameNames("attack_front_Short Spear"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_front_Iron Spear",
			frames: this.anims.generateFrameNames("attack_front_Iron Spear"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_front_Steel Spear",
			frames: this.anims.generateFrameNames("attack_front_Steel Spear"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_front_Hardened Spear",
			frames: this.anims.generateFrameNames("attack_front_Hardened Spear"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_front_Onyx Spear",
			frames: this.anims.generateFrameNames("attack_front_Onyx Spear"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_front_Iron Axe",
			frames: this.anims.generateFrameNames("attack_front_Iron Axe"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_front_Steel Axe",
			frames: this.anims.generateFrameNames("attack_front_Steel Axe"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_front_Silver Axe",
			frames: this.anims.generateFrameNames("attack_front_Silver Axe"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_front_Hardened Axe",
			frames: this.anims.generateFrameNames("attack_front_Hardened Axe"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_front_Platinum Axe",
			frames: this.anims.generateFrameNames("attack_front_Platinum Axe"),
			frameRate: 60,
			repeat: 0,
		});

		// side animations
		this.anims.create({
			key: "attack_side_Bow",
			frames: this.anims.generateFrameNames("attack_side_Bow"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_side_Short Sword",
			frames: this.anims.generateFrameNames("attack_side_Short Sword"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_side_Iron Sword",
			frames: this.anims.generateFrameNames("attack_side_Iron Sword"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_side_Gold Sword",
			frames: this.anims.generateFrameNames("attack_side_Gold Sword"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_side_Steel Sword",
			frames: this.anims.generateFrameNames("attack_side_Steel Sword"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_side_Silverlight",
			frames: this.anims.generateFrameNames("attack_side_Silverlight"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_side_Short Spear",
			frames: this.anims.generateFrameNames("attack_side_Short Spear"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_side_Iron Spear",
			frames: this.anims.generateFrameNames("attack_side_Iron Spear"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_side_Steel Spear",
			frames: this.anims.generateFrameNames("attack_side_Steel Spear"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_side_Hardened Spear",
			frames: this.anims.generateFrameNames("attack_side_Hardened Spear"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_side_Onyx Spear",
			frames: this.anims.generateFrameNames("attack_side_Onyx Spear"),
			frameRate: 60,
			repeat: 0
		});
		this.anims.create({
			key: "attack_side_Iron Axe",
			frames: this.anims.generateFrameNames("attack_side_Iron Axe"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_side_Steel Axe",
			frames: this.anims.generateFrameNames("attack_side_Steel Axe"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_side_Silver Axe",
			frames: this.anims.generateFrameNames("attack_side_Silver Axe"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_side_Hardened Axe",
			frames: this.anims.generateFrameNames("attack_side_Hardened Axe"),
			frameRate: 60,
			repeat: 0,
		});
		this.anims.create({
			key: "attack_side_Platinum Axe",
			frames: this.anims.generateFrameNames("attack_side_Platinum Axe"),
			frameRate: 60,
			repeat: 0,
		});
		//#endregion

		// orc animations
		this.anims.create({
			key: "orcidle_front",
			frames: this.anims.generateFrameNames("orcidle_front"),
			frameRate: 30,
			repeat: 0
		});
		this.anims.create({
			key: "orcdying_front",
			frames: this.anims.generateFrameNames("orcdying_front"),
			frameRate: 30,
			repeat: 0
		});
		this.anims.create({
			key: "orchurt_front",
			frames: this.anims.generateFrameNames("orchurt_front"),
			frameRate: 30,
			repeat: 0
		});
		this.anims.create({
			key: "orcwalk_front",
			frames: this.anims.generateFrameNames("orcwalk_front"),
			frameRate: 30,
			repeat: 0
		});

		// tree animations
		this.anims.create({
			key: "tree_cut",
			frames: this.anims.generateFrameNames("tree_cut"),
			frameRate: 30,
			repeat: 0
		});
	}	
}
