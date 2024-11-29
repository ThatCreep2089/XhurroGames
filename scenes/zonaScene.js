import Player from '../src/Player.js';
import Building from '../src/building.js';
import Localization from '../src/localization.js';
import Flecha from '../src/flecha.js';
import Inventory from '../src/inventory.js';

export default class ZonaScene extends Phaser.Scene{
    constructor()
    {
        super({key: "zonaScene"});
    }


    init(data){
        this.fondo = 'fondo1';
        if(data.modo == 2) this.fondo = 'fondo2';
        else if(data.modo == 3)  this.fondo ='fondo3';

        this.playerConfig = data.player
        this.inventoryConfig = data.inventory

    }

    preload() //CARGAR TODOS LOS RECURSOS
    {
        //FONDOS
        this.load.image('fondo1', 'assets/fondos/fondo1.jpeg'); //fondo 1
        this.load.image('fondo2', 'assets/fondos/fondo2.jpeg'); //fondo 2
        this.load.image('fondo3', 'assets/fondos/fondo3.jpeg'); //fondo 3

        //PLAYER
        this.load.image('player', 'assets/npc/elle.png'); //future elle

        //IMAGENES BUILDINGS
        this.load.image('building1', 'assets/edificios/building1.png'); //clarito
        this.load.image('building3', 'assets/edificios/building3.png'); //oscuro
        this.load.image('building4', 'assets/edificios/building4.png'); //mediano
        this.load.image('tenfe', 'assets/edificios/tenfe.png'); //tenfe

        //IMAGENES LOCALIZATIONS
        this.load.image('localization1', 'assets/edificios/parque.png');
        this.load.image('localization2', 'assets/edificios/puente.png');
        this.load.image('localization4', 'assets/edificios/cni.png');
        this.load.image('localization5', 'assets/edificios/bar.png');
        this.load.image('localization6', 'assets/edificios/hipodromo.png');
        this.load.image('localization7', 'assets/edificios/cruzRoja.png');
        this.load.image('localization8', 'assets/edificios/iglesia.png');
        
        //FLECHAS
        this.load.image('flecha', 'assets/other/flecha.png');

        //ASSETS NOMBRES LOCALIZATIONS
        this.load.image('caja', 'assets/other/caja.png');
        this.load.image('maps', 'assets/other/maps.png');

        this.load.json("mapJason", 'src/map.json');

    }

    create(data){
       //leer mapa
        const jsonObject = this.cache.json.get('mapJason');

        //1. PINTAR FONDO
            //Crear y escalar fondo
            var back = this.add.image(0, 0, this.fondo).setOrigin(0, 0);

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
            this.buildings = this.add.group();
            this.localizations = this.add.group();
            this.flechas = this.add.group();
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

                //LOCALIZACIONES
                const cni = jsonObject["botellin"].zona2.cni;
                this.createLocalization(cni);

                const bar = jsonObject["botellin"].zona2.bar;
                this.createLocalization(bar);

                const hipodromo = jsonObject["botellin"].zona2.hipodromo;
                this.createLocalization(hipodromo);
               
                //FLECHAS
                const flecha1 = jsonObject["botellin"].zona2.flecha1;
                this.createFlecha(flecha1);

                const flecha3 = jsonObject["botellin"].zona2.flecha3;
                this.createFlecha(flecha3);
                
                //POSICION
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
                //GRUPO BUILDINGS
                
                //LOCALIZACIONES
                const cruzRoja = jsonObject["botellin"].zona3.cruzRoja;
                this.createLocalization(cruzRoja);

                const iglesia = jsonObject["botellin"].zona3.iglesia;
                this.createLocalization(iglesia);
               
                //FLECHAS
                const flecha = jsonObject["botellin"].zona3.flecha2;
                this.createFlecha(flecha);
                
                //POSICION
                if(data.ant == 2)
                {
                    startPosition= { x: this.sys.game.canvas.width / 22, y: this.sys.game.canvas.height / 3.3 };
                }
            }
            else{
                //BUILDINGS
                
                //LOCALIZACIONES
                const parque = jsonObject["botellin"].zona1.parque;
                this.createLocalization(parque);

                const puente = jsonObject["botellin"].zona1.puente;
                this.createLocalization(puente);

                const tenfe = jsonObject["botellin"].zona1.tenfe;
                this.createLocalization(tenfe);
               
                //FLECHAS
                const flecha = jsonObject["botellin"].zona1.flecha;
                this.createFlecha(flecha);
                
                //POSICION    
                if(data.ant == 2)
                {
                    startPosition= { x:  this.sys.game.canvas.width / 1.05, y: this.sys.game.canvas.height / 3.3 };
                }
            }

       
            
