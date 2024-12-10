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
       

        //PLAYER E INVENTARIO
        this.playerConfig = data.player
        this.inventoryConfig = data.inventory

        //JSON DIALOGOS
        if(data.dialogueJson)
        {
            this.dialogueJson = data.dialogueJson;
        }
        else{
            this.dialogueJson = this.cache.json.get('dialogueJson');
        }
        

    }

    preload(){
        
    }

    
    create(){
        //leer localizacion
        this.jsonObject = this.cache.json.get('localizationJson');
        if(!this.dialogueJson)
        {
            this.dialogueJson = this.cache.json.get('dialogueJson');
        }

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
            
            const mode = this.jsonObject["botellin"][this.localizacion];

            // ITEMS
            mode.items.forEach(item => {
                this.addItemToScene(item);});

            // 2.3 NPCS
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
                if(this.player.ansiedad == this.player.maxAnsiedad - 50 && this.npcTalk != 'PITIBANCO')
                {
                    console.log("no puedes hablar mas, mucha ansiedad");
                    this.mostrarPestana();
                }
                else
                {
                    // SUBIR ANSIEDAD
                if(this.npcTalk == 'GATO EN CAJA')
                    {
                        //verificar si tiene lo que hay q tener
                        const { cumplidos, noCumplidos } = this.requisitosGato(mode);
    
                        if (noCumplidos.length > 0)
                        {
                            console.log("Hay requisitos pendientes.");
                            this.mostrarPestana(noCumplidos);
                        }
                        else
                        {
                            console.log("Todos los requisitos han sido cumplidos.");
                            this.scene.start('dialogueScene', { npc: this.npcTalk, fondo: this.localizacion, ant: this.ant,
                                player: this.player.getConfigData(), 
                                inventory: this.inventory.getConfigData(),
                                dialogueJson: this.dialogueJson});  //cambiar a escena dialogo
                        }
                    }
                    else
                    {
                        if(this.npcTalk != 'PITIBANCO') //a dialogos si NO es pitibanco
                        {
                            this.player.IncreaseAnxiety(10);
                            
                        }
                        this.scene.start('dialogueScene', { npc: this.npcTalk, fondo: this.localizacion, ant: this.ant,
                            player: this.player.getConfigData(), 
                            inventory: this.inventory.getConfigData(),
                            dialogueJson: this.dialogueJson});  //cambiar a escena dialogo
                    }
                }
                
                
                
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
                inventory: this.inventory.getConfigData(),
                dialogueJson: this.dialogueJson
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
            inventory: this.inventory.getConfigData(),
            dialogueJson: this.dialogueJson
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

    addItemToScene(item)
    {
        if(item.recogido == "false")
        {
           let newItem= new Item(this, item.name, item.description, item.effect, item.x, item.y, item.amountOfEffect);//creamos item
           newItem.setScale(0.3);//ajustamos tam
           newItem.setInteractive(); // Habilitar interactividad
            
            //evento boton
            newItem.on('pointerdown', () => { //evento para detectar el raton
                item.recogido = "true";
                this.Pick(newItem); //recoger item (meter en inventario) y quitar de escena
            });
            newItem.on('pointerover', () => newItem.setTint(0x4ec647)) //para que se ponga rojo cuando el raton está encima
            newItem.on('pointerout', () =>newItem.clearTint());
    
        }
        
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
        if (this.inventory) {
            this.inventory.AddItem(item); // Agregar el item al inventario
            item.setVisible(false);
        }
    }

    //verificar si el jugador cumple los requisitos para hablar con el gato
    requisitosGato(mode)
    {
        //busco al gato
        const gatoEnCaja = mode.npcs.find(npc => npc.name == "GATO EN CAJA");
        
        const cumplidos = [];
        const noCumplidos = [];

        gatoEnCaja.requisitos.forEach(requisito => {
            //si no ha hablado -> salir directamente
            if (this.dialogueJson[requisito.name].hablado == "true")
            {
                cumplidos.push(requisito.name);
            }
            else
            {
                noCumplidos.push(requisito.name);
            }
        });

        
        return { cumplidos, noCumplidos };
    }

    mostrarPestana(noCumplidos)
    {
        // Crear la pestaña
        this.pestana = this.add.container(
            this.sys.game.canvas.width / 2, // Centro del canvas
            this.sys.game.canvas.height / 2 // Centro del canvas
        );
    
        // Fondo de la pestaña (más grande)
        const fondoPestana = this.add.rectangle(0, 0, 600, 500, 0x000000) // Nuevo tamaño: 600x500
            .setOrigin(0.5) // Centrado
            .setInteractive(); // Fondo para capturar clics
        this.pestana.add(fondoPestana);
    
        let nombres = "";

        if(noCumplidos != undefined)
        {
            nombres = "TIENES QUE HABLAR CON:\n";
            // Añadir los nombres del array noCumplidos al string
            noCumplidos.forEach(nombre => {
                nombres += ` ${nombre}\n`; // Añadir cada nombre con salto de línea
            });
        }
        else{
            nombres = "Tienes mucha ansiedad,\n no puedes hablar con mas gente";
        }

        // Crear el texto con los nombres
        const textoPestana = this.add.text(0, 0, nombres, {
            font: "40px Georgia",
            color: "#ffffff",
            align: "center"
        });
    
        textoPestana.setOrigin(0.5, 0.5); // Centrar el origen del texto
        textoPestana.setPosition(0, 5); // Ajustar la posición dentro del fondo
        this.pestana.add(textoPestana);
    
        // Crear el botón rojo para ocultar la pestaña
        const botonCerrar = this.add.rectangle(290, -240, 20, 20, 0xff0000) // Ajuste relativo a la posición del fondo
            .setOrigin(0.5)
            .setInteractive();
        this.pestana.add(botonCerrar);
    
        // Evento del botón para ocultar la pestaña
        botonCerrar.on("pointerdown", () => {
            this.pestana.setVisible(false); // Ocultar la pestaña
        });
    }
}