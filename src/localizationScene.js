export default class localizationScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "localizationScene"});
    }

    init(){

    }

    preload(){
        this.load.image('parque', 'assets/parque.jpg'); //fondo
    }

    create(){
        //Pintamos un fondo
        var back = this.add.image(0, 0, 'parque').setOrigin(0, 0);

        //escalar el fondo
        var scaleX = this.cameras.main.width / back.width;
        var scaleY = this.cameras.main.height / back.height;
        
        var scale = Math.min(scaleX, scaleY);
        
        back.setScale(scale);
        
        back.setPosition(
            this.cameras.main.width / 2 - back.displayWidth / 2,
            this.cameras.main.height / 2 - back.displayHeight / 2
        );

    }

    update(){

    }
}