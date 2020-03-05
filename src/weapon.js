import Item from "./item";

export default class Weapon extends Item {
    constructor(config) {
        super(config.scene, config.x, config.y, config.image, config.frame);
        this.type = "weapon";
    }
}