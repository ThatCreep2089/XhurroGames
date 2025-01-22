/**
 * Building es una manzana inaccesible utilizada como collider
 * @param scene
 * @param image
 * @param X
 * @param Y 
 * @param width es la escala de la imagen en X
 * @param height
 * @param colliderGroup // este es el grupo donde se añade para poder colisionar
 */
export default class Building extends Phaser.GameObjects.Zone {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height); // Crear la zona en lugar de un sprite
        
        // Añadir la zona a la escena
        scene.add.existing(this);

        // Habilitar física para la zona
        scene.physics.world.enable(this);

        // Establecer la zona como inmovible (similar a un collider estático)
        this.body.setImmovable(true);

        // Asegurar que no tenga gravedad
        this.body.setAllowGravity(false);
    }
}
