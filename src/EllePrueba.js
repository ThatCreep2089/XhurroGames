export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'elle'); 
        scene.add.existing(this); //para añadir a la escena
        this.setDisplaySize(50, 50);
        
        //ATRIBUTOS
        this.health = 100;
        this.attack = 25;
        this.magic = 50;
        this.anxiety = 0; //empieza en 0


        //MOV
        this.speed = 140; //velocidad
        
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

    // Método de ataque
    attackEnemy(enemy) {

        var espadas = Phaser.Math.Between(1, 12);
        var copas = Phaser.Math.Between(1, 12);
        var bastos = Phaser.Math.Between(1, 12);
        var oros = Phaser.Math.Between(1, 12);

        console.log('espadas: ' +espadas + ', copas: ' + copas + ', bastos: ' + bastos + ', oros: ' + oros);

        var totalAttack = espadas + copas + bastos + oros;
        enemy.takeDamage(totalAttack);
        console.log("ataque normal: " + totalAttack);
    }

    // Método de magia
    useMagic(enemy) {
        if (this.magic >= 20) {
            enemy.takeDamage(50);
            this.magic -= 20;
            console.log("ataque especial: " + this.magic)
        }
    }


    changeSprite()
    {
        //cambio de sprite dependiendo del modo
        //move o combat
    }


    //metodo mover personaje
    move(enabled)
    {
        //no haria falta creo
        if(enabled == true) //si no está habilitado no hace nada
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

}