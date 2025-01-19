import Player from '../src/Player.js';
import Building from '../src/building.js';
import Localization from '../src/localization.js';
import Flecha from '../src/flecha.js';
import Inventory from '../src/inventory.js';

/**
 * Escena que maneja la navegación del jugador por el mapa.
 * Cada barrio está dividido por x numero de zonas, diferenciadas por el parámetro this.modo.
 * Cada zona tiene localizaciones diferentes. La estación Tenfe solo está en una zona de cada barrio, al igual que la localización del boss.
 * Cada zona también cuenta con x numero de colliders para hacer la navegación más realista.
 * Todos estos datos se leen del archivo "map.json"
 */

export default class ZonaScene extends Phaser.Scene{
    constructor()
    {
        super({key: "zonaScene"});
    }


    init(data){
        //console.log("en el constructor",this.key);
        
        this.key="zonaScene";
        
        this.modo= data.modo || 1;
        this.fondo = 'fondo' + this.modo;
        
        
        this.playerConfig = data.player
        this.inventoryConfig = data.inventory

        //JSON DIALOGOS
        if(data.dialogueJson)
        {
            this.dialogueJson = data.dialogueJson;
            //console.log(this.dialogueJson);
        }
        else{
            this.dialogueJson = this.cache.json.get('dialogueJson');
        }

    }
    BotonIrLocalizacion(x,y,w,h,color)//Rectangulo de (inventario,stats,contactos)
    {
        let rect=this.add.rectangle(x,y,w,h,color);
        rect.setInteractive();
        rect.setScale(4, 2);
        return rect;;
    }

    IrLocaliz(scene,player)//Ir a las scenas de (inventario,stats,contactos)
    {
        this.scene.start(scene, {
            lastScene: this.key, // Este es el valor que debería contener "zonaScene"
            player: player.getConfigData(),
            inventory: this.inventory.getConfigData(),
            modo: this.modo,
            dialogueJson: this.dialogueJson
        });
    }
            //creacion de textos
   CrearText(x,y,string,fontSize,color,fontFam,fontSt,align)
   {
    let text=this.add.text(x,y,string,{

        fontSize: fontSize,  // Cambia el tamaño del texto según el espacio
        color: color,  // Negro
        fontFamily: fontFam,
        fontStyle: fontSt,
        align: align
    });
    text.setOrigin(0.5, 0.5);
    return text;
   }

