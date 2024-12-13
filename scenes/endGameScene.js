/**
 * Escena que actúa como Menú al finalizar el juego.
 * Contiene un botón que reinicia la página web entera para comenzar de nuevo el juego.
 */

export default class EndGameScene extends Phaser.Scene {
    constructor(){
        super({key: "endGameScene"})
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
        

        let title = this.add.text(
            this.sys.game.canvas.width / 2,   // Centrado en el eje X
            this.sys.game.canvas.height / 3,  // Centrado en el eje Y (ajustado para que esté debajo del botón)
            'THE END',
            { fontSize: '200px', fontFamily: 'Georgia', fontStyle: 'bold', color: '#ffffff' }
        );
        title.setOrigin(0.5, 0.5);

        let startButton = this.add.rectangle(
            this.sys.game.canvas.width / 2,  // Centrado en el eje X
            this.sys.game.canvas.height / 1.5,  // Centrado en el eje Y (ajustado para que esté abajo)
            600, 200, 0x4f4f4f
        )
        .setInteractive()
        .on('pointerdown', () => {
            //reinicia la pagina entera
            window.location.reload();
        });
        
        // Ajustamos el origen para que el rectángulo esté centrado
        startButton.setOrigin(0.5, 0.5);
        
        
        
        // Centrar el texto "START"
        let text = this.add.text(
            this.sys.game.canvas.width / 2,   // Centrado en el eje X
            this.sys.game.canvas.height / 1.5,  // Centrado en el eje Y (ajustado para que esté debajo del botón)
            'BACK TO MAIN MENU',
            { fontSize: '50px', fontFamily: 'Georgia', fontStyle: 'bold', color: '#ffffff' }
        );
        
        // Ajustar el origen para centrar el texto
        text.setOrigin(0.5, 0.5);

        

        
    }

}