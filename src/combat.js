export default class Combat {
    constructor(sprite, collider, scene) {
        this.sprite = sprite;
        this.collider = collider;
        this.scene = scene;
        this.collided = false;

        this.sprite.on(
            "animationupdate",
            (frame, index, key) => {
                if (frame.key.includes("attack")) {
                    if (index.progress == 0.50) {
                        this.scene.physics.world.overlap(
                            this.collider,
                            this.scene.enemies,
                            this.Collision
                        );
                    }


                }
            },
            this
        );
    }

    Collision(o1, o2) {
        var style = { font: "24px Verdana", fill: '#FF0000', align: "center" };
        var text = o1.scene.add.text(o2.x, o2.y - 25, "15", style);
        text.setOrigin(0.5);
        o1.scene.tweens.add({
            targets: text, duration: 300, ease: 'Cubic', y: o2.y - (Math.random() + 75),
            onComplete: () => {
                text.destroy();
            }, callbackScope: this
        });
    }
}