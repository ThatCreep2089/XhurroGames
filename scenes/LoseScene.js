export default class LoseScene extends Phaser.Scene {
    constructor(){
        super({key: "lose"})
    }


    create(){

        this.add.text(450,335, 'DERROTA ');
    }

}