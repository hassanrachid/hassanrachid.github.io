import Attributes from './attributes';
import HealthBar from './healthbar';
export default class BaseCharacter extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        this.scene = config.scene;
        this.scene.add.existing(this);

        // create a container for the player
        this.container = this.scene.add.container(config.x, config.y);
        this.container.setSize(this.width, this.height);
        this.scene.physics.world.enable(this.container);
        this.container.add(this);
        this.container.setScale(0.5);
        this.container.sprite = this;

        // weapon collider
        this.collider = this.scene.physics.add.image();
        this.collider.body.setCircle(60);
        this.collider.setDebugBodyColor(0xffff00);
        this.container.add(this.collider)

        // so the player cant go outside the world map
        this.container.body.setCollideWorldBounds(true);

        this.attributes = new Attributes({
            health: 100,
            strength: 0,
            agility: 0,
            defense: 0,
            intelligence: 0
        })

        this.healthbar = new HealthBar(this.container, this.scene);

    }
}