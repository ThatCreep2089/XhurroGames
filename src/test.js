import Iguana from '../src/iguana.js'
import Building from '../src/building.js'

export default class Test extends Phaser.Scene
{
    constructor()
    {
        super({key: "test"});
        this.moving = true;
    }


    init(){

    }

    preload()
    {
        this.load.image('fondo', 'assets/ejZona.jpg'); //fondo
        this.load.image('iguana', 'assets/iguana.png'); //personaje
        this.load.image('building', 'assets/building.png'); //building
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
        let iguana = new Iguana(this, 300, 150);
        

        //instanciar building
        let building = new Building(this, 200, 150);


        this.physics.add.collider(iguana, building); //Colision iguana con building
        
        
        // botones para testeo
        const attackButton = this.add.rectangle(400, 150, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', () => this.changeMove());
    }

    changeMove() //para desactivar/activar el movimiento
    {
        if(this.moving == true)
        {
            this.moving = false;
        }
        else{
            this.moving = true;
        }
    }

    update(time, dt){
        
        // Actualiza iguana 
        /*
        if(this.moving == true)
        {
            iguana.move();
        }
        */
       
    }

}