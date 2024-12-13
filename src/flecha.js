/**
 * Building es una manzana inaccesible utilizada como collider
 * @param scene
 * @param image
 * @param X
 * @param Y
 * @param colliderGroup // este es el grupo donde se añade para poder colisionar
 * @param modo // valor para determinar el siguiente modo de ZonaScene
 * @param ant // valor para determinar el modo anterior de ZonaScene
 */
export default class Flecha extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, colliderGroup, modo, ant) {
        super(scene, x, y, 'flecha');
        
        // Agregamos el sprite a la escena
        this.scene.add.existing(this);
    
        this.modo = modo;
        this.ant = ant;
    
        // Activamos la física para este sprite
        this.scene.physics.world.enable(this);
    
        // Desactivamos la gravedad para el sprite
        this.body.setAllowGravity(false);
    
        // Hacemos el cuerpo inmovible para que no reaccione a colisiones
        this.body.setImmovable(true);
    
        // Configuramos el tamaño del collider principal del sprite
        this.body.setSize(this.body.width * 1.3, this.body.height * 1.3);
    
        this.updateCollider();
    
        // Añadimos el sprite al grupo de colliders
        colliderGroup.add(this);
    }

    // Actualiza la posición del collider
    updateCollider() {
        let offsetX = (this.width - this.body.width) / 2;
        let offsetY = (this.height - this.body.height) / 2;

        if (this.scaleX < 0) {
            const additionalOffset = 200;
            offsetX += this.width + additionalOffset;
        }

        if (this.scaleY < 0) {
            offsetY += this.height;
        }

        this.body.setOffset(offsetX, offsetY);
    }

    // setScale sobreescrito para ajustar el collider (por si la escala es negativa)
    setScale(x, y) {
        super.setScale(x, y);
        this.updateCollider();
        return this;
    }
    
}