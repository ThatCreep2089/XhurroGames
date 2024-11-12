export default class VictoryScene extends Phaser.Scene {
    constructor(){
        super({key: "victory"})
    }


    create(){

        this.add.text(
            this.sys.game.canvas.width / 2.5,
            this.sys.game.canvas.height / 2,
            'VICTORIA', { 
            fontSize: '50px', 
            color: '#FFFFFF',       //Blanco
            fontFamily: 'Georgia',  
        });
    }

}