import Item from "./item";

export default class Armor extends Item {
    constructor(config) {
        super(config.scene, config.x, config.y, config.image, config.frame);
        this.type = "armor";
    }
}