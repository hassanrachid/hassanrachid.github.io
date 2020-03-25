export default class Tree extends Phaser.GameObjects.Sprite {
	constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        this.width = config.width;
        this.height = config.height;
        this.scene = config.scene;
        this.x = config.x;
        this.y = config.y;

        this.collider = this.scene.physics.add.image(this.x, this.y);
        this.collider.setSize(this.width, this.height);
		this.collider.setDebugBodyColor(0xffff00);
        this.collider.setImmovable(true);
        this.collider.sprite = this;
        this.setDepth(9999);
    }

    update() {
        if (this.scene.physics.overlap(this.scene.player.container, this.collider, null)) {
            this.alpha = 0.5;
        } else {
            this.alpha = 0.8;
        }
    }

    setBounds() {
        this.body.width = this.width - 150;
		this.body.height = this.height - 150;
		this.body.x = this.x - 50;
        this.body.y = this.y;
    }

    damage(damage) {
        console.log(damage);
    }
}
