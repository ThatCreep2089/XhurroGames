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
export default class Box extends Phaser.GameObjects.Sprite{
    constructor(scene, image, x, y, width, height, colliderGroup) {
        super(scene, x, y, image);
        
        // Añadir a la escena
        scene.add.existing(this);

        // Habilitar físicas
        scene.physics.world.enable(this);
        
        // Desactivar gravedad y hacerlo inmovible
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        // Ajustar el tamaño visual
        this.setDisplaySize(width, height); // Llamar primero a este método

        // Asegurarte de que el colisionador tenga el tamaño correcto
        this.setScale(width, height); // Ajustar el colisionador al tamaño visual

        // Añadir al grupo de colisiones
        colliderGroup.add(this);
    }

}