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
        console.log("en el constructor",this.key);
        
        this.key="zonaScene";
        
        this.fondo = 'fondo1';
        
        this.modo= data.modo || 1;
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
        

        //IMAGENES LOCALIZATIONS
        this.load.image('tenfe', 'assets/edificios/tenfe.png'); //tenfe
        this.load.image('pitiBancoLocalization', 'assets/edificios/pitiBanco.png');
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

        //PINTAR FONDO
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


        // Declarar los grupos de objetos
        this.buildings = this.add.group();
        this.localizations = this.add.group();
        this.flechas = this.add.group();
        let startPosition = window.gameState.playerPosition || { x: 900, y: 330 }; //posicion de la tenfe

        //LOCALIZACIONES
        const zone = jsonObject["botellin"][this.modo];
        
        zone.localizations.forEach(localization => {
            this.createLocalization(localization);});

        //FLECHAS
        zone.flechas.forEach(flecha => {
            this.createFlecha(flecha);});

        //POSICION
        if(this.modo == 2)
        {
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
        else if(this.modo == 3){
            
            //POSICION
            if(data.ant == 2)
            {
                startPosition= { x: this.sys.game.canvas.width / 22, y: this.sys.game.canvas.height / 3.3 };
            }
        }
        else{
            
            //POSICION    
            if(data.ant == 2)
            {
                startPosition= { x:  this.sys.game.canvas.width / 1.05, y: this.sys.game.canvas.height / 3.3 };
            }
        }

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
                                                            inventory: this.inventory.getConfigData()});
                        }
                        else{
                            // Cambiar escena
                            this.scene.start('localizationScene', { fondo: localization.scenario, 
                                                                    ant: this.modo,
                                                                    player: player.getConfigData(), 
                                                                    inventory:this.inventory.getConfigData()});
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
                        this.scene.start('zonaScene', { modo: flecha.modo, ant: flecha.ant,
                        player: player.getConfigData(), 
                        inventory:this.inventory.getConfigData()
                            });
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
            .on('pointerdown', () => {
                console.log("Valor de this.key:", this.key); // Aquí verificamos el valor de this.key
                this.scene.start('InventoryScene', {
                    lastScene: this.key, // Este es el valor que debería contener "zonaScene"
                    player: player.getConfigData(),
                    inventory: this.inventory.getConfigData(),
                    modo: this.modo
                });
            });
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