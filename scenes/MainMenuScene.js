

export default class MainMenuScene extends Phaser.Scene {
    constructor(){
        super({key: "MainMenuScene"})
    }

    preload()
    {
       
    }

    create(){
        this.dialogueJson = this.cache.json.get('dialogueJson');;

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
        
       this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2.5,
            'titulo'
       )
       .setScale(0.45);

        let startButton = this.add.rectangle(
            this.sys.game.canvas.width / 2,  // Centrado en el eje X
            this.sys.game.canvas.height / 1.5,  // Centrado en el eje Y (ajustado para que esté abajo)
            500, 200, 0x4f4f4f
        )
        .setInteractive()
        .on('pointerdown', () => this.scene.start("dialogueScene", {dialogueJson: this.dialogueJson}));
        
        // Ajustamos el origen para que el rectángulo esté centrado
        startButton.setOrigin(0.5, 0.5);
        
        
        
        // Centrar el texto "START"
        let text = this.add.text(
            this.sys.game.canvas.width / 2,   // Centrado en el eje X
            this.sys.game.canvas.height / 1.5,  // Centrado en el eje Y (ajustado para que esté debajo del botón)
            'START',
            { fontSize: '100px', fontFamily: 'Georgia', fontStyle: 'bold', color: '#ffffff' }
        );
        
        // Ajustar el origen para centrar el texto
        text.setOrigin(0.5, 0.5);

        

        
    }

}