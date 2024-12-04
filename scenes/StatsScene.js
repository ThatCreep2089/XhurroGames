
//import Player from '../src/Player.js';

export default class StatsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StatsScene' });
    
        
        
    }

init(data){
    //this.data = data;
   /* console.log(data.player)
    this.playerConfig = data.player*/
}

    preload() {
        this.load.image('fondo', 'assets/stats/fondoStats.png'); 
        this.load.image('elle', 'assets/stats/elle2.png'); 
        this.load.image('vida', 'assets/stats/vida.png'); 
        this.load.image('ansiedad', 'assets/stats/ansiedad.png');
        this.load.image('ptos', 'assets/stats/ptosCualidad.png');  
        this.load.image('cualidades', 'assets/stats/cualidades.png'); 
    }

    create() {
       /* //Creamos el player para poder acceder a el 
        this.player = new Player(this, startPosition.x, startPosition.y);
        this.player.init(this.playerConfig);
        
        this.player.setVisible(false); //que elle NO se vea
        this.player.changeMove(false);*/

                //Pintamos un fondo
                this.add.image(0, 0, 'fondo').setOrigin(0, 0);
                //pintamos los stats, vida, ansiedad, ptoscualidad, cualidades
                this.add.image(0,0,'vida', 'assets/stats/elle2.png'); 
                this.add.image(0,0,'ansiedad', 'assets/stats/elle2.png'); 
                this.add.image(0,0,'ptos', 'assets/stats/elle2.png'); 
                this.add.image(0,0,'cualidades', 'assets/stats/elle2.png'); 
        
                //pintamos a elle
                this.add.image(900,600,'elle', 'assets/stats/elle2.png'); 
                
                
        // Mostramos texto de CONTACTOS
        let titulo = this.add.text(0, this.sys.game.canvas.height/15,
        "ESTADISTICAS");
        titulo.setFontSize(100);
        titulo.setStroke('#000000', 7);
        titulo.x = this.sys.game.canvas.width/2 - titulo.width/2; 




    }

    
}
