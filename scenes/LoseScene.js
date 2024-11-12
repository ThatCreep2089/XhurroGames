export default class LoseScene extends Phaser.Scene {
    constructor(){
        super({key: "lose"})
    }


    create(){

        this.add.text(
            this.sys.game.canvas.width / 2.5,
            this.sys.game.canvas.height / 2,
            'DERROTA', { 
            fontSize: '50px', 
            color: '#FFFFFF',       //Blanco
            fontFamily: 'Georgia',  
        });
    }

}