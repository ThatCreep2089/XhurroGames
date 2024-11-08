

export default class MainMenuScene extends Phaser.Scene {
    constructor(){
        super({key: "MainMenu"})
    }


    create(){

        let startButton = this.add.rectangle(850, 750, 500, 500 ,0x00f000)
            .setInteractive()
            .on('pointerdown', () => this.scene.start("zonaScene"));


        let xhurrotexto = this.add.text(600,250, 'XHURROJUEGO')
        xhurrotexto.setFontSize(200);

        let text = this.add.text(600,750, 'START');
        text.setFontSize(200);
    }

}