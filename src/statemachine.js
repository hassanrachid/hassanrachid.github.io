export default class StateMachine {
    constructor(sprite, scene) {
        this.sprite = sprite;
        this.scene = scene
        this.attacking = false;
        this.previousState = "IdleState";

        this.sprite.on("animationupdate", function (anim, frame) {
            if (anim.key.includes("attack")) {
                this.AdjustColliderBox(this.sprite.direction);
                if (frame.isLast) {
                    this.attacking = false;
                    this.ResetColliderBox();
                }
            }
        }, this);

        this.sprite.on("animationstart", function (anim) {
            if (anim.key.includes("attack")) {
                this.attacking = true;
            }
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
        this.sprite.anims.play("attack_" + this.sprite.direction + "_" + this.sprite.equipment.getItem("weapon").name, true);
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
        // console.log(this.sprite.equipment.getItem("weapon"))
    }

    ResetColliderBox() {
        this.sprite.collider.body.setOffset(0, 0);
    }

}