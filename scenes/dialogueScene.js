import DialogText from "../src/dialog_plugin.js";
import Player from '../src/Player.js';
import Inventory from '../src/inventory.js';

export default class DialogueScene extends Phaser.Scene {
    constructor(){
        super({key: "dialogueScene"})
    }

    preload()
    {
        //FONDO
        this.load.image('parque', 'assets/fondos/parque.jpg'); //fondo
        this.load.image('puente', 'assets/fondos/puente.jpg'); //fondo
        this.load.image('bar', 'assets/fondos/barFondo.jpg'); //fondo
        this.load.image('cni', 'assets/fondos/cniFondo.jpg'); //fondo
        this.load.image('hipodromo', 'assets/fondos/hipodromoFondo.jpg'); //fondo

        //BACK BUTTON
        this.load.image('flecha', 'assets/other/flecha.png');

        //NPCS
        this.load.image('PACO', 'assets/npc/paco.png');
        this.load.image('HUMBERTO', 'assets/npc/humberto.png');
        this.load.image('MARIA', 'assets/npc/maria.png');
        this.load.image('NPC', 'assets/npc/npc.png');
        this.load.image('PITIBANCO', 'assets/npc/pitiBanco.png');

        this.load.json("dialogsNPC", 'src/dialog.json')

    }

    init(data){
        // Usar el parámetro 'fondo' para decidir qué fondo cargar
        this.npc = data.npc || 'HUMBERTO';
        this.fondo = data.fondo || 'puente';
        this.ant = data.ant;

        //PLAYER E INVENTARIO
        this.playerConfig = data.player
        this.inventoryConfig = data.inventory

    }

    create(data){
        console.log(data.npc);//debug

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


        const jsonObject = this.cache.json.get('dialogsNPC');
        //1. PINTAR FONDO
            //Pintamos un fondo
            var back = this.add.image(0, 0, this.fondo).setOrigin(0, 0);

            //escalar el fondo
            var scaleX = this.cameras.main.width / back.width;
            var scaleY = this.cameras.main.height / back.height;
            
            var scale = Math.min(scaleX, scaleY);
            
            back.setScale(scale);
            
            back.setPosition(
                this.cameras.main.width / 2 - back.displayWidth / 2,
                this.cameras.main.height / 2 - back.displayHeight / 2
            );
        
         

        //NPC (depende de data)
        if(this.npc == 'PACO')
        {
            //PACO
                const paco = this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 1.4, 
                    'PACO')
                .setOrigin(0.5, 0.5)
                .setScale(0.5);

            //TEXTO DIALOGO
            this.dialog = new DialogText(this, {
                borderThickness: 4,
                borderColor: 0xcb3234,
                borderAlpha: 1,
                windowAlpha: 0.6,
                windowColor: 0xff6961,
                windowHeight: 150,
                padding: 32,
                closeBtnColor: 'darkgoldenrod',
                dialogSpeed: 3,
                fontSize: 100,
                fontFamily: "pixel"
            });


            //this.dialog.toggleWindow();
            this.dialog.setText(jsonObject[this.npc].frase1, true);
            
        }
        else if(this.npc == 'HUMBERTO')
        {
            //HUMBERTO
                const humberto = this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 1.4, 
                    'HUMBERTO')
                .setOrigin(0.5, 0.5)
                .setScale(0.5);

            //TEXTO DIALOGO
            this.dialog = new DialogText(this, {
                borderThickness: 4,
                borderColor: 0xcb3234,
                borderAlpha: 1,
                windowAlpha: 0.6,
                windowColor: 0xff6961,
                windowHeight: 150,
                padding: 32,
                closeBtnColor: 'darkgoldenrod',
                dialogSpeed: 3,
                fontSize: 100,
                fontFamily: "pixel"
            });



