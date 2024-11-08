import Player from '../src/Player.js';
import Building from '../src/building.js';
import Localization from '../src/localization.js';
import Flecha from '../src/flecha.js';

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
        this.load.image('fondo1', 'assets/fondo2.jpeg'); //fondo 1
        this.load.image('fondo2', 'assets/fondo2.jpeg'); //fondo 2
        this.load.image('fondo3', 'assets/zona3.jpg'); //fondo 3

        //IGUANA
        this.load.image('player', 'assets/elle.png'); //future elle

        //IMAGENES BUILDINGS
        this.load.image('building1', 'assets/building1.png'); //clarito
        this.load.image('building3', 'assets/building3.png'); //oscuro
        this.load.image('building4', 'assets/building4.png'); //mediano

        //IMAGENES LOCALIZATIONS
        this.load.image('localization1', 'assets/cni.png');
        this.load.image('localization2', 'assets/bar.png');
        this.load.image('localization3', 'assets/hipodromo.png');

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
            let startPosition = window.gameState.playerPosition || { x: 278, y: 150 }; //posicion de la tenfe

            if(data.modo == 2){
                
                //GRUPO BUILDINGS
                    let building1 = new Building(this, 'building3', 45, 45, 0.07, 0.08, buildings);
                    let building2 = new Building(this, 'building4', 193, 45, 0.115, 0.09, buildings);
                    let building3 = new Building(this, 'building1', 333, 45, 0.065, 0.087, buildings);
                    let building4 = new Building(this, 'building4', 452, 45, 0.08, 0.09, buildings);
                    let building5 = new Building(this, 'building3', 607, 45, 0.115, 0.082, buildings);
                    let building11 = new Building(this, 'building1', 45, 262, 0.078, 0.09, buildings);
                    let building13 = new Building(this, 'building3', 85, 405, 0.135, 0.082, buildings);

                //GRUPO LOCALIZATIONS
                    //let localization1 = new Localization(this, 300, 100, localizations, 'parque');
                    let localization1 = new Localization(this, 'localization1', 172, 278, 0.1, 0.1, localizations, 'cni');
                    let localization2 = new Localization(this, 'localization2', 316, 82, 0.1, 0.1, localizations, 'bar');
                    let localization3 = new Localization(this, 'localization3', 484, 255, 0.1, 0.1, localizations, 'hipodromo');

                //GRUPO FLECHAS
                    let flecha1 = new Flecha(this, 20, 115, flechas, 1, 2);
                    let flecha3 = new Flecha(this, 600, 115, flechas, 3, 2);
                
                if(data.ant == 1)
                {
                    startPosition= { x: 20, y: 115 };
                }
                else if (data.ant == 3)
                {
                    startPosition= { x: 600, y: 115 };
                }
                
            }
            else if(data.modo == 3){
                
                //GRUPO BUILDINGS
                
                
                
                //GRUPO FLECHAS
                let flecha2 = new Flecha(this, 150, 350, flechas, 2, 3);

                startPosition= { x: 150, y: 350 };

            }
            else{
                let flecha1 = new Flecha(this, 600, 115, flechas, 2, 1);
                
                if(data.ant == 2)
                {
                    startPosition= { x: 600, y: 115 };
                }
                

            }

       
            
        //3. ELEMENTOS EN COMÚN

            //IGUANA
                // Recupera la posición desde `gameState` o usa la posición inicial predeterminada
                //let startPosition = window.gameState.iguanaPosition || { x: 278, y: 150 };

                //instanciar player
                let player = new Player(this, startPosition.x, startPosition.y);


            //COLISIONES CON IGUANA 
                this.physics.add.collider(player, buildings); //Colision iguana con building
                this.physics.add.collider(player, localizations); //Colision iguana con localizations

                //cambios de escena con localizations
                localizations.children.iterate((localization) => {
                    this.physics.add.overlap(player, localization.extraCollider, (player, extraCollider) => {
                        if (player.isInteractingPressed()) {
                            console.log("cambiar escena");
    
                            // Guarda la posición de `iguana` en `gameState`
                            window.gameState.playerPosition = { x: player.x, y: player.y };
    
                            // Cambiar escena
                            this.scene.start('localizationScene', { fondo: localization.scenario, modo: data.modo });
                        }
                    });
                });

                //recargar escena con flechas
                flechas.children.iterate((flecha) => {
                    this.physics.add.overlap(player, flecha.extraCollider, (player, extraCollider) => {
                        if (player.isInteractingPressed()) {
                            console.log("recargar escena " + flecha.modo);
    
                            // Cambiar escena
                            //this.scene.restart({ modo: flecha.modo });
                            this.scene.stop('zonaScene'); // Detener la escena actual
                            this.scene.start('zonaScene', { modo: flecha.modo, ant: flecha.ant});
                        }
                    });
                });

            
            //BOTONES TESTEO
                //habilitar/deshabilitar movimiento Iguana
                const changeMovement = this.add.rectangle(500, 80, 100, 50, 0x00ff00)
                    .setInteractive()
                    .on('pointerdown', () => player.changeMove());

    }

    update(time, dt){

    }

}