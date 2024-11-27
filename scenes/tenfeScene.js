export default class TenfeScene extends Phaser.Scene {
    constructor(){
        super({key: "tenfeScene"})
    }

    preload()
    {
        //FONDO
            this.load.image('tenfeFondo', 'assets/fondos/tenfe.jpeg');
    }

    init(data){
        // Usar el parámetro 'fondo' para decidir qué fondo cargar
        this.mode = data.fondo || 'parque';
    }

    create(data){
        console.log("tenfeFondo");//debug
        
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
        
        //BACK BUTTON
        const backScene = this.add.image(
            this.sys.game.canvas.width / 12,
            this.sys.game.canvas.height / 1.2, 
            'flecha')
        .setScale(-0.3, 0.3)
        .setInteractive()
        .on('pointerdown', () => this.scene.start('zonaScene', { modo: data.modo}));
        
        //gambling de tenfe
        const gachaButton = this.add.text(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2 - 50,
            'esperar tenfe',
            { fontSize: '32px', color: '#ffffff', backgroundColor: '#000000', padding: { x: 10, y: 5 } }
        ).setOrigin(0.5).setInteractive();

        const resultText = this.add.text(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2 + 50,
            '',
            { fontSize: '32px', color: '#ff0000' }
        ).setOrigin(0.5);

        let timerEvent = null;


    }

}