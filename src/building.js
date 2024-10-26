export default class Box extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, colliderGroup) {
		super(scene, x, y, 'building');
		this.setScale(0.19);
		this.scene.add.existing(this);

        // Activamos la física para este sprite
        this.scene.physics.world.enable(this);

        // Desactivamos la gravedad para la iguana
        this.body.setAllowGravity(false);

        // Hacemos el cuerpo inmovible para que no reaccione a colisiones
        this.body.setImmovable(true);

    }



}