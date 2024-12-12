export default class EndCombateScene extends Phaser.Scene {
    constructor(){
        super({key: "endCombatScene"})
    }

init(data){
    this.ant = data.ant;
    this.playerConfig = data.player;
    this.inventoryConfig = data.inventory;
    this.npc = data.npc;
    this.fondo = data.fondo;
    this.dialogueJson = data.dialogueJson;
    this.battleResult = data.battleResult;
}


    create(data){

        //musica
        const music = this.sound.get('zoneMusic');
        //console.log(music);
        if (music) {
            
            music.resume();
        }


        //depende de el resultado es victoria o derrota
        let result;
        if(this.battleResult == true)
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
        .on('pointerdown', () => 
            music.stop(),
            this.scene.start('dialogueScene', {
            ant: this.ant,
            player: this.playerConfig, 
            inventory: this.inventoryConfig,
            npc: this.npc,
            fondo: this.fondo,
            dialogueJson: this.dialogueJson,
            battleResult: this.battleResult }));

    }

}