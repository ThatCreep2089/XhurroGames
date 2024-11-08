export default class VictoryScene extends Phaser.Scene {
    constructor(){
        super({key: "victory"})
    }


    create(){

        this.add.text(450,335, 'VICTORIA ');
    }

}