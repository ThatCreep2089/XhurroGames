import Iguana from '../src/iguana.js'
import Building from '../src/building.js'
import Localization from './localization.js';

export default class Test extends Phaser.Scene
{
    constructor()
    {
        super({key: "test"});
    }


    init(data){
    }

    preload()
    {
        this.load.image('fondo', 'assets/ejZona.jpg'); //fondo
        this.load.image('iguana', 'assets/iguana.png'); //personaje
        this.load.image('building', 'assets/building.png'); //building
        this.load.image('localization', 'assets/localization.png');
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

        // Recupera la posición desde `gameState` o usa la posición inicial predeterminada
        let startPosition = window.gameState.iguanaPosition || { x: 296, y: 150 };

        //instanciar iguana
        let iguana = new Iguana(this, startPosition.x, startPosition.y);
        

        //instanciar building
        let building = new Building(this, 175, 238.5);

        //instanciar localization
        let localization = new Localization(this, 200, 100);


        this.physics.add.collider(iguana, building); //Colision iguana con building
        this.physics.add.collider(iguana, localization); //Colision iguana con building

        this.physics.add.overlap(iguana, localization.extraCollider, (iguana, extraCollider) => {
			if(iguana.isInteractingPressed()) {
                // Guarda la posición de `iguana` en `gameState`
                window.gameState.iguanaPosition = { x: iguana.x, y: iguana.y };
                
                //cambiar escena
                this.scene.start('localizationScene');
			} 				
		});


        
        // botones para testeo
        const changeMovement = this.add.rectangle(400, 150, 100, 50, 0xffffff)
            .setInteractive()
            .on('pointerdown', () => iguana.changeMove());
            
    }




    update(time, dt){
        
        
       
    }

}