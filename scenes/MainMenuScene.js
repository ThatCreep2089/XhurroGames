

export default class MainMenuScene extends Phaser.Scene {
    constructor(){
        super({key: "MainMenu"})
    }

    preload()
    {
        this.load.image('fondo', "./assets/fondos/madrid.jpg") //fondo
    }

    create(){

        //Pintamos un fondo
        var back = this.add.image(0, 0, 'fondo').setOrigin(0, 0);

        //escalar el fondo
        var scaleX = this.cameras.main.width / back.width;
        var scaleY = this.cameras.main.height / back.height;
        
        var scale = Math.min(scaleX, scaleY);
        
        back.setScale(scale);
        
        back.setPosition(
            this.cameras.main.width / 2 - back.displayWidth / 2,
            this.cameras.main.height / 2 - back.displayHeight / 2
        );
        
        // Centrar el texto "XHURROJUEGO"
        let xhurrotexto = this.add.text(
            this.sys.game.canvas.width / 2,   // Centrado en el eje X
            this.sys.game.canvas.height / 3,  // Centrado en el eje Y (ajustado para que esté arriba)
            'YUSOA ES LEY',
            { fontSize: '200px', fontFamily: 'Arial', color: '#ffffff' }
        );
        xhurrotexto.setStroke('#000000', 12);  // Trazo negro
        
        // Ajustar el origen para centrar el texto
        xhurrotexto.setOrigin(0.5, 0.5);
        
        let startButton = this.add.rectangle(
            this.sys.game.canvas.width / 2,  // Centrado en el eje X
            this.sys.game.canvas.height / 1.7,  // Centrado en el eje Y (ajustado para que esté abajo)
            700, 250, 0x00f000
        )
        .setInteractive()
        .on('pointerdown', () => this.scene.start("zonaScene"));
        
        // Ajustamos el origen para que el rectángulo esté centrado
        startButton.setOrigin(0.5, 0.5);
        
        
        
        // Centrar el texto "START"
        let text = this.add.text(
            this.sys.game.canvas.width / 2,   // Centrado en el eje X
            this.sys.game.canvas.height / 1.7,  // Centrado en el eje Y (ajustado para que esté debajo del botón)
            'START',
            { fontSize: '150px', fontFamily: 'Arial', color: '#ffffff' }
        );
        
        // Ajustar el origen para centrar el texto
        text.setOrigin(0.5, 0.5);

        // Centrar el texto "XHURROJUEGO"
        let doneTexto = this.add.text(
            this.sys.game.canvas.width / 2,   // Centrado en el eje X
            this.sys.game.canvas.height / 1.2,  // Centrado en el eje Y (ajustado para que esté arriba)
            'HECHO POR XHURRO GAMES',
            { fontSize: '75px', fontFamily: 'Arial', color: '#ffffff' }
        );
        doneTexto.setStroke('#000000', 8);  // Trazo negro
        // Ajustar el origen para centrar el texto
        doneTexto.setOrigin(0.5, 0.5);

        
    }

}