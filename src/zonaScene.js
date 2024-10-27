import Iguana from './iguana.js';
import Building from './building.js';
import Localization from './localization.js';
import Flecha from './flecha.js';

export default class ZonaScene extends Phaser.Scene{
    constructor()
    {
        super({key: "zonaScene"});
    }


    init(){
    }

    preload() //CARGAR TODOS LOS RECURSOS
    {
        //FONDOS
        this.load.image('fondo1', 'assets/ejZona.jpg'); //fondo
        this.load.image('fondo2', 'assets/zona2.jpg'); //fondo 2
        this.load.image('fondo3', 'assets/zona3.jpg'); //fondo 3

        //IGUANA
        this.load.image('iguana', 'assets/iguana.png'); //future elle

        //IMAGENES BUILDINGS
        this.load.image('building', 'assets/building.png');

        //IMAGENES LOCALIZATIONS
        this.load.image('localization', 'assets/localization.png');

        //FLECHAS
        this.load.image('flecha', 'assets/flecha.png');

    }

    create(data){
        
        //1. PINTAR FONDO
            let fondo = 'fondo1';
            if(data.modo == 2) fondo = 'fondo2';
            else if(data.modo == 3)  fondo ='fondo3';

            //Crear y escalar fondo
            var back = this.add.image(0, 0, fondo).setOrigin(0, 0);

            var scaleX = this.cameras.main.width / back.width;
            var scaleY = this.cameras.main.height / back.height;
            var scale = Math.min(scaleX, scaleY);
            
            back.setScale(scale);
            
            back.setPosition(
                this.cameras.main.width / 2 - back.displayWidth / 2,
                this.cameras.main.height / 2 - back.displayHeight / 2
            );


        //2. AÑADIR ELEMENTOS ZONA 
        
            // Declarar los grupos de objetos
            let buildings = this.add.group();
            let localizations = this.add.group();
            let flechas = this.add.group();

            if(data.modo == 2){
                
                //GRUPO BUILDINGS
                    


                //GRUPO FLECHAS
                let flecha1 = new Flecha(this, 150, 350, flechas, 1);
                let flecha3 = new Flecha(this, 500, 250, flechas, 3);
                
                //BOTONES TESTEO
                    //back to modo 1
                    const backScene = this.add.rectangle(150, 300, 100, 50, 0x000000)
                    .setInteractive()
                    .on('pointerdown', () => this.scene.restart({ modo: 1 }));
            }
            else if(data.modo == 3){
                
                //GRUPO BUILDINGS
                
                
                
                //GRUPO FLECHAS
                let flecha2 = new Flecha(this, 150, 350, flechas, 2);

                //BOTONES TESTEO
                    //back to modo 1
                    const backScene = this.add.rectangle(150, 300, 100, 50, 0x000000)
                    .setInteractive()
                    .on('pointerdown', () => this.scene.restart({ modo: 1 }));
            }
            else{
                
                //GRUPO BUILDINGS
                    let building1 = new Building(this, 175, 238.5, 0.23, 0.2, buildings);
                    let building2 = new Building(this, 389, 238.5, 0.17, 0.195, buildings);

                //GRUPO LOCALIZATIONS
                    //let localization1 = new Localization(this, 300, 100, localizations, 'parque');
                    let localization2 = new Localization(this, 480, 190, 0.6, 0.3, localizations, 'puente');

                //GRUPO FLECHAS
                    let flecha2 = new Flecha(this, 150, 350, flechas, 2);

            }

       
            
        //3. ELEMENTOS EN COMÚN

            //IGUANA
                // Recupera la posición desde `gameState` o usa la posición inicial predeterminada
                let startPosition = window.gameState.iguanaPosition || { x: 296, y: 150 };

                //instanciar iguana
                let iguana = new Iguana(this, startPosition.x, startPosition.y);


            //COLISIONES CON IGUANA 
                this.physics.add.collider(iguana, buildings); //Colision iguana con building
                this.physics.add.collider(iguana, localizations); //Colision iguana con localizations

                //cambios de escena con localizations
                localizations.children.iterate((localization) => {
                    this.physics.add.overlap(iguana, localization.extraCollider, (iguana, extraCollider) => {
                        if (iguana.isInteractingPressed()) {
                            console.log("cambiar escena");
    
                            // Guarda la posición de `iguana` en `gameState`
                            window.gameState.iguanaPosition = { x: iguana.x, y: iguana.y };
    
                            // Cambiar escena
                            this.scene.start('localizationScene', { fondo: localization.scenario });
                        }
                    });
                });

                //recargar escena con flechas
                flechas.children.iterate((flecha) => {
                    this.physics.add.overlap(iguana, flecha.extraCollider, (iguana, extraCollider) => {
                        if (iguana.isInteractingPressed()) {
                            console.log("recargar escena " + flecha.modo);
    
                            // Guarda la posición de `iguana` en `gameState`
                            window.gameState.iguanaPosition = { x: iguana.x, y: iguana.y };
    
                            // Cambiar escena
                            //this.scene.restart({ modo: flecha.modo });
                            this.scene.stop('zonaScene'); // Detener la escena actual
                            this.scene.start('zonaScene', { modo: flecha.modo });
                        }
                    });
                });

            
            //BOTONES TESTEO
                //habilitar/deshabilitar movimiento Iguana
                const changeMovement = this.add.rectangle(500, 80, 100, 50, 0x00ff00)
                    .setInteractive()
                    .on('pointerdown', () => iguana.changeMove());

    }

    update(time, dt){

    }

}