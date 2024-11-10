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
        this.load.image('fondo3', 'assets/fondo2.jpeg'); //fondo 3

        //IGUANA
        this.load.image('player', 'assets/elle.png'); //future elle

        //IMAGENES BUILDINGS
        this.load.image('building1', 'assets/building1.png'); //clarito
        this.load.image('building3', 'assets/building3.png'); //oscuro
        this.load.image('building4', 'assets/building4.png'); //mediano
        this.load.image('tenfe', 'assets/tenfe.png'); //tenfe

        //IMAGENES LOCALIZATIONS
        this.load.image('localization1', 'assets/parque.png');
        this.load.image('localization4', 'assets/cni.png');
        this.load.image('localization5', 'assets/bar.png');
        this.load.image('localization6', 'assets/hipodromo.png');
        


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
            let startPosition = window.gameState.playerPosition || { x: 900, y: 330 }; //posicion de la tenfe

            if(data.modo == 2){
                
                //GRUPO BUILDINGS
                /*
                    let building1 = new Building(this, 'building3', 45, 45, 0.07, 0.08, buildings);
                    let building2 = new Building(this, 'building4', 193, 45, 0.115, 0.09, buildings);
                    let building3 = new Building(this, 'building1', 333, 45, 0.065, 0.087, buildings);
                    let building4 = new Building(this, 'building4', 452, 45, 0.08, 0.09, buildings);
                    let building5 = new Building(this, 'building3', 607, 45, 0.115, 0.082, buildings);
                    let building11 = new Building(this, 'building1', 45, 262, 0.078, 0.09, buildings);
                    let building13 = new Building(this, 'building3', 85, 405, 0.135, 0.082, buildings);
                */

                //GRUPO LOCALIZATIONS
                    let localization4 = new Localization(this, 'localization4', 
                        this.sys.game.canvas.width / 3.4,
                        this.sys.game.canvas.height / 1.4,
                        0.43, 0.41, localizations, 'cni');
                    
                    let localization5 = new Localization(this, 'localization5',
                        this.sys.game.canvas.width / 2.04,
                        this.sys.game.canvas.height / 4.8,
                        0.4, 0.4, localizations, 'bar');
                    
                    let localization6 = new Localization(this, 'localization6',
                        this.sys.game.canvas.width / 1.21,
                        this.sys.game.canvas.height / 1.62,
                        0.4, 0.4, localizations, 'hipodromo');

                //GRUPO FLECHAS
                    let flecha1 = new Flecha(this,
                        this.sys.game.canvas.width / 22,
                        this.sys.game.canvas.height / 3.3,
                        flechas, 1, 2)
                        .setScale(0.2);
                    /*
                        let flecha3 = new Flecha(this,
                        this.sys.game.canvas.width / 1.05,
                        this.sys.game.canvas.height / 3.3,
                        flechas, 3, 2)
                        .setScale(0.2);
                        */
                
                if(data.ant == 1)
                {
                    startPosition= { x: this.sys.game.canvas.width / 22, y: this.sys.game.canvas.height / 3.3 };
                }
                else if (data.ant == 3)
                {
                    startPosition= { x: this.sys.game.canvas.width / 1.05, y: this.sys.game.canvas.height / 3.3 };
                }
                
            }
            else if(data.modo == 3){
                /*
                //GRUPO BUILDINGS
                
                
                
                //GRUPO FLECHAS
                let flecha2 = new Flecha(this, 150, 350, flechas, 2, 3).setScale(0.2);

                startPosition= { x: 150, y: 350 };
                */
            }
            else{
                
                //TENFE (por ahora actua como building)
                let building1 = new Building(this, 'tenfe',
                    this.sys.game.canvas.width / 1.8,
                    this.sys.game.canvas.height / 1.4,
                    0.1, 0.1, buildings);
                
                //GRUPO LOCALIZATIONS
                let localization4 = new Localization(this, 'localization1', 
                    this.sys.game.canvas.width / 3.4,
                    this.sys.game.canvas.height / 8,
                    0.68, 0.41, localizations, 'parque');
                
                
                let flecha1 = new Flecha(this, 
                    this.sys.game.canvas.width / 1.05,
                    this.sys.game.canvas.height / 3.3, 
                    flechas, 2, 1)
                    .setScale(0.2);
                
                if(data.ant == 2)
                {
                    startPosition= { x:  this.sys.game.canvas.width / 1.05, y: this.sys.game.canvas.height / 3.3 };
                }
                

            }

       
            
        //3. ELEMENTOS EN COMÚN

            //PLAYER
                //instanciar player
                let player = new Player(this, startPosition.x, startPosition.y);
                player.setScale(0.03);


            //COLISIONES CON IGUANA 
                this.physics.add.collider(player, buildings); //Colision player con building
                this.physics.add.collider(player, localizations); //Colision player con localizations

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

    }

    update(time, dt){

    }

}