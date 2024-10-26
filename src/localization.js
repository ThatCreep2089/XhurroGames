export default class Localization extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, colliderGroup, scenario) {
		super(scene, x, y, 'localization');
        this.setScale(0.19);
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
        
        this.extraCollider.setSize(this.body.width * 1.5, this.body.height * 1.5);
        this.extraCollider.setPosition(x, y); // Posicionamos el collider extra en las coordenadas deseadas
        this.extraCollider.body.setAllowGravity(false); // Desactivamos la gravedad para el collider extra
        this.extraCollider.body.setImmovable(true); // Hacemos el collider extra inmovible
        
        colliderGroup.add(this);

        // Llama a la función que configura la colisión
        //this.setupCollision();

    }

    setupCollision(){
        this.scene.physics.add.overlap(this.scene.iguana, this.extraCollider, (iguana, extraCollider) => {
        
            
        });
    }
}