    create(data){
        // Si la música ya está reproduciéndose, no la iniciamos de nuevo
        if (!this.sound.get('zoneMusic')) {
            const music = this.sound.add('zoneMusic', { volume: 0.5, loop: true });
            music.play();
        }
        
       
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

        //LEER ZONA
        const zone = jsonObject[this.modo];
        
        //BUILDINGS
        zone.buildings.forEach(building => {
            this.createBuilding(building);});

        //LOCALIZACIONES
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
            //console.log(this.playerConfig);
            if(this.playerConfig != undefined)
            {
                player.init(this.playerConfig);
            }

        //COLISIONES CON PLAYER 
            this.physics.add.collider(player, this.buildings);
            this.physics.add.collider(player, this.localizations); //Colision player con localizations
            
            //cambios de escena con localizations
            this.localizations.children.iterate((localization) => {
                this.physics.add.overlap(player, localization.extraCollider, (player, extraCollider) => {
                    if (player.isInteractingPressed()) {
                        //console.log("cambiar escena");

                        // Guarda la posición de `iguana` en `gameState`
                        window.gameState.playerPosition = { x: player.x, y: player.y };

                        if(localization.scenario == 'tenfeFondo')
                        {
                            // Cambiar escena
                            this.scene.start('tenfeScene', { fondo: localization.scenario, 
                                                            modo: this.modo,
                                                            player: player.getConfigData(), 
                                                            inventory: this.inventory.getConfigData(),
                                                            dialogueJson: this.dialogueJson});
                        }
                        else{
                            // Cambiar escena
                            this.scene.start('localizationScene', { fondo: localization.scenario, 
                                                                    ant: this.modo,
                                                                    player: player.getConfigData(), 
                                                                    inventory:this.inventory.getConfigData(),
                                                                    dialogueJson: this.dialogueJson});
                        }
                    }
                });
            });

            // Recargar escena con flechas
            this.flechas.children.iterate((flecha) => {
                this.physics.add.overlap(player, flecha, (player, flecha) => { // Cambiado a `flecha` en lugar de `flecha.extraCollider`
                    if (player.isInteractingPressed()) {
                        //console.log("recargar escena " + flecha.modo);
                
                        // Cambiar escena
                        this.scene.stop('zonaScene'); // Detener la escena actual
                        this.scene.start('zonaScene', { modo: flecha.modo, ant: flecha.ant,
                        player: player.getConfigData(), 
                        inventory:this.inventory.getConfigData(),
                        dialogueJson: this.dialogueJson
                            });
                    }
                });
            });


           // botones para ir inventario
           let inventarioButton =this.BotonIrLocalizacion( this.sys.game.canvas.width / 14,
            this.sys.game.canvas.height / 1.5, 
            50, 50, 0xffe800)
        .on('pointerdown', () => {
            this.IrLocaliz('InventoryScene',player);
           
        });
        // botones para ir stats
        let statsButton = this.BotonIrLocalizacion( 
            this.sys.game.canvas.width / 14,
            this.sys.game.canvas.height / 1.15, 
            50, 50, 0xffe800)
        .on('pointerdown', () => {
            this.IrLocaliz('StatsScene',player);
           
        });
      
        // botones para ir contactos
        let contactosButton = this.BotonIrLocalizacion( 
            this.sys.game.canvas.width / 14,
            this.sys.game.canvas.height / 1.3, 
            50, 50, 0xffe800)
        .on('pointerdown', () => {
            this.IrLocaliz('GeneralContactsScene',player);
           
        });
 

            // Texto para mostrar "Contactos" en el centro del botón
            let statsText = this.CrearText(
                statsButton.x,   // Colocar en la misma X del botón
                statsButton.y,   // Colocar en la misma Y del botón
                `ESTADISTICAS`,'25px','#000000', 'Georgia','bold','center'
            );

            // Texto para mostrar "Contactos" en el centro del botón
            let contactText = this.CrearText(
                contactosButton.x,   // Colocar en la misma X del botón
                contactosButton.y,   // Colocar en la misma Y del botón
                `CONTACTOS`,'25px','#000000', 'Georgia','bold','center'
            );
          
            // Texto para mostrar "Inventario" en el centro del botón
            let InventarioText = this.CrearText(
                inventarioButton.x,   // Colocar en la misma X del botón
                inventarioButton.y,   // Colocar en la misma Y del botón
                `INVENTARIO`,'25px','#000000', 'Georgia','bold','center'
               
            );


    }

    //Crear localizacion en escena
    createLocalization(localization)
    {
        let localization1 = new Localization(this, localization.sprite, 
            this.sys.game.canvas.width / localization.x,
            this.sys.game.canvas.height / localization.y,
            localization.width, localization.height, this.localizations, localization.scenario);

        const cajaL = localization.caja;
                //NOMBRES LOCALIZACION
                    let caja2 = this.add.image(
                        this.sys.game.canvas.width / cajaL.x,
                        this.sys.game.canvas.height / cajaL.y, 
                        cajaL.id)
                    .setScale(cajaL.width, cajaL.height);

        const textL = localization.texto;

                    let texto2 = this.CrearText(
                        this.sys.game.canvas.width / textL.x,
                        this.sys.game.canvas.height / textL.y,
                        textL.text, textL.size, '#ffffff',  'Georgia', 'bold', 'center'
                    );

                   

        const decor = localization.decor;
                    this.add.image(
                        this.sys.game.canvas.width / decor.x,
                        this.sys.game.canvas.height / decor.y, 
                        decor.id)
                    .setScale(decor.width, decor.height);

    }

    //Crear flecha en escena
    createFlecha(flecha)
    {
        let flecha1 = new Flecha(this,
            flecha.sprite, 
            this.sys.game.canvas.width / flecha.x,
            this.sys.game.canvas.height / flecha.y, 
            this.flechas, flecha.modo, flecha.ant)
            .setScale(flecha.width, flecha.height);
    }

    //Crear collider en escena
    createBuilding(building)
    {
        let building1 = new Building(this, 
            this.sys.game.canvas.width / building.x,
            this.sys.game.canvas.height / building.y,
            building.width, building.height, this.buildings);

        this.buildings.add(building1);
    }


}