export default class ItemSlot extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, item) {
        super(scene, x, y, width, height);
        this.item = item;
        this.image = new Phaser.GameObjects.Image(this.scene, x, y, "inventoryframe");

        this.scene.add.existing(this.image);


        this.on('pointerover', () => {
            this.image.tint = 0x00FF00;
        })
        this.on('pointerout', () => {
            this.image.clearTint();
        })
        
        this.scene.children.bringToTop(this);
    }
}