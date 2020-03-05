export default class StateMachine {
    constructor(sprite, scene) {
        this.sprite = sprite;
        this.scene = scene
        this.attacking = false;
        this.previousState = "IdleState";

        this.sprite.on("animationupdate-attack_side", function (anim, frame) {
            this.AdjustColliderBox(this.sprite.direction);
            if (frame.isLast) {
                this.attacking = false;
                this.ResetColliderBox();
            }
        }, this);

        this.sprite.on("animationstart-attack_side", function () {
            this.attacking = true;
        }, this);

        this.sprite.on("animationupdate-attack_front", function (anim, frame) {
            this.AdjustColliderBox(this.sprite.direction);
            if (frame.isLast) {
                this.attacking = false;
                this.ResetColliderBox();
            }
        }, this);

        this.sprite.on("animationstart-attack_front", function () {
            this.attacking = true;
        }, this);
    }

    IdleState() {
        this.sprite.anims.play("idle_" + this.sprite.direction, true);
    }

    MoveState() {
        this.attacking = false;
        this.sprite.anims.play("walk_" + this.sprite.direction, true);
    }

    AttackState() {
        this.sprite.anims.play("attack_" + this.sprite.direction, true);
    }

    UpdateState(state) {
        if (this.previousState != state) {
            this.StateChanged(this.previousState, state);
        }
        this.previousState = state;
        this[state]();
    }

    StateChanged(previousState, state) {
        // this detects whenever a state has changedds 
    }

    AdjustColliderBox(direction) {
        // first center collider box on body..
        if (direction == "side") {
            if (!this.sprite.flipX) {
                this.sprite.collider.body.setOffset(-60, 0);
            } else {
                this.sprite.collider.body.setOffset(60, 0);
            }
        }
        if (direction == "front") {
            this.sprite.collider.body.setOffset(0, 80);
        }
        console.log(this.sprite.equipment.getItem("weapon"))
    }

    ResetColliderBox() {
        this.sprite.collider.body.setOffset(0, 0);
    }

}