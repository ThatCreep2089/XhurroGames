import Player from '../src/Player.js';
import Inventory from '../src/inventory.js';
import Item from '../src/item.js';

export default class localizationScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "localizationScene"});
        
        this.titulo = null;
        this.npcTalk;
    }

    init(data){
        // Usar el parámetro 'fondo' para decidir qué fondo cargar
        this.localizacion = data.fondo || 'parque';
        
        //para volver a la zona correcta
        this.ant = data.ant;
        console.log("this.ant: " + this.ant);

        //PLAYER E INVENTARIO
        this.playerConfig = data.player
        this.inventoryConfig = data.inventory

    }

    preload(){
        //FONDOS
            this.load.image('parque', 'assets/fondos/parque.jpg');
            this.load.image('puente', 'assets/fondos/puente.jpg');
            this.load.image('bar', 'assets/fondos/barFondo.jpg');
            this.load.image('cni', 'assets/fondos/cniFondo.jpg');
            this.load.image('hipodromo', 'assets/fondos/hipodromoFondo.jpg');
            this.load.image('cruzRoja', 'assets/fondos/cruzRoja.jpg');
            this.load.image('iglesia', 'assets/fondos/iglesia.jpg');
            this.load.image('pitiBanco', 'assets/fondos/pitiBanco.jpg');

        //NPCS
            this.load.image('PACO', 'assets/npc/paco (2).png');
            this.load.image('HUMBERTO', 'assets/npc/humberto (2).png');
            this.load.image('MARIA', 'assets/npc/maria.png');
            this.load.image('NPC', 'assets/npc/npc.png');
            this.load.image('PITIBANCO', 'assets/npc/pitiBanco.png');
            this.load.image('MARIA JOSE', 'assets/npc/mariaJose.png');
            this.load.image('MARIA DEL CARMEN', 'assets/npc/mariaDelCarmen.png');
            this.load.image('ALI', 'assets/npc/ali.png');
            this.load.image('JESUS', 'assets/npc/jesus.png');
            this.load.image('PEDRITO', 'assets/npc/pedrito.png');
            this.load.image('AGUSTÍN', 'assets/npc/agustin.png');
            this.load.image('ANGEL', 'assets/npc/angel.png');
            this.load.image('JOSE', 'assets/npc/jose.png');
            this.load.image('MARIA TERESA', 'assets/npc/mariaTeresa.png');
            this.load.image('CONSUELO', 'assets/npc/consuelo.png');
            this.load.image('GATO EN CAJA', 'assets/npc/gato.png');
            this.load.image('BOSS', 'assets/npc/bossBotellin.png');

        //BACK BUTTON
        this.load.image('flecha', 'assets/other/flecha.png');

        //FLECHAS
        this.load.image('arrow', 'assets/other/arrow.png');

        this.load.image('accept', 'assets/other/accept.png');

        
        //OBJETOS COLECCIONABLES
        this.load.image('hamburguesa', 'assets/other/hamburguesa.png');

        //JSON
        this.load.json("localizationJson", 'src/localization.json');
        
    }

    
    create(){
        //leer localizacion
        const jsonObject = this.cache.json.get('localizationJson');

        //1. PINTAR FONDO
            //Pintamos un fondo
            var back = this.add.image(0, 0, this.localizacion).setOrigin(0, 0);

            //escalar el fondo
            var scaleX = this.cameras.main.width / back.width;
            var scaleY = this.cameras.main.height / back.height;
            
            var scale = Math.min(scaleX, scaleY);
            
            back.setScale(scale);
            
            back.setPosition(
                this.cameras.main.width / 2 - back.displayWidth / 2,
                this.cameras.main.height / 2 - back.displayHeight / 2
            );

        //2. AÑADIR ELEMENTOS LOCALIZACIÓN
            // 2.1 TEXTO
            this.titulo = this.add.text(
                this.sys.game.canvas.width / 2,   // coordenada x
                this.sys.game.canvas.height / 12, // coordenada y
                "Con quien quieres hablar?", //frase
                { 
                    fontSize: '100px', 
                    color: '#999999',       // Gris
                    fontFamily: 'Georgia',  
                }
            );
            this.titulo.setStroke('#000000', 8);  // Trazo negro
            this.titulo.setOrigin(0.5, 0);
            this.titulo.setScale(0.8);

            // 2.2 GRUPOS
            this.names = this.add.group();
            this.arrows = this.add.group();
            
            // 2.3 NPCS
            const mode = jsonObject["botellin"][this.localizacion];
            
            mode.npcs.forEach(npc => {
                this.addNPCToScene(npc);});

            
            // 2.4 PLAYER
            let startPosition = window.gameState.playerPosition || { x: 278, y: 150 }; //posicion de la tenfe
            
            this.player = new Player(this, startPosition.x, startPosition.y);
            this.player.init(this.playerConfig);
            
            this.player.setVisible(false); //que elle NO se vea
            this.player.changeMove(false);
            
            // 2.5 INVENTARIO
            this.inventory = new Inventory(this);
            if(this.inventoryConfig != undefined) {
                this.inventory.init(this.inventoryConfig);
            }

            // 2.6 ACCEPT
            this.accept = this.add.image(
                this.sys.game.canvas.width / 2,
                this.sys.game.canvas.height / 3.2, 
                'accept')
            .setScale(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                // SUBIR ANSIEDAD
                if(this.localizacion != 'pitiBanco') //a dialogos si NO es pitibanco
                {
                    this.player.IncreaseAnxiety(10);
                    
                }
                this.scene.start('dialogueScene', { npc: this.npcTalk, fondo: this.localizacion, ant: this.ant,
                    player: this.player.getConfigData(), 
                    inventory: this.inventory.getConfigData()});  //cambiar a escena dialogo
            });
                
            // 2.7 BACK BUTTON (volver a eligir otro NPC)
            this.backButton = this.add.image(
                this.sys.game.canvas.width / 4,
                this.sys.game.canvas.height / 3.2, 
                'flecha')
            .setScale(-0.3, 0.3)
            .setInteractive()
            .on('pointerdown', () => {
                this.acceptButton(false, "Con quien quieres hablar?");
            });
    
            // 2.8 INICIO    
            this.acceptButton(false, "Con quien quieres hablar?"); //empieza ocultando boton aceptar


            // 2.9 MOSTRAR ANSIEDAD
            this.anxietyText = this.add.text(
                this.sys.game.canvas.width / 7,   // Coordenada X: centrado horizontalmente
                this.sys.game.canvas.height / 6,
                `Ansiedad: ${this.player.ansiedad}`,
                {
                    fontSize: '100px', 
                    color: '#999999',       // Gris
                    fontFamily: 'Georgia',
                });
                this.anxietyText.setStroke('#000000', 8);  // Trazo negro, puedes ajustar el grosor o eliminarlo
                this.anxietyText.setOrigin(0.5, 0);
                this.anxietyText.setScale(0.6);


            // 2.8 BACK BUTTON (volver a zonaScene)
            const backScene = this.add.image(
                this.sys.game.canvas.width / 12,
                this.sys.game.canvas.height / 1.2, 
                'flecha')
            .setScale(-0.3, 0.3)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('zonaScene', { 
                modo: this.ant,
                player: this.player.getConfigData(), 
                inventory: this.inventory.getConfigData()
            }));

        //TESTEO    
        // botones para testeo
        let combatButton = this.add.rectangle(
            this.sys.game.canvas.width / 1.2,
            this.sys.game.canvas.height / 5, 
            50, 50, 0xff0000)
        .setInteractive()
        .setScale(4, 2)
        .on('pointerdown', () => this.scene.start('CombatScene', {
            ant: this.ant,
            player: this.player.getConfigData(), 
            inventory: this.inventory.getConfigData()
        }));

        // TEXTO BOTON COMBATE
        let combatText = this.add.text(
            combatButton.x,   // Colocar en la misma X del botón
            combatButton.y,   // Colocar en la misma Y del botón
            `COMBATE`,
            {
                fontSize: '32px',  // Cambia el tamaño del texto según el espacio
                color: '#ffffff',  // Gris
                fontFamily: 'Georgia',
                fontStyle: 'bold',
                align: 'center'    // Centrar el texto internamente
            }
        );

        // Centrar el texto en el botón
        combatText.setOrigin(0.5, 0.5);

    }


    addNPCToScene(npc){    
        //BOTON NPC
        const spritePJ = this.add.image(
            this.sys.game.canvas.width /npc.x,
            this.sys.game.canvas.height /npc.y, 
            npc.name) //id
        .setOrigin(0.5, 0.5)
        .setScale(npc.scale)
        .setInteractive()
        .on('pointerdown', () =>{
            this.acceptButton(true, "Quieres hablar con "+ npc.name +"?");
            this.npcTalk = npc.name;
            })
        .on('pointerover', () => spritePJ.setTint(0xff0000)) //para que se ponga rojo cuando el raton está encima
        .on('pointerout', () => spritePJ.clearTint());

        
        //NOMBRE NPC
        let textPJ = this.add.text(
            this.sys.game.canvas.width /npc.x,   // coordenada x
            this.sys.game.canvas.height / 3.7, // coordenada y
            npc.name, //frase
            { 
                fontSize: '100px', 
                color: '#999999',       // Gris
                fontFamily: 'Georgia',  
            }
        );
        textPJ.setStroke('#000000', 8);  // Trazo negro
        textPJ.setOrigin(0.5, 0);
        textPJ.setScale(0.6);

        this.names.add(textPJ); //añadir al conjunto

        //FLECHA NPC
        var arrow = this.add.image(
            this.sys.game.canvas.width /npc.x,
            this.sys.game.canvas.height / 2.5, 
            'arrow')
            .setScale(0.2, 0.1);
        this.arrows.add(arrow);


    }

    addItemToScene(name, description, effect, posx, posy, amountOfEffect)
    {
        this.hamburguesa= new Item(this, name, description, effect, posx, posy, amountOfEffect);//creamos item
        console.log(this.hamburguesa.name+ this.hamburguesa.description);
        this.hamburguesa.setDisplaySize(50, 50);//ajustamos tam
        this.hamburguesa.setInteractive(); // Habilitar interactividad
        this.hamburguesa.on('pointerdown', () => { //evento para detectar el raton
            this.Pick(this.hamburguesa); 
        });
    }

    update(){
        // Actualiza el texto con el nuevo valor de la variable
        this.anxietyText.setText(`Ansiedad: ${this.player.ansiedad}`);
    }

    acceptButton(show, nuevoTexto) //para enseñar y ocultar botones
    {
        if(show == true)
        {
            //mostrar boton aceptar y back
            this.accept.setVisible(true);
            this.backButton.setVisible(true);

            //ocultar flechas
            this.arrows.setVisible(false);

            //ocultar names
            this.names.setVisible(false);

            if (this.titulo) {
                this.titulo.setText(nuevoTexto);  // Cambia el texto en el objeto titulo
            }
        }
        else
        {
            // Ocultar botones aceptar y back
            if (this.accept) this.accept.setVisible(false);
            if (this.backButton) this.backButton.setVisible(false);   

            // Mostrar flechas
            this.arrows.setVisible(true);

            //mostrar names
            this.names.setVisible(true);

            if (this.titulo) {
                this.titulo.setText(nuevoTexto);  // Cambia el texto en el objeto titulo
            }
        }
         
    }

    Pick(item)
    {
        const inventario = this.registry.get('inventario');
        if (inventario) {
            inventario.AddItem(item); // Agregar el item al inventario
            item.setVisible(false);
        }
    }
}