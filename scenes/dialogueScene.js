import DialogText from "../src/dialog_plugin.js";

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
        this.load.image('paco', 'assets/npc/paco.png');
        this.load.image('humberto', 'assets/npc/humberto.png');
        this.load.image('maria', 'assets/npc/maria.png');
        this.load.image('npc', 'assets/npc/npc.png');
    }

    init(data){
        // Usar el parámetro 'fondo' para decidir qué fondo cargar
        this.npc = data.npc || 'humberto';
        this.fondo = data.fondo || 'puente';
        this.modo = data.modo;
        console.log(data.fondo);
    }

    create(data){
        console.log(data.npc);//debug
        
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
        if(this.npc == 'paco')
        {
            //PACO
                const paco = this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 1.4, 
                    'paco')
                .setOrigin(0.5, 0.5)
                .setScale(1.5);
        }
        else if(this.npc == 'humberto')
        {
            //HUMBERTO
                const humberto = this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 1.4, 
                    'humberto')
                .setOrigin(0.5, 0.5)
                .setScale(0.8)
        }
        else if(this.npc == 'maria')
        {
            //MARIA
                const maria = this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 1.4, 
                    'maria')
                .setOrigin(0.5, 0.5)
                .setScale(1)
        }
        else if(this.npc == 'random')
        {
            //Npc
                const npc = this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 1.4, 
                    'npc') //id
                .setOrigin(0.5, 0.5)
                .setScale(4)
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
            fontSize: 24,
            fontFamily: "pixel"
        });

        //this.dialog.toggleWindow();
        this.dialog.setText("Bu! Vamos a hacer un jueguito", true);



        //BACK BUTTON
        const backScene = this.add.image(
            this.sys.game.canvas.width / 12,
            this.sys.game.canvas.height / 1.2, 
            'flecha')
        .setScale(-0.3, 0.3)
        .setInteractive()
        .on('pointerdown', () => this.scene.start('localizationScene', { fondo: data.fondo, modo: this.modo}));


    }

}