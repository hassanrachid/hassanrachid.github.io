import Ability from "./ability";
import Inventory from "./inventory";
import UtilityBar from "./utilitybar";
import HealthBar from "./healthbar";
import Equipment from "./equipment";
import StateMachine from './statemachine';
import Combat from './combat';
import BaseCharacter from "./basecharacter";
import Attributes from "./attributes";
export default class Player extends BaseCharacter {
	constructor(config) {
		super(config);
		this.direction = "front";
		this.state = "IdleState";
		this.scene = config.scene;
		this.statemachine = new StateMachine(this, this.scene);

		// this.ability = new Ability({
		// 	scene: this.scene,
		// 	x: 0,
		// 	y: 0,
		// 	key: "firestrike"
		// });

		this.inventory = new Inventory({
			scene: this.scene.game.scene.keys["InterfaceScene"],
			x: 100,
			y: 580
		});

		this.equipment = new Equipment(
			this.scene.game.scene.keys["InterfaceScene"]
		);

		this.utilitybar = new UtilityBar({
			scene: this.scene.game.scene.keys["InterfaceScene"],
			x: 100,
			y: 860,
			width: 1792,
			height: 64,
			player: this
		});

		this.combat = new Combat(this, this.collider, this.scene);
	}

	update(cursors) {
		if (this.container) {
			this.statemachine.UpdateState(this.state);
			this.healthbar.update();
			this.container.body.setVelocity(0);

			// Horizontal movement
			if (cursors.left.isDown) {
				this.container.body.setVelocityX(-250);
				this.flipX = false;
				this.direction = "side";
			} else if (cursors.right.isDown) {
				this.container.body.setVelocityX(250);
				this.flipX = true;
				this.direction = "side";
			}

			// Vertical movement
			if (cursors.up.isDown) {
				this.container.body.setVelocityY(-250);
				this.direction = "front";
			} else if (cursors.down.isDown) {
				this.container.body.setVelocityY(250);
				this.direction = "front";
			}

			// so diagonal movement isnt too fast...
			this.container.body.velocity.normalize().scale(200, 200);

			if (!this.statemachine.attacking) {
				this.centerBodyOnBody(this.collider.body, this.container.body);
			}

			// Update states of player based on velocity and if player is attacking
			if (this.container.body.velocity.x == 0 && this.container.body.velocity.y == 0 && !this.statemachine.attacking) {
				this.state = "IdleState";
			}

			if ((this.container.body.velocity.x != 0 || this.container.body.velocity.y != 0) && !this.statemachine.attacking) {
				this.state = "MoveState";
			}

			if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
				this.state = "AttackState";
			}
		}

		// On if move state, check for any enemies near by, and then have the enemy move to the player

		this.scene.enemies.getChildren().forEach(e => {
			// have aggro distance configurable in enemy class ** TODO

			var d = this.distance(e.x, e.y, this.x, this.y);
			e.moveTo(this, d);
		});

		if (Phaser.Input.Keyboard.JustDown(cursors.spell1)) {
			this.ability.cast(this);
		}
	}

	distance(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;

		return Math.sqrt(dx * dx + dy * dy);
	}

	centerBodyOnBody(a, b) {
		a.position.set(
			b.x + b.halfWidth - a.halfWidth,
			b.y + b.halfHeight - a.halfHeight
		);
	}

}
