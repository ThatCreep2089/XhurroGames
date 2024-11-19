export default class Localization extends Phaser.GameObjects.Sprite{
    constructor(scene, image, x, y, width, height, colliderGroup, scenario) {
		super(scene, x, y, image);
        
        this.setScale(width, height);
		
        this.scene.add.existing(this);

        this.scenario = scenario;

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
        
        this.extraCollider.setSize(Math.abs(this.body.width * 1.3), Math.abs(this.body.height * 1.5));
        this.extraCollider.setPosition(x, y); // Posicionamos el collider extra en las coordenadas deseadas
        this.extraCollider.body.setAllowGravity(false); // Desactivamos la gravedad para el collider extra
        this.extraCollider.body.setImmovable(true); // Hacemos el collider extra inmovible
        
        colliderGroup.add(this);

    }
}