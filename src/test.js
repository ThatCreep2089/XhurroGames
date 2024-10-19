import Iguana from '../src/iguana.js'

export default class Test extends Phaser.Scene
{
    constructor()
    {
        super({key: "test"});
    }


    init(){

    }

    preload()
    {
        this.load.image('fondo', 'assets/ejZona.jpg'); //fondo
        this.load.image('iguana', 'assets/iguana.png'); //personaje
    }

    create(){
        //Pintamos un fondo
        var back = this.add.image(0, 0, 'fondo').setOrigin(0, 0);
        
        //escalar el fondo
        var scaleX = this.cameras.main.width / back.width;
        var scaleY = this.cameras.main.height / back.height;
        
        var scale = Math.min(scaleX, scaleY);
        
        back.setScale(scale);
        
        back.setPosition(
            this.cameras.main.width / 2 - back.displayWidth / 2,
            this.cameras.main.height / 2 - back.displayHeight / 2
        );

        //back.setDisplaySize(this.cameras.main.width, this.cameras.main.height); //cambia el tamaño de la imagen segun el tamaño de la camara

        //instanciar iguana
        this.iguana = new Iguana(this, 300, 150);
        this.iguana.setScale(0.05); // Escalar la imagen de la iguana



    }

    update(time, dt){
        
        // Actualiza iguana
        this.iguana.preUpdate(dt);


    }

}