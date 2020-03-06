export default class ItemSlot extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, item) {
        super(scene, x, y, width, height);
        this.item = item;
    }
}