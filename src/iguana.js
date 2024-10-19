export default class Iguana extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y)
    {
        super(scene, x, y, 'iguana');
        this.speed = 140; //velocidad

        this.scene.add.existing(this); //Añadimos iguana a la escena

        // Activamos la física para este sprite
        this.scene.physics.world.enable(this);

        // Decimos que el caballero colisiona con los límites del mundo
		this.body.setCollideWorldBounds();

        // Desactivamos la gravedad para la iguana
        this.body.setAllowGravity(false);

        // Seteamos las teclas para mover al personaje
		this.wKey = this.scene.input.keyboard.addKey('W'); //arriba
		this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
		this.sKey = this.scene.input.keyboard.addKey('S'); //abajo
		this.dKey = this.scene.input.keyboard.addKey('D'); //derecha

    }


    preUpdate()
    {
        // Mientras pulsemos la tecla 'A' movemos el personaje en la X
		if(this.aKey.isDown){
			//this.setFlip(true, false);
			
			//this.x -= this.speed*dt / 1000;
			this.body.setVelocityX(-this.speed);
		}

		// Mientras pulsemos la tecla 'D' movemos el personaje en la X
		if(this.dKey.isDown){
			//this.setFlip(false, false);

			//this.x += this.speed*dt / 1000;
			this.body.setVelocityX(this.speed);
		}

         // Movimiento hacia arriba con tecla 'W'
         if (this.wKey.isDown) {
            this.body.setVelocityY(-this.speed);
        }

        // Movimiento hacia abajo con tecla 'S'
        if (this.sKey.isDown) {
            this.body.setVelocityY(this.speed);
        }

        // Si dejamos de pulsar 'A' o 'D' volvemos al estado de animación'idle'
		// Phaser.Input.Keyboard.JustUp y Phaser.Input.Keyboard.JustDown nos aseguran detectar la tecla una sola vez (evitamos repeticiones)
		if(Phaser.Input.Keyboard.JustUp(this.aKey) || Phaser.Input.Keyboard.JustUp(this.dKey)){
			this.body.setVelocityX(0);
		}


        // Detener el movimiento vertical cuando soltamos 'W' o 'S'
        if (Phaser.Input.Keyboard.JustUp(this.wKey) || Phaser.Input.Keyboard.JustUp(this.sKey)) {
            this.body.setVelocityY(0);
        }



    }











}