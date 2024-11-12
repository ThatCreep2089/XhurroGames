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
        this.speed = 200; //velocidad
        
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

    update(time, delta)
    {
        this.player.move(true, delta / 1000);
    }

    //metodo mover personaje
    move(enabled, delta) {
        if (enabled) {
            const moveSpeed = this.speed * delta;
    
            if (this.aKey.isDown) {
                this.body.setVelocityX(-moveSpeed);
            } else if (this.dKey.isDown) {
                this.body.setVelocityX(moveSpeed);
            } else {
                this.body.setVelocityX(0);
            }
    
            if (this.wKey.isDown) {
                this.body.setVelocityY(-moveSpeed);
            } else if (this.sKey.isDown) {
                this.body.setVelocityY(moveSpeed);
            } else {
                this.body.setVelocityY(0);
            }
        }
    }
    

}