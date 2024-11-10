

export default class MainMenuScene extends Phaser.Scene {
    constructor(){
        super({key: "MainMenu"})
    }


    create(){

        // Centrar el texto "XHURROJUEGO"
        let xhurrotexto = this.add.text(
            this.sys.game.canvas.width / 2,   // Centrado en el eje X
            this.sys.game.canvas.height / 3,  // Centrado en el eje Y (ajustado para que esté arriba)
            'XHURROJUEGO',
            { fontSize: '200px', fontFamily: 'Arial', color: '#ffffff' }
        );
        
        // Ajustar el origen para centrar el texto
        xhurrotexto.setOrigin(0.5, 0.5);
        
        let startButton = this.add.rectangle(
            this.sys.game.canvas.width / 2,  // Centrado en el eje X
            this.sys.game.canvas.height / 1.4,  // Centrado en el eje Y (ajustado para que esté abajo)
            800, 300, 0x00f000
        )
        .setInteractive()
        .on('pointerdown', () => this.scene.start("zonaScene"));
        
        // Ajustamos el origen para que el rectángulo esté centrado
        startButton.setOrigin(0.5, 0.5);
        
        
        
        // Centrar el texto "START"
        let text = this.add.text(
            this.sys.game.canvas.width / 2,   // Centrado en el eje X
            this.sys.game.canvas.height / 2 + 250,  // Centrado en el eje Y (ajustado para que esté debajo del botón)
            'START',
            { fontSize: '150px', fontFamily: 'Arial', color: '#ffffff' }
        );
        
        // Ajustar el origen para centrar el texto
        text.setOrigin(0.5, 0.5);
        
    }

}