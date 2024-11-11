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
        this.load.image('fondo1', 'assets/fondos/fondo2.jpeg'); //fondo 1
        this.load.image('fondo2', 'assets/fondos/fondo2.jpeg'); //fondo 2
        this.load.image('fondo3', 'assets/fondos/fondo2.jpeg'); //fondo 3

        //IGUANA
        this.load.image('player', 'assets/npc/elle.png'); //future elle

        //IMAGENES BUILDINGS
        this.load.image('building1', 'assets/edificios/building1.png'); //clarito
        this.load.image('building3', 'assets/edificios/building3.png'); //oscuro
        this.load.image('building4', 'assets/edificios/building4.png'); //mediano
        this.load.image('tenfe', 'assets/edificios/tenfe.png'); //tenfe

        //IMAGENES LOCALIZATIONS
        this.load.image('localization1', 'assets/edificios/parque.png');
        this.load.image('localization4', 'assets/edificios/cni.png');
        this.load.image('localization5', 'assets/edificios/bar.png');
        this.load.image('localization6', 'assets/edificios/hipodromo.png');
        


        //FLECHAS
        this.load.image('flecha', 'assets/other/flecha.png');

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
                let tenfe = new Localization(this, 'tenfe',
                    this.sys.game.canvas.width / 1.8,
                    this.sys.game.canvas.height / 1.4,
                    0.1, 0.1, localizations, 'tenfeFondo');
                
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
    
                            if(localization.scenario == 'tenfeFondo')
                            {
                                // Cambiar escena
                                this.scene.start('tenfeScene', { fondo: localization.scenario});
                            }
                            else{
                                // Cambiar escena
                                this.scene.start('localizationScene', { fondo: localization.scenario, modo: data.modo });
                            }
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


                // botones para testeo
                let inventarioButton = this.add.rectangle(
                    this.sys.game.canvas.width / 14,
                    this.sys.game.canvas.height / 1.5, 
                    50, 50, 0xffe800)
                .setInteractive()
                .setScale(4, 2)
                .on('pointerdown', () => this.scene.start('InventoryScene'));

                // Texto para mostrar "Ansiedad" en el centro del botón
                let combatText = this.add.text(
                    inventarioButton.x,   // Colocar en la misma X del botón
                    inventarioButton.y,   // Colocar en la misma Y del botón
                    `INVENTARIO`,
                    {
                        fontSize: '25px',  // Cambia el tamaño del texto según el espacio
                        color: '#000000',  // Negro
                        fontFamily: 'Georgia',
                        fontStyle: 'bold',
                        align: 'center'    // Centrar el texto internamente
                    }
                );

                // Centrar el texto en el botón
                combatText.setOrigin(0.5, 0.5);

    }

    update(time, dt){

    }

}