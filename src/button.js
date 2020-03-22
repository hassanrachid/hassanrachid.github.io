export default class Button extends Phaser.GameObjects.Rectangle {
    constructor(config) {
		super(config.scene, config.x, config.y, config.width, config.height);
        this.scene = config.scene;
        this.text = config.text;

        this.scene.add.existing(this);
        
        this.isStroked = true;
        this.setOrigin(0, 0);
        this.setInteractive({ enabled: true });
        
        this.scene.add.text(config.x + config.width/2, config.y + config.height/2, this.text, {
			font: "bold 12px Helvetica",
			fill: "white",
            wordWrap: { width: 280 },
            align: 'center'
		}).setOrigin(0.5, 0.5);
        
        this.on("pointerdown", () => {
			this.setFillStyle(0x00000);
        });
        
        this.on("pointerup", () => {
			this.setFillStyle();
		});
    }
}