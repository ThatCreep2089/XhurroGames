/**
 * Player es un objeto que representa al jugador en el juego.
 * El jugador tiene una cantidad de vida, una cantidad de mana y cualidades.
 * El jugador puede moverse por el mapa.
 * El jugador puede atacar a un enemigo en combate y recibir daño.
 * El jugador puede interactuar con objetos del mapa.
 * El jugador puede mejorar sus cualidades, modificar ansiedad y curarse.
 * 
 */


export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite = 'player') {
        super(scene, x, y, sprite); 
        scene.add.existing(this);
        this.setDisplaySize(150, 150); //tamaño
        
        //atributos de movimiento (andrea)
        this.speed = 200; //velocidad
        this.isMoving = true;
        this.isInteracting = false; //para ver si está interactuando
        this.setScale(0.012);

         // Activamos la física para este sprite
         this.scene.physics.world.enable(this);

         // Decimos que el player colisiona con los límites del mundo
         this.body.setCollideWorldBounds();
 
         // Desactivamos la gravedad para el player
         this.body.setAllowGravity(false);
 
         // Seteamos las teclas para mover al personaje
        this.wKey = this.scene.input.keyboard.addKey('W'); //arriba
        this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
        this.sKey = this.scene.input.keyboard.addKey('S'); //abajo
        this.dKey = this.scene.input.keyboard.addKey('D'); //derecha
        this.eKey = this.scene.input.keyboard.addKey('E'); //entrar

        //atributos combate (victor)
        this.health = 100; //vida player
        this.mana = 50; //mana
        this.maxMana=400;
        this.maxHealth = 100;
        //cualidades
        this.humildad = 1;
        this.trabajoDuro = 1;
        this.agnosticismo = 1;
        this.afecto = 1;

        this.ansiedad=0;
        this.maxAnsiedad=100;
      
    }

    init(config){
        //atributos combate (victor)
        this.health = config.health; //vida player
        this.mana = config.mana; //mana
        this.maxMana=config.maxMana;
        this.maxHealth = config.maxHealth;
        //cualidades
        this.humildad = config.humildad;
        this.trabajoDuro = config.trabajoDuro;
        this.agnosticismo = config.agnosticismo;
        this.afecto = config.afecto;
        this.ansiedad= config.ansiedad;
        this.maxAnsiedad= config.maxAnsiedad;
    }

    getConfigData(){
        return {
            health : this.health, //vida player
            mana : this.mana, //mana
            maxMana : this.maxMana,
            maxHealth : this.maxHealth,
            //cualidades
            humildad : this.humildad,
            trabajoDuro : this.trabajoDuro,
            agnosticismo : this.agnosticismo,
            afecto : this.afecto,
            ansiedad : this.ansiedad,
            maxAnsiedad : this.maxAnsiedad,
        }
    }
//Metodos inventario (Nerea)

HealPlayer(amount)
{
    console.log("vida antes", this.health)
    if(this.health+amount < this.maxHealth){
    this.health+=amount;
    }
    else {
        this.health = this.maxHealth;
    }
console.log("vida ahora", this.health)
}

MaxLife(amount)
{
this.maxHealth+=amount;
}

LessAnxiety(amount)
{
    if(this.ansiedad-amount < 0){
        this.ansiedad=0;
        }
        else {
            this.ansiedad-= this.ansiedad;
        }

}

IncreaseAnxiety(amount)
{
    if(this.ansiedad+amount < this.maxAnsiedad){
        this.ansiedad+=amount;
        }
        else {
            this.ansiedad = this.maxAnsiedad;
        }

}

HealQuality(amount)
{
    if(this.mana+amount < this.maxMana){
        this.mana+=amount;
        }
        else {
            this.mana = this.maxMana;
        }


}

//métodos de combate (victor)
    // Método de ataque
    attackEnemy(damage) {

        if(this.ansiedad >= 40) {
            damage = damage / 2;
        }
        enemy.takeDamage(damage);

    }

    // Método de reducir mana
    manaPerdido(manaPerdido) {

            this.mana -= manaPerdido;

    }

    //metodo recibir daño
    takeDamage(damage) {
        this.health -= damage;
    }



//métodos movimiento (andrea)
    preUpdate(t, dt)
    {
        super.preUpdate(t, dt);

        if(this.isMoving == true)
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

            if (this.eKey.isDown) {
                this.isInteracting = true;
            }

            if(Phaser.Input.Keyboard.JustUp(this.eKey))
            {
                this.isInteracting = false;
            }

        }
        
       
    }

    isInteractingPressed()
    {
        return this.isInteracting;
    }

    changeMove(bool)
    {
        this.isMoving = bool;
    }

    getCualidad(cualidad) {
        switch(cualidad) {
            case 'humildad' :
                return this.humildad;
            case 'trabajo duro':
                return this.trabajoDuro;
            case 'agnosticismo':
                return this.agnosticismo;
            case 'afecto':
                return this.afecto;
        }
    }
    

mejorarCualidad(cualidad) {
    switch (cualidad) {
        case 'humildad':
            this.humildad += 1;
            break;
        case 'trabajo duro':
            this.trabajoDuro += 1;
            break;
        case 'agnosticismo':
            this.agnosticismo += 1;
            break;
        case 'afecto':
            this.afecto += 1;
            break;
        default:
            console.log('cualidad no valida');
    }
}

}
