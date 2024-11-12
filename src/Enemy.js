export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy'); 
        scene.add.existing(this);

        this.setDisplaySize(250, 250); //tamaño

        this.health = 80; //vida
        this.weakness = 'espadas'; //debilidad
    }

    //metodo recibir daño
    takeDamage(damage) {
        this.health -= damage;
    }

    // Método de ataque
    attackPlayer(player) {
        const damage = Phaser.Math.Between(10, 80);
        player.takeDamage(damage);
        //debug
        console.log('Daño enemigo: ' + damage);
    }
}
