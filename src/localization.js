/**
 * Locatization es un sitio en el mapa
 * @param scene
 * @param image
 * @param X
 * @param Y 
 * @param width es la escala de la imagen en X
 * @param height
 * @param colliderGroup // este es el grupo donde se añade para poder colisionar
 * @param scenario //en nombre de la localización donde tiene que ir en la siguiente escena
 */
export default class Localization extends Phaser.GameObjects.Sprite{
    constructor(scene, image, x, y, width, height, colliderGroup, scenario) {
		super(scene, x, y, image);
        
        this.setScale(width, height);
		
        this.scene.add.existing(this);

        this.scenario = scenario;

        // Activamos la física para este sprite
        this.scene.physics.world.enable(this);

        // Desactivamos la gravedad para la iguana

        // Hacemos el cuerpo inmovible para que no reaccione a colisiones
        this.body.setImmovable(true);

        
        // Creamos un collider extra
        //this.extraCollider = this.scene.physics.add.sprite(x, y, null); // sin textura
        
        let zone = new Phaser.GameObjects.Zone(this.scene, x, y, this.body.width * 1.3, this.body.height * 1.5);
        this.scene.physics.add.existing(zone);
        this.scene.add.existing(zone);
        zone.body.setImmovable(true);
        // Configuramos las dimensiones y posición del collider extra
        //this.extraCollider.setSize(70, 50); // Establecemos el tamaño del collider extra
        /*
        this.extraCollider.setSize(this.body.width * 1.3, this.body.height * 1.5);
        this.extraCollider.setPosition(x, y); // Posicionamos el collider extra en las coordenadas deseadas
        this.extraCollider.body.setAllowGravity(false); // Desactivamos la gravedad para el collider extra
        this.extraCollider.body.setImmovable(true); // Hacemos el collider extra inmovible
        */
        this.extraCollider = zone; //TODO ESTO HAY QUE CAMBIARLOOOOOOOO
        colliderGroup.add(this);

    }
}