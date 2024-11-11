
export default class InventoryScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "InventoryScene"});
    }


    init(){

    }

    preload()//cargar imagenes*
    {
        this.load.image('fondo', 'assets/fondos/FondoInventario.jpg'); 
       
    }

    create(){ 
        const back=  this.add.image(0,0,'fondo').setOrigin(0,0);
        
        var scaleX= this.cameras.main.width/ back.width;
        var scaleY= this.cameras.main.height/ back.height;
        var scale = Math.min(scaleX, scaleY);
        
        back.setScale(scale);
        
        back.setPosition(
            this.cameras.main.width / 2 - back.displayWidth / 2,
            this.cameras.main.height / 2 - back.displayHeight / 2
        );


      // Mostramos texto de INVENTARIO
        let titulo = this.add.text(0, this.sys.game.canvas.height/50,
        "INVENTARIO");
        titulo.setFontSize(100);
        titulo.setStroke('#800080', 3);
        titulo.x = this.sys.game.canvas.width/2 - text.width/2;    



    }  
        
        
        
        
        
        
    
}