import Attributes from "./attributes";
import HealthBar from "./healthbar";
export default class BaseCharacter extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, 0, 0, config.key);
		this.scene = config.scene;
		this.scene.add.existing(this);

		// create a container for the player
		this.container = this.scene.add.container();
		this.container.setSize(this.width, this.height);
		this.container.x = config.x;
		this.container.y = config.y;
		this.container.add(this);
		this.scene.physics.world.enable(this.container);
		this.container.setScale(0.5);
		this.container.sprite = this;

		// weapon collider
		this.collider = this.scene.physics.add.image();
		this.collider.body.setCircle(60);
		this.collider.setDebugBodyColor(0xffff00);
		this.container.add(this.collider);

		// so the player cant go outside the world map
		this.container.body.setCollideWorldBounds(true);

		this.attributes = new Attributes({
			health: 100,
			strength: 10,
			agility: 0,
			defense: 0,
			intelligence: 0
		});
		// modify these values when equipping items,
		// also only use these values when calculating damage to enemy
		this.attributesWithEquipment = new Attributes({
			health: this.attributes.health,
			strength: this.attributes.strength,
			agility: this.attributes.agility,
			defense: this.attributes.defense,
			intelligence: this.attributes.intelligence
		});

		this.healthbar = new HealthBar(this.container, this.scene);
	}

	update() {
		this.statemachine.UpdateState(this.state);
		this.healthbar.update();

		// Update states of player based on velocity and if player is attacking
		if (this.container.body) {
			if (this.container.body.velocity.x == 0 && this.container.body.velocity.y == 0) {
				this.state = "IdleState";
			}

			if (this.container.body.velocity.x != 0 || this.container.body.velocity.y != 0) {
				this.state = "MoveState";
			}

			if (this.statemachine.dying) {
				this.state = "DieState";
			}

			if (this.statemachine.hurting) {
				this.state = "HurtState";
			}

			if (this.statemachine.attacking) {
				this.state = "AttackState";
			}

			if (!this.statemachine.attacking) {
				this.centerBodyOnBody(this.collider.body, this.container.body);
			}
		}
	}

	damage(damage) {
		this.attributes.currentHealth -= damage;
		if (this.attributes.currentHealth <= 0) {
			this.state = "DieState";
		} else {
			this.state = "HurtState";
		}
	}

	resetAttributes() {
		this.attributesWithEquipment.strength = this.attributes.strength;
		this.attributesWithEquipment.intelligence = this.attributes.intelligence;
		this.attributesWithEquipment.agility = this.attributes.agility;
		this.attributesWithEquipment.defense = this.attributes.defense;
		this.attributesWithEquipment.health = this.attributes.health;
	}

	centerBodyOnBody(a, b) {
		a.position.set(b.x + b.halfWidth - a.halfWidth, b.y + b.halfHeight - a.halfHeight);
	}

	distance(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;

		return Math.sqrt(dx * dx + dy * dy);
	}

	setDirection(direction) {
		if (!this.statemachine.attacking) {
			this.direction = direction;
		}
	}
}
