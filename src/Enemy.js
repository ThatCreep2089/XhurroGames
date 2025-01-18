/**
 * Enemy es un objeto que representa a un enemigo en el juego.
 * Un enemigo tiene una cantidad de vida y una debilidad,
 * excepto si es un enemigo final, entonces no tiene debilidad.
 */

export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, enemy) {
        super(scene, x, y, enemy);

        scene.add.existing(this);

        this.setDisplaySize(250, 250); //tamaño

        this.health = 80; //vida


        //aclaración: el switch recibe enemy porque el tipo de debilidad es su tipo de boss, 
        //el cual viene dado en "enemy" que es el sprite y a su vez el tipo,
        //perdón Toni no nos mates 
        switch(enemy){ //debilidad
            case 'ESPADAS':
                this.weakness = 'espadas'; 
                break;
            case 'BASTOS':
                this.weakness = 'bastos'; 
                break;
            case 'OROS':
                this.weakness = 'oros'; 
                break;
            case 'COPAS':
                this.weakness = 'copas'; 
                break;
            default: 
                this.weakness = 'no';
        }

        
    }

    //metodo recibir daño
    takeDamage(totalDamage) {

    this.health -= totalDamage;
    }

    // Método de ataque
    attackPlayer(player) {
        const damage = Phaser.Math.Between(10, 50);
        player.takeDamage(damage);
        //debug
       // console.log('Daño enemigo: ' + this.weakness + " " + damage);
    }

    //devuelve la debilidad
    getWeakness(){
        return this.weakness;
    }
}
