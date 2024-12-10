export default class EndCombateScene extends Phaser.Scene {
    constructor(){
        super({key: "endCombatScene"})
    }

init(data){
    this.playerConfig = data.player;
    this.inventoryConfig = data.inventory;
    this.battleResult = data.battleResult;
}

    create(data){

        let result;
        if(this.battleResult = true)
        {
            result = 'VICTORIA';
        }
        else
        {
            result = 'DERROTA';
        }

        this.add.text(
            this.sys.game.canvas.width / 2.5,
            this.sys.game.canvas.height / 2,
            result, { 
            fontSize: '50px', 
            color: '#FFFFFF',       //Blanco
            fontFamily: 'Georgia',  
        });

        //BACK BUTTON (VOLVER A ZONA SCENE)
        const backScene = this.add.image(
            this.sys.game.canvas.width / 12,
            this.sys.game.canvas.height / 1.2, 
            'flecha')
        .setScale(-0.3, 0.3)
        .setInteractive()
        .on('pointerdown', () => this.scene.start('zonaScene', { modo: data.modo,
                                                                player: this.playerConfig,
                                                                inventory: this.inventoryConfig}));

    }

}