        //3. ELEMENTOS EN COMÚN


            //INVENTARIO
                //instanciar inventario
                this.inventory = new Inventory(this);
                if(this.inventoryConfig != undefined) {
                    this.inventory.init(this.inventoryConfig);
                }

            //PLAYER
                //instanciar player
                let player = new Player(this, startPosition.x, startPosition.y);
                
                player.setScale(0.03);
                console.log(this.playerConfig);
                if(this.playerConfig != undefined)
                {
                    player.init(this.playerConfig);
                }


            //COLISIONES CON PLAYER 
                this.physics.add.collider(player, this.buildings); //Colision player con building
                this.physics.add.collider(player, this.localizations); //Colision player con localizations

                //cambios de escena con localizations
                this.localizations.children.iterate((localization) => {
                    this.physics.add.overlap(player, localization.extraCollider, (player, extraCollider) => {
                        if (player.isInteractingPressed()) {
                            console.log("cambiar escena");
    
                            // Guarda la posición de `iguana` en `gameState`
                            window.gameState.playerPosition = { x: player.x, y: player.y };
    
                            if(localization.scenario == 'tenfeFondo')
                            {
                                // Cambiar escena
                                this.scene.start('tenfeScene', { fondo: localization.scenario,
                                                                player: player.getConfigData(), 
                                                                inventory: this.Inventory.getConfigData()});
                            }
                            else{
                                // Cambiar escena
                                this.scene.start('localizationScene', { fondo: localization.scenario, 
                                                                        modo: data.modo,
                                                                        player: player.getConfigData(), 
                                                                        inventory: this.Inventory.getConfigData() });
                            }
                        }
                    });
                });

                // Recargar escena con flechas
                this.flechas.children.iterate((flecha) => {
                    this.physics.add.overlap(player, flecha, (player, flecha) => { // Cambiado a `flecha` en lugar de `flecha.extraCollider`
                        if (player.isInteractingPressed()) {
                            console.log("recargar escena " + flecha.modo);
                    
                            // Cambiar escena
                            this.scene.stop('zonaScene'); // Detener la escena actual
                            this.scene.start('zonaScene', { modo: flecha.modo, ant: flecha.ant });
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
                .on('pointerdown', () => this.scene.start('InventoryScene',{
                    lastScene: this.key,
                    player: player.getConfigData(),
                    inventory: this.inventory.getConfigData(),
                    modo: this.modo
                }));
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

    createLocalization(localization)
    {
        //recibimos el objeto localizacion
        //a partir de ahí lo creamos y su nombre tmb
        //const localization = jsonObject["botellin"].zona1.parque;
                let localization1 = new Localization(this, localization.sprite, 
                    eval(localization.x),
                    eval(localization.y),
                    eval(localization.width), eval(localization.height), this.localizations, localization.scenario);

                const cajaL = localization.caja;
                        //NOMBRES LOCALIZACION
                            let caja2 = this.add.image(
                                eval(cajaL.x),
                                eval(cajaL.y), 
                                cajaL.id)
                            .setScale( eval(cajaL.width),  eval(cajaL.height));

                const textL = localization.texto;
                            let texto2 = this.add.text(
                                eval(textL.x),
                                eval(textL.y),
                                textL.text,
                                { fontSize: textL.size, color: '#ffffff', fontFamily: 'Georgia', fontStyle: 'bold', align: 'center'}
                            );

                            texto2.setOrigin(0.5, 0.5);

                const decor = localization.decor;
                            this.add.image(
                                eval(decor.x),
                                eval(decor.y), 
                                decor.id)
                            .setScale( eval(decor.width),  eval(decor.height));



    }

    createFlecha(flecha)
    {
        let flecha1 = new Flecha(this, 
            eval(flecha.x),
            eval(flecha.y), 
            this.flechas, eval(flecha.modo), eval(flecha.ant))
            .setScale(eval(flecha.width), eval(flecha.height));
    }

    update(time, dt){

    }

}