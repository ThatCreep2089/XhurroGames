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
        this.load.image('puente', 'assets/puente.jpg'); //fondo
    }

    create(data){
        // Usar el parámetro 'fondo' para decidir qué fondo cargar
        const fondo = data.fondo || 'puente'; // 'fondo1' por defecto
        
        //Pintamos un fondo
        var back = this.add.image(0, 0, fondo).setOrigin(0, 0);

        //escalar el fondo
        var scaleX = this.cameras.main.width / back.width;
        var scaleY = this.cameras.main.height / back.height;
        
        var scale = Math.min(scaleX, scaleY);
        
        back.setScale(scale);
        
        back.setPosition(
            this.cameras.main.width / 2 - back.displayWidth / 2,
            this.cameras.main.height / 2 - back.displayHeight / 2
        );


        // botones para testeo
        const backScene = this.add.rectangle(150, 300, 100, 50, 0x000000)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('test'));

    }

    update(){

    }
}