export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, enemy) {
        super(scene, x, y, enemy);

        scene.add.existing(this);

        this.setDisplaySize(250, 250); //tamaño

        this.health = 80; //vida

        switch(enemy){ //debilidad
            case 'espadas':
                this.weakness = 'espadas'; 
                break;
            case 'bastos':
                this.weakness = 'bastos'; 
                break;
            case 'oros':
                this.weakness = 'oros'; 
                break;
            case 'copas':
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
        const damage = Phaser.Math.Between(10, 20);
        player.takeDamage(damage);
        //debug
        console.log('Daño enemigo: ' + damage);
    }

    //devuelve la debilidad
    getWeakness(){
        return this.weakness;
    }
}
