/*
Escena que sirve para mostar de forma visual los atributos del player
como vida, cualidades, ansiedad y ptos mana no se pueden midificar esos valores desde esta escena
simplemente el jugador los observa*/
import Player from '../src/Player.js';

export default class StatsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StatsScene' });
    
        
        
    }

init(data){
    //recibimos info 
    this.lastScene = data.lastScene;
    this.inventoryConfig = data.inventory; // Recibe el inventario del objeto `data`
    this.playerConfig= data.player;
    this.modo= data.modo;
    this.dialogueJson = data.dialogueJson;
    
}
CrearText(x,y,string,fontSize,color,num)
{
 let text=this.add.text(x,y,string)
 text.setFontSize(fontSize);
 text.setStroke(color, num);
 return text;
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
            'flechaM')
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

      
        // TITULOS ESTADISTICAS
        let titulo = this.CrearText(600, this.sys.game.canvas.height/15,
        "ESTADÍSTICAS",100,'#000000',7);
      
        let vida= this.CrearText(550, 500,
            "VIDA"+" "+this.player.health ,60,'#000000',7);
       
        let vidaM= this.CrearText(500, 600,
            "VIDA MÁX"+" "+this.player.maxHealth ,60,'#000000',7);
   
        let ansi= this.CrearText(550, 400,
            "ANSIEDAD"+" "+this.player.ansiedad,60,'#000000',7);
 
        let cualidades= this.CrearText(1000, 400,
            "CUALIDADES",60,'#000000',7);
 

        let humildadd= this.CrearText(1000, 500,
            "HUMILDAD"+" "+this.player.humildad,50,'#000000',7);
 
         
            let trabajoo= this.CrearText(1000, 600,
                "TRABAJO DURO"+" "+this.player.trabajoDuro,50,'#000000',7);
           
                let Afecto= this.CrearText(1000, 700,
                    "AFECTO"+" "+this.player.afecto,50,'#000000',7);
             
                    let Agnosticismo= this.CrearText(1000, 800,
                        "AGNOSTICISMO"+" "+this.player.agnosticismo,50,'#000000',7);
                       
        let ptos= this.add.text(1575, 450,
        "PTOS");
        ptos.setFontSize(60);
        ptos.setStroke('#000000', 7);
                        
        let cualidades2= this.add.text(1575, 500,
        "MANA");
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
