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
    
        // Aseguramos que el collider esté centrado en el sprite
        this.body.setOffset(
            (this.width - this.body.width) / 2,
            (this.height - this.body.height) / 2
        );
    
        // Añadimos el sprite al grupo de colliders
        colliderGroup.add(this);
    }
    
}