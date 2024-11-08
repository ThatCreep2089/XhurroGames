import Player from '../src/Player.js';
import Enemy from '../src/Enemy.js';

export default class CombatScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CombatScene' });
        this.turn = 'player'; // Inicia el turno el player

        
    }

init(boss){
    this.boss = boss
}

    preload() {
        //Cargar imágenes
        this.load.image("elle", "./assets/elle.png") //player
        this.load.image("enemy", "./assets/yusoa.png") //enemigo
    }

    create() {
        //ejemplo cambio de escena:
        //this.scene.start("explorarMadrid", {name:"boss", atk: 65})
        //generamos las primeras cartas
        this.espadas;
        this.copas;
        this.bastos;
        this.oros;
        this.generateCards();

        // crear player y  enemigo
        this.player = new Player(this, 50, 500);
        this.enemy = new Enemy(this, 650, 100);

        // botones para ataques player
        let attackButton = this.add.rectangle(200, 350, 100, 50)
            .setInteractive()
            .on('pointerdown', () => this.playerTurn('attack'));

        let magicButton = this.add.rectangle(400, 350, 100, 50)
            .setInteractive()
            .on('pointerdown', () => this.playerTurn('magic'));

        // texto en los botones
        this.add.text(175, 335, 'normal');
        this.add.text(375, 335, 'magico');


        //texto de valores de las cartas:
        this.espadasText = this.add.text(200,535, 'espadas: ' + this.espadas);
        this.copasText = this.add.text(325,535, 'copas: ' + this.copas);
        this.bastosText = this.add.text(450,535, 'bastos: ' + this.bastos);
        this.orosText = this.add.text(575,535, 'oros: ' + this.oros);

        //texto para mostrar salud, mana y cualidades del player
        this.playerHealthText = this.add.text(50, 50, 'PlayerHP: ' + this.player.health);
        this.playerManaText = this.add.text(50,70, 'PlayerMana: ' + this.player.mana);

        this.playerHumildadText = this.add.text(50,100, 'Humildad: ' + this.player.humidad);
        this.playerTrabajoDuroText = this.add.text(50,120, 'Trabajo duro: ' + this.player.trabajoDuro);
        this.playerAgnosticismoText = this.add.text(50,140, 'Agnosticismo: ' + this.player.agnosticismo);
        this.playerAfectoText = this.add.text(50,160, 'Afecto: '+ this.player.afecto);
        //texto de la salud del enemigo 
        this.enemyHealthText = this.add.text(400, 50, 'Enemigo: ' +this.enemy.health);
    }

    // turno del jugador
    playerTurn(action) {

        if (this.turn === 'player') {
            
            //ataque normal
            if (action === 'attack') {
                var totalDamage = this.espadas + this.copas + this.bastos + this.oros;
                this.player.attackEnemy(this.enemy, totalDamage);
            } 
            
            //ataque con cualidades
            else if (action === 'magic') {
                this.changeTextsVisibility();

                
                


                //this.player.useMagic(this.enemy);
            }

            this.updateHealthTexts(); //actualiza la vida
            this.checkGameOver(); //comprueba si ha acabado el combate
            this.turn = 'enemy'; // Cambia el turno al enemigo
            this.enemyTurn();
        }
    }

    // Método de turno del enemigo
    enemyTurn() {

        if (this.turn === 'enemy') {
            
            this.enemy.attackPlayer(this.player); //ataca
            this.updateHealthTexts(); //cambia vida del player
            this.checkGameOver(); //comprueba si ha acabado el combate
            this.turn = 'player'; // Vuelve el turno al player
            this.generateCards(); //genera nuevas cartas
            this.updateCardsTexts(); // cambia valor de cartas
        }
    }

    //Genera nuevas cartas aleatorias
    generateCards() {
        this.espadas = Phaser.Math.Between(1, 12);
        this.copas = Phaser.Math.Between(1, 12);
        this.bastos = Phaser.Math.Between(1, 12);
        this.oros = Phaser.Math.Between(1, 12);

        //debug
        console.log('espadas: ' +this.espadas + ', copas: ' + this.copas + 
            ', bastos: ' + this.bastos + ', oros: ' + this.oros);

    }

    // Actualiza el texto de la salud de los personajes
    updateHealthTexts() {
        this.playerHealthText.setText('PlayerHP: ' +this.player.health);
        this.enemyHealthText.setText('Enemigo: ' + this.enemy.health);
    }

    //Actualiza el texto de las cartas
    updateCardsTexts(){
        this.espadasText.setText('espadas: ' + this.espadas);
        this.copasText.setText('copas: ' + this.copas);
        this.bastosText.setText('bastos: ' + this.bastos);
        this.orosText.setText('oros: ' + this.oros);
    }

    // Comprueba si alguno de los personajes ha perdido
    checkGameOver() {
        if (this.player.health <= 0) {
            //debug
            console.log('Player pierde');
            this.scene.start("lose");
        }
         else if (this.enemy.health <= 0) {
            //debug
            console.log('Enemy pierde');
            this.scene.start("victory");
        }
    }

    update() {
        
    }

    changeTextsVisibility(){
        this.espadasText.visible = !this.espadasText.visible;
        this.copasText.visible = ! this.copasText.visible;
        this.bastosText.visible = !this.bastosText.visible;
        this.orosText.visible = !this.orosText.visible;
    }
}