            //this.dialog.toggleWindow();
            this.dialog.setText("HOLA SOY HUMBERTO", true);

        }
        else if(this.npc == 'MARIA')
        {
            //MARIA
                const maria = this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 1.4, 
                    'MARIA')
                .setOrigin(0.5, 0.5)
                .setScale(1)

            //TEXTO DIALOGO
            this.dialog = new DialogText(this, {
                borderThickness: 4,
                borderColor: 0xcb3234,
                borderAlpha: 1,
                windowAlpha: 0.6,
                windowColor: 0xff6961,
                windowHeight: 150,
                padding: 32,
                closeBtnColor: 'darkgoldenrod',
                dialogSpeed: 3,
                fontSize: 100,
                fontFamily: "pixel"
            });


            //this.dialog.toggleWindow();
            this.dialog.setText("HOLA SOY MARIA", true);

        }
        else if(this.npc == 'random')
        {
            //Npc
                const npc = this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 1.4, 
                    'NPC') //id
                .setOrigin(0.5, 0.5)
                .setScale(4)

            //TEXTO DIALOGO
            this.dialog = new DialogText(this, {
                borderThickness: 4,
                borderColor: 0xcb3234,
                borderAlpha: 1,
                windowAlpha: 0.6,
                windowColor: 0xff6961,
                windowHeight: 150,
                padding: 32,
                closeBtnColor: 'darkgoldenrod',
                dialogSpeed: 3,
                fontSize: 100,
                fontFamily: "pixel"
            });

            //this.dialog.toggleWindow();
            this.dialog.setText("QUIERES UN PORRO", true);

        }
        else if(this.npc == 'PITIBANCO')
            {
                //debug (para probar si funciona curar)
                this.player.takeDamage(50);
                
                //Npc
                    const npc = this.add.image(
                        this.sys.game.canvas.width / 2,
                        this.sys.game.canvas.height / 1.4, 
                        'PITIBANCO') //id
                    .setOrigin(0.5, 0.5)
                    .setScale(1)
    
                //TEXTO DIALOGO
                this.dialog = new DialogText(this, {
                    borderThickness: 4,
                    borderColor: 0xcb3234,
                    borderAlpha: 1,
                    windowAlpha: 0.6,
                    windowColor: 0xff6961,
                    windowHeight: 150,
                    padding: 32,
                    closeBtnColor: 'darkgoldenrod',
                    dialogSpeed: 3,
                    fontSize: 100,
                    fontFamily: "pixel"
                });
    
                this.dialog.setText(jsonObject[this.npc].frase1, true);

                //PORROS (BOTONES)
                
                    //CURAR ANSIEDAD
                    let curarAnsiedadButton = this.add.rectangle(
                        this.sys.game.canvas.width / 4,
                        this.sys.game.canvas.height / 3, 
                        50, 50, 0xff7c00)
                    .setInteractive()
                    .setScale(6, 2)
                    .on('pointerdown', () => {
                        if(jsonObject[this.npc].curarAnsiedad == "true")
                        {
                            this.player.LessAnxiety(this.player.ansiedad); //le quita toda la ansiedad
                            jsonObject[this.npc].curarAnsiedad = "false";
                        }
                        else{
                            this.dialog.setText(jsonObject[this.npc].frase2, true);
                        }
                        
                    });
                    // Texto para mostrar "Ansiedad" en el centro del botón
                    let ansiedadText = this.add.text(
                        curarAnsiedadButton.x,   // Colocar en la misma X del botón
                        curarAnsiedadButton.y,   // Colocar en la misma Y del botón
                        `CURAR ANSIEDAD`,
                        {
                            fontSize: '25px',  // Cambia el tamaño del texto según el espacio
                            color: '#000000',  // Negro
                            fontFamily: 'Georgia',
                            fontStyle: 'bold',
                            align: 'center'    // Centrar el texto internamente
                        }
                    );

                    // Centrar el texto en el botón
                    ansiedadText.setOrigin(0.5, 0.5);
                

                //CURAR VIDA
               
                    
                    let curarVidaButton = this.add.rectangle(
                        this.sys.game.canvas.width / 1.5,
                        this.sys.game.canvas.height / 3, 
                        50, 50, 0x00fff3)
                    .setInteractive()
                    .setScale(6, 2)
                    .on('pointerdown', () => {
                        if(jsonObject[this.npc].curarVida == "true")
                        {
                            var diff = this.player.maxHealth - this.player.health; //lo que le falta para estar al maximo
                            this.player.HealPlayer(diff);
                            jsonObject[this.npc].curarVida = "false";
                        }
                        else
                        {
                            this.dialog.setText(jsonObject[this.npc].frase2, true);
                        }
                    });
                    // Texto para mostrar "Ansiedad" en el centro del botón
                    let vidaText = this.add.text(
                        curarVidaButton.x,   // Colocar en la misma X del botón
                        curarVidaButton.y,   // Colocar en la misma Y del botón
                        `CURAR VIDA`,
                        {
                            fontSize: '25px',  // Cambia el tamaño del texto según el espacio
                            color: '#000000',  // Negro
                            fontFamily: 'Georgia',
                            fontStyle: 'bold',
                            align: 'center'    // Centrar el texto internamente
                        }
                    );

                    // Centrar el texto en el botón
                    vidaText.setOrigin(0.5, 0.5);
                

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
                
                // 2.9 MOSTRAR VIDA ACTUAL
                this.vidaText = this.add.text(
                    this.sys.game.canvas.width / 1.3,   // Coordenada X: centrado horizontalmente
                    this.sys.game.canvas.height / 6,
                    `Vida actual: ${this.player.health}`,
                    {
                        fontSize: '100px', 
                        color: '#999999',       // Gris
                        fontFamily: 'Georgia',
                    });
                    this.vidaText.setStroke('#000000', 8);  // Trazo negro, puedes ajustar el grosor o eliminarlo
                    this.vidaText.setOrigin(0.5, 0);
                    this.vidaText.setScale(0.6);

            }
        


        // TEXTO
        this.titulo = this.add.text(
            this.sys.game.canvas.width / 2,   // coordenada x
            this.sys.game.canvas.height / 12, // coordenada y
            this.npc, //frase
            { 
                fontSize: '100px', 
                color: '#999999',       // Gris
                fontFamily: 'Georgia',  
            }
        );
        this.titulo.setStroke('#000000', 8);  // Trazo negro
        this.titulo.setOrigin(0.5, 0);
        this.titulo.setScale(0.8);

        //BACK BUTTON
        const backScene = this.add.image(
            this.sys.game.canvas.width / 12,
            this.sys.game.canvas.height / 1.2, 
            'flecha')
        .setScale(-0.3, 0.3)
        .setInteractive()
        .on('pointerdown', () => this.scene.start('localizationScene', {
            fondo: data.fondo,
            ant: this.ant,
            player: this.player.getConfigData(), 
            inventory: this.inventory.getConfigData()
        }));


    }

    update(){
        if((this.npc == 'PITIBANCO'))
        {
            // Actualiza el texto con el nuevo valor de la variable
            this.anxietyText.setText(`Ansiedad: ${this.player.ansiedad}`);
            this.vidaText.setText(`Vida actual: ${this.player.health}`);
        }
        
    }

}