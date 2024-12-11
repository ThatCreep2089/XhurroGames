import Player from '../src/Player.js';

export default class StatsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StatsScene' });
    
        
        
    }

init(data){
    this.lastScene = data.lastScene;
    this.inventoryConfig = data.inventory; // Recibe el inventario del objeto `data`
    this.playerConfig= data.player;
    this.modo= data.modo;
    this.dialogueJson = data.dialogueJson;
    
}

    preload() {
    }

    create() {
       //Creamos el player para poder acceder a el 
       this.player= new Player(this,0,0);
       this.player.init(this.playerConfig);
       
       this.player.setVisible(false); //que elle NO se vea
       this.player.changeMove(false);

        //BACK BUTTON (VOLVER A LA ESCENA CORRESPONDIENTE)
        var backScene;
        backScene = this.add.image(
            this.sys.game.canvas.width / 12,
            this.sys.game.canvas.height / 1.2, 
            'flechaa')
        .setScale(-0.3, 0.3)
        .setInteractive()
        .setDepth(2)
        .on('pointerdown', () => {
            this.scene.start(this.lastScene, { 
                player: this.playerConfig,
                inventory: this.inventoryConfig,
                modo: this.modo,
                dialogueJson: this.dialogueJson
            });
        });

        //Pintamos un fondo
        let fondo=this.add.image(0, 0, 'fondoStats').setOrigin(0, 0);

    
        //añadimos rectangulo
        let rect = this.add.rectangle(0, 200,2900, 800, 0xf6f6f6).setOrigin(0);//fondo
        
        //AÑADIMOS ELLES
        let elleRojo= this.add.image(300,600,'elleRojo','assets/stats/elleRojo.png'); 
        elleRojo.setScale(0.8,0.8);

        let elleVerde= this.add.image(1200,600,'elleVerde','assets/stats/elleVerde.png'); 
        elleVerde.setScale(0.8,0.8);

        let elleAmarillo= this.add.image(1650,600,'elleAmarillo','assets/stats/elleAmarillo.png'); 
        elleAmarillo.setScale(0.8,0.8);

                
        let elleAzul= this.add.image(750,600,'elleAzul','assets/stats/elleAzul.png'); 
        elleAzul.setScale(0.8,0.8);
                
        // TITULOS ESTADISTICAS
        let titulo = this.add.text(0, this.sys.game.canvas.height/15,
        "ESTADISTICAS");
        titulo.setFontSize(100);
        titulo.setStroke('#000000', 7);
        titulo.x = this.sys.game.canvas.width/2 - titulo.width/2; 

        let vida= this.add.text(175, 500,
        "VIDA"+" "+this.player.health );
        vida.setFontSize(60);
        vida.setStroke('#000000', 7);
        let vidaM= this.add.text(100, 600,
        "VIDA MÁX"+" "+this.player.maxHealth);
        vidaM.setFontSize(60);
        vidaM.setStroke('#000000', 7);
           
        let ansi= this.add.text(550, 500,
        "ANSIEDAD"+" "+this.player.ansiedad);
        ansi.setFontSize(60);
        ansi.setStroke('#000000', 7);
                
        let cualidades= this.add.text(1000, 400,
        "CUALIDADES");
        cualidades.setFontSize(60);
        cualidades.setStroke('#000000', 7);

        let humildadd= this.add.text(1000, 500,
            "HUMILDAD"+" "+this.player.humidad);
            humildadd.setFontSize(50);
            humildadd.setStroke('#000000', 7); 
         
            
            let trabajoo= this.add.text(1000, 600,
                "TRABAJO DURO"+" "+this.player.trabajoDuro);
                trabajoo.setFontSize(50);
                trabajoo.setStroke('#000000', 7); 
                let Afecto= this.add.text(1000, 700,
                    "AFECTO"+" "+this.player.afecto);
                    Afecto.setFontSize(50);
                    Afecto.setStroke('#000000', 7);  
                    let Agnosticismo= this.add.text(1000, 800,
                        "AGNOSTICISMO"+" "+this.player.agnosticismo);
                        Agnosticismo.setFontSize(50);
                        Agnosticismo.setStroke('#000000', 7);     
        let ptos= this.add.text(1575, 450,
        "PTOS");
        ptos.setFontSize(60);
        ptos.setStroke('#000000', 7);
                        
        let cualidades2= this.add.text(1450, 500,
        "CUALIDADES");
        cualidades2.setFontSize(60);
        cualidades2.setStroke('#000000', 7);

        let cualidades3= this.add.text(1600, 550,
           this.player.mana);
            cualidades3.setFontSize(60);
            cualidades3.setStroke('#000000', 7);
                           
        let maxcualidades= this.add.text(1500, 650,
            "MAX"+" "+this.player.maxMana);
            maxcualidades.setFontSize(60);
            maxcualidades.setStroke('#000000', 7);
        
    }

    
}
