import Player from '../src/Player.js';
import Inventory from '../src/inventory.js';

export default class localizationScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "localizationScene"});
        
        this.mode;
        this.titulo = null;
        this.npcTalk;
    }

    init(data){
        // Usar el parámetro 'fondo' para decidir qué fondo cargar
        this.mode = data.fondo || 'parque';
        this.modo = data.modo;
    }

    preload(){
        //FONDOS
            this.load.image('parque', 'assets/fondos/parque.jpg'); //fondo
            this.load.image('puente', 'assets/fondos/puente.jpg'); //fondo
            this.load.image('bar', 'assets/fondos/barFondo.jpg'); //fondo
            this.load.image('cni', 'assets/fondos/cniFondo.jpg'); //fondo
            this.load.image('hipodromo', 'assets/fondos/hipodromoFondo.jpg'); //fondo
            this.load.image('cruzRoja', 'assets/fondos/cruzRoja.jpg'); //fondo
            this.load.image('iglesia', 'assets/fondos/iglesia.jpg'); //fondo

        //NPCS
            this.load.image('PACO', 'assets/npc/paco (2).png');
            this.load.image('HUMBERTO', 'assets/npc/humberto (2).png');
            this.load.image('MARIA', 'assets/npc/maria.png');
            this.load.image('NPC', 'assets/npc/npc.png');

        //BACK BUTTON
        this.load.image('flecha', 'assets/other/flecha.png');

        //FLECHAS
        this.load.image('arrow', 'assets/other/arrow.png');

        this.load.image('accept', 'assets/other/accept.png');

        
        //OBJETOS COLECCIONABLES
        
    }

    

    create(data){
        
        //1. PINTAR FONDO
            //Pintamos un fondo
            var back = this.add.image(0, 0, this.mode).setOrigin(0, 0);

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
            // TEXTO
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

            this.names = this.add.group();
            
            //NPCS (DEPENDEN DE DATA)
                //LOCALIZACION: BAR
                    if(this.mode == 'bar')
                        {
                            this.addNPCToScene("PACO", this.sys.game.canvas.width / 4, this.sys.game.canvas.height / 1.4, 0.9);
                            this.addNPCToScene("NPC", this.sys.game.canvas.width / 2,this.sys.game.canvas.height / 1.4, 3);
                            this.addNPCToScene("NPC", this.sys.game.canvas.width / 1.35,this.sys.game.canvas.height / 1.4, 3);
                        }
                //LOCALIZACION: CNI
                    else if(this.mode == 'cni')
                    {
                        this.addNPCToScene("MARIA", this.sys.game.canvas.width / 4, this.sys.game.canvas.height / 1.4, 0.6);
                        this.addNPCToScene("NPC", this.sys.game.canvas.width / 2,this.sys.game.canvas.height / 1.4, 3);
                        this.addNPCToScene("NPC", this.sys.game.canvas.width / 1.35,this.sys.game.canvas.height / 1.4, 3);
                    }
                //LOCALIZACION: HIPODROMO
                    else if(this.mode == 'hipodromo')
                    {
                        this.addNPCToScene("HUMBERTO", this.sys.game.canvas.width / 4, this.sys.game.canvas.height / 1.4, 0.4);
                        this.addNPCToScene("NPC", this.sys.game.canvas.width / 2,this.sys.game.canvas.height / 1.4, 3);
                        this.addNPCToScene("NPC", this.sys.game.canvas.width / 1.35,this.sys.game.canvas.height / 1.4, 3);

                    }
                //LOCALIZACION: PARQUE
                    else if(this.mode == 'parque')
                    {
                        this.addNPCToScene("PACO", this.sys.game.canvas.width / 3.8, this.sys.game.canvas.height / 1.4, 0.28);
                        this.addNPCToScene("HUMBERTO", this.sys.game.canvas.width / 2.05,this.sys.game.canvas.height / 1.4, 0.28);
                        this.addNPCToScene("MARIA", this.sys.game.canvas.width / 1.35,this.sys.game.canvas.height / 1.4, 0.6);
                    }
                //LOCALIZACION: PUENTE
                    else if(this.mode == 'puente')
                    {
                        this.addNPCToScene("PACO", this.sys.game.canvas.width / 4, this.sys.game.canvas.height / 1.4, 0.9);
                        this.addNPCToScene("HUMBERTO", this.sys.game.canvas.width / 2,this.sys.game.canvas.height / 1.4, 0.4);
                        this.addNPCToScene("MARIA", this.sys.game.canvas.width / 1.35,this.sys.game.canvas.height / 1.4, 0.6);
                    }
                  //LOCALIZACION: CRUZ ROJA
                    else if(this.mode == 'cruzRoja')
                    {
                        this.addNPCToScene("PACO", this.sys.game.canvas.width / 4, this.sys.game.canvas.height / 1.4, 0.9);
                        this.addNPCToScene("HUMBERTO", this.sys.game.canvas.width / 2,this.sys.game.canvas.height / 1.4, 0.4);
                        this.addNPCToScene("MARIA", this.sys.game.canvas.width / 1.35,this.sys.game.canvas.height / 1.4, 0.6);
                    }
                    //LOCALIZACION: IGLESIA
                    else if(this.mode == 'iglesia')
                        {
                            this.addNPCToScene("PACO", this.sys.game.canvas.width / 4, this.sys.game.canvas.height / 1.4, 0.9);
                            this.addNPCToScene("HUMBERTO", this.sys.game.canvas.width / 2,this.sys.game.canvas.height / 1.4, 0.4);
                            this.addNPCToScene("MARIA", this.sys.game.canvas.width / 1.35,this.sys.game.canvas.height / 1.4, 0.6);
                        }


            //FLECHAS
                this.arrows = this.add.group();
                var arrow1 = this.add.image(
                    this.sys.game.canvas.width / 4,
                    this.sys.game.canvas.height / 2.5, 
                    'arrow')
                    .setScale(0.2, 0.1);
                this.arrows.add(arrow1);

                var arrow2 = this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 2.5, 
                    'arrow')
                    .setScale(0.2, 0.1);
                this.arrows.add(arrow2);

                var arrow3 = this.add.image(
                    this.sys.game.canvas.width / 1.37,
                    this.sys.game.canvas.height / 2.5, 
                    'arrow')
                    .setScale(0.2, 0.1);
                this.arrows.add(arrow3);


            //ELLE (para la ansiedad)
            let startPosition = window.gameState.playerPosition || { x: 278, y: 150 }; //posicion de la tenfe
            this.player = new Player(this, startPosition.x, startPosition.y);
            this.player.setVisible(false); //que elle NO se vea
            this.player.changeMove(false);
            console.log("Ansiedad: " + this.player.ansiedad); //debug

            this.Inventory = new Inventory(this);

            //ACCEPT && BACK
                this.accept = this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 3.2, 
                    'accept')
                .setScale(0.5, 0.5)
                .setInteractive()
                .on('pointerdown', () => {
                    
                    this.player.IncreaseAnxiety(10);
                    console.log("Ansiedad: " + this.player.ansiedad); //debug
                    console.log(this.npcTalk);
                    this.scene.start('dialogueScene', { npc: this.npcTalk, fondo: this.mode, modo: this.modo})
                }); //cambiar a escena dialogo
                
                this.backButton = this.add.image(
                    this.sys.game.canvas.width / 4,
                    this.sys.game.canvas.height / 3.2, 
                    'flecha')
                .setScale(-0.3, 0.3)
                .setInteractive()
                .on('pointerdown', () => {
                    this.acceptButton(false, "Con quien quieres hablar?");
                });
    
                
                this.acceptButton(false, "Con quien quieres hablar?"); //empieza ocultando boton aceptar


            //MOSTRAR ANSIEDAD
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


            //BACK BUTTON
            const backScene = this.add.image(
                this.sys.game.canvas.width / 12,
                this.sys.game.canvas.height / 1.2, 
                'flecha')
            .setScale(-0.3, 0.3)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('zonaScene', { modo: data.modo}));

            
        // botones para testeo
        let combatButton = this.add.rectangle(
            this.sys.game.canvas.width / 1.2,
            this.sys.game.canvas.height / 5, 
            50, 50, 0xff0000)
        .setInteractive()
        .setScale(4, 2)
        .on('pointerdown', () => this.scene.start('CombatScene', {
            player: this.player.getConfigData(), 
            inventory: this.Inventory.getConfigData()
        }));

         // Texto para mostrar "Ansiedad" en el centro del botón
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


    addNPCToScene(nombre, x, y, scale){    
        //BOTON Paco
        const spritePJ = this.add.image(
            x,
            y, 
            nombre) //id
        .setOrigin(0.5, 0.5)
        .setScale(scale)
        .setInteractive()
        .on('pointerdown', () =>{
            this.acceptButton(true, "Quieres hablar con "+ nombre +"?");
            this.npcTalk = nombre;
            })
        .on('pointerover', () => spritePJ.setTint(0xff0000)) //para que se ponga rojo cuando el raton está encima
        .on('pointerout', () => spritePJ.clearTint());

        
        //NOMBRE Paco
        let textPJ = this.add.text(
            x,   // coordenada x
            this.sys.game.canvas.height / 3.7, // coordenada y
            nombre, //frase
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
}