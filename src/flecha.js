export default class Flecha extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, colliderGroup, modo, ant) {
		super(scene, x, y, 'flecha');
        this.setScale(0.06);
		this.scene.add.existing(this);

        this.modo = modo;
        this.ant = ant;

        // Activamos la física para este sprite
        this.scene.physics.world.enable(this);

        // Desactivamos la gravedad para la iguana
        this.body.setAllowGravity(false);

        // Hacemos el cuerpo inmovible para que no reaccione a colisiones
        this.body.setImmovable(true);

        
        // Creamos un collider extra
        this.extraCollider = this.scene.physics.add.sprite(x, y, null); // sin textura
        // Configuramos las dimensiones y posición del collider extra
        //this.extraCollider.setSize(70, 50); // Establecemos el tamaño del collider extra
        
        this.extraCollider.setSize(this.body.width * 1.5, this.body.height * 1.5);
        this.extraCollider.setPosition(x, y); // Posicionamos el collider extra en las coordenadas deseadas
        this.extraCollider.body.setAllowGravity(false); // Desactivamos la gravedad para el collider extra
        this.extraCollider.body.setImmovable(true); // Hacemos el collider extra inmovible
        
        colliderGroup.add(this);

    }
}