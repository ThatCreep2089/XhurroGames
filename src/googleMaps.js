import Iguana from './iguana.js';
import Building from './building.js';
import Localization from './localization.js';
import Flecha from './flecha.js';

export default class GoogleMaps extends Phaser.Scene
{
    constructor()
    {
        super({key: "googleMaps"});
    }


    init(){



    }

    preload()
    {
        //IMAGENES FONDO
        this.load.image('fondo1', 'assets/ejZona.jpg'); //fondo
        this.load.image('fondo2', 'assets/zona2.jpg'); //fondo 2
        this.load.image('fondo3', 'assets/zona3.jpg'); //fondo 3

        //ELLE/IGUANA
        this.load.image('iguana', 'assets/iguana.png');

        //IMAGENES BUILDINGS
        this.load.image('building', 'assets/building.png'); //building

        //IMAGENES LOCALIZATIONS
        this.load.image('localization', 'assets/localization.png'); //localization

        //FLECHAS
        this.load.image('flecha', 'assets/flecha.png');
    }

    create(data){
        if(data.modo == 2)
        {
            const fondo = 'fondo' + data.modo;
            //Pintamos un fondo
            var back = this.add.image(0, 0, fondo).setOrigin(0, 0);

            //escalar el fondo
            var scaleX = this.cameras.main.width / back.width;
            var scaleY = this.cameras.main.height / back.height;
            
            var scale = Math.min(scaleX, scaleY);
            
            back.setScale(scale);
            
            back.setPosition(
                this.cameras.main.width / 2 - back.displayWidth / 2,
                this.cameras.main.height / 2 - back.displayHeight / 2
            );

            // botones para testeo
            const backScene = this.add.rectangle(150, 300, 100, 50, 0x000000)
            .setInteractive()
            .on('pointerdown', () => this.scene.restart({ modo: 1 }));


        }
        else if(data.modo == 3)
        {
            //Pintamos un fondo
            var back = this.add.image(0, 0, 'fondo3').setOrigin(0, 0);

            // botones para testeo
            const backScene = this.add.rectangle(150, 300, 100, 50, 0x000000)
            .setInteractive()
            .on('pointerdown', () => this.scene.restart({ modo: 1 }));
        }
        else{
            //FONDO
            var back = this.add.image(0, 0, 'fondo1').setOrigin(0, 0);
                
            //escalar el fondo
            var scaleX = this.cameras.main.width / back.width;
            var scaleY = this.cameras.main.height / back.height;
            
            var scale = Math.min(scaleX, scaleY);
            
            back.setScale(scale);
            
            back.setPosition(
                this.cameras.main.width / 2 - back.displayWidth / 2,
                this.cameras.main.height / 2 - back.displayHeight / 2
            );


            //IGUANA
            // Recupera la posición desde `gameState` o usa la posición inicial predeterminada
            let startPosition = window.gameState.iguanaPosition || { x: 296, y: 150 };

            //instanciar iguana
            let iguana = new Iguana(this, startPosition.x, startPosition.y);
            


            //GRUPO BUILDINGS
            let buildings = this.add.group();

            //instanciar building
            let building1 = new Building(this, 175, 238.5, buildings);
            let building2 = new Building(this, 450, 100, buildings);

            let localizations = this.add.group();

            //instanciar localization
            let localization1 = new Localization(this, 200, 100, localizations, 'parque');
            let localization2 = new Localization(this, 400, 300, localizations, 'puente');


            this.physics.add.collider(iguana, buildings); //Colision iguana con building
            this.physics.add.collider(iguana, localizations); //Colision iguana con building

            // Detectar superposición con todos los colliders extras en localizations
            localizations.children.iterate((localization) => {
                this.physics.add.overlap(iguana, localization.extraCollider, (iguana, extraCollider) => {
                    //console.log("collide");
                    if (iguana.isInteractingPressed()) {
                        console.log("cambiar escena");

                        // Guarda la posición de `iguana` en `gameState`
                        window.gameState.iguanaPosition = { x: iguana.x, y: iguana.y };

                        // Cambiar escena
                        this.scene.start('localizationScene', { fondo: localization.scenario });
                    }
                });
            });


            //FLECHAS
            let flechas = this.add.group();

            let flecha2 = new Flecha(this, 150, 350, flechas, 2);
            let flecha3 = new Flecha(this, 500, 250, flechas, 3);

            flechas.children.iterate((flecha) => {
                this.physics.add.overlap(iguana, flecha.extraCollider, (iguana, extraCollider) => {
                    if (iguana.isInteractingPressed()) {
                        console.log("recargar escena");

                        // Guarda la posición de `iguana` en `gameState`
                        window.gameState.iguanaPosition = { x: iguana.x, y: iguana.y };

                        // Cambiar escena
                        this.scene.restart({ modo: flecha.modo });
                    }
                });
            });



            
            // botones para testeo
            const changeMovement = this.add.rectangle(500, 300, 100, 50, 0xffffff)
                .setInteractive()
                .on('pointerdown', () => iguana.changeMove());
            
        }

    }
        
        
        




    update(time, dt){
        
        
       
    }

}