
//import Player from '../src/Player.js';

export default class StatsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StatsScene' });
    
        
        
    }

init(data){
    /*this.lastScene = data.lastScene;
    //this.inventoryConfig = data.inventory; // Recibe el inventario del objeto `data`
    this.playerConfig= data.player;
    this.modo= data.modo;
    console.log(data.lastScene);
    console.log(data.player);*/
    
    
}

    preload() {
        this.load.image('flechaa', 'assets/other/flecha.png');
        this.load.image('fondoStats', 'assets/stats/fondoStats.png'); 
        this.load.image('elleRojo', 'assets/stats/elleRojo.png'); 
        this.load.image('elleVerde', 'assets/stats/elleVerde.png'); 
        this.load.image('elleAmarillo', 'assets/stats/elleAmarillo.png'); 
        this.load.image('elleAzul', 'assets/stats/elleAzul.png'); 
       
    }

    create() {
       //Creamos el player para poder acceder a el 
      /* this.player= new Player(this,0,0);
       this.player.init(this.playerConfig);

        
        this.player.setVisible(false); //que elle NO se vea
        this.player.changeMove(false);*/

        //BACK BUTTON (VOLVER A LA ESCENA CORRESPONDIENTE)
        var backScene;
        backScene = this.add.image(
            this.sys.game.canvas.width / 12,
            this.sys.game.canvas.height / 1.2, 
            'flechaa')
        .setScale(-0.3, 0.3)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start(this.lastScene, { 
                
                modo: this.modo
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

        let vida= this.add.text(225, 500,
        "VIDA");
        vida.setFontSize(60);
        vida.setStroke('#000000', 7);
           
        let ansi= this.add.text(600, 500,
        "ANSIEDAD");
        ansi.setFontSize(60);
        ansi.setStroke('#000000', 7);
                
        let cualidades= this.add.text(1000, 500,
        "CUALIDADES");
        cualidades.setFontSize(60);
        cualidades.setStroke('#000000', 7);
                    
        let ptos= this.add.text(1575, 450,
        "PTOS");
        ptos.setFontSize(60);
        ptos.setStroke('#000000', 7);
                        
        let cualidades2= this.add.text(1450, 500,
        "CUALIDADES");
        cualidades2.setFontSize(60);
        cualidades2.setStroke('#000000', 7);
                           
        //TEXTO CON ESTADISTICAS
/*
        //vida
        let vidaMax= this.add.text(1575, 450,
        player.maxHealth);
        vidaMax.setFontSize(60);
        vidaMax.setStroke('#000000', 7);
            
        let vidaActual= this.add.text(1575, 450,
        player.health);
        idaActual.setFontSize(60);
        idaActual.setStroke('#000000', 7);
        //ansiedad
        let ansiedad= this.add.text(1575, 450,
        this.player.ansiedad);
        ansiedad.setFontSize(60);
        ansiedad.setStroke('#000000', 7);
        
        //cualidades
        let humildad= this.add.text(1575, 450,
        player.humildad);
        humildad.setFontSize(60);
        humildad.setStroke('#000000', 7);

        let trabajo= this.add.text(1575, 450,
        player.trabajoDuro);
        trabajo.setFontSize(60);
        trabajo.setStroke('#000000', 7);

        let agnosticismo= this.add.text(1575, 450,
        player.agnosticismo);
        agnosticismo.setFontSize(60);
        agnosticismo.setStroke('#000000', 7);
        
        let afecto= this.add.text(1575, 450,
        player.afecto);
        afecto.setFontSize(60);
        afecto.setStroke('#000000', 7);

                                                
        //ptos cualidad
        let ptosculidad= this.add.text(1575, 450,
            player.mana);
            ptosculidad.setFontSize(60);
            ptosculidad.setStroke('#000000', 7);
        */
    }

    
}
