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
        this.load.image("elle", "./assets/npc/elle.png") //player
        this.load.image("enemy", "./assets/npc/yusoa.png") //enemigo
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
        this.enemy = new Enemy(this, this.sys.game.canvas.width / 1.2, this.sys.game.canvas.height / 3.5);
        this.enemy.setScale(1);


        //anulamos movimiento player
        this.player.changeMove(false);

        // botones para ataques player
        let attackButton = this.add.rectangle(
            this.sys.game.canvas.width / 1.8,
            this.sys.game.canvas.height / 2,
            200, 100,
            0xff0000
            )
            .setInteractive()
            .on('pointerdown', () => this.playerTurn('attack'));

        let magicButton = this.add.rectangle(
            this.sys.game.canvas.width / 3,
            this.sys.game.canvas.height / 2,
            200, 100,
            0xff0000 
            )
            .setInteractive()
            .on('pointerdown', () => this.playerTurn('magic'));

        // texto en los botones
        this.add.text(
            this.sys.game.canvas.width / 1.95,
            this.sys.game.canvas.height / 2.1,
            'normal', { 
            fontSize: '50px', 
            color: '#FFFFFF',       //Blanco
            fontFamily: 'Georgia',  
        });
        this.add.text(
            this.sys.game.canvas.width / 3.4,
            this.sys.game.canvas.height / 2.1,
            'magico', { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });


        //texto de valores de las cartas:
        this.espadasText = this.add.text(
            this.sys.game.canvas.width / 5.5,
            this.sys.game.canvas.height / 1.3,
            'espadas: ' + this.espadas, { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });
        this.copasText = this.add.text(
            this.sys.game.canvas.width / 2.9,
            this.sys.game.canvas.height / 1.3,
            'copas: ' + this.copas, { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });
        this.bastosText = this.add.text(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 1.3,
            'bastos: ' + this.bastos, { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });
        this.orosText = this.add.text(
            this.sys.game.canvas.width / 1.5,
            this.sys.game.canvas.height / 1.3,
            'oros: ' + this.oros, { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });

        //texto para mostrar salud, mana y cualidades del player
        this.playerHealthText = this.add.text(50, 50, 'PlayerHP: ' + this.player.health, { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });
        this.playerManaText = this.add.text(
            this.sys.game.canvas.width / 40,
            this.sys.game.canvas.height / 10,
             'PlayerMana: ' + this.player.mana, { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });

        this.playerHumildadText = this.add.text(
            this.sys.game.canvas.width / 40,
            this.sys.game.canvas.height / 6.5,
            'Humildad: ' + this.player.humidad, { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });
        this.playerTrabajoDuroText = this.add.text(
            this.sys.game.canvas.width / 40,
            this.sys.game.canvas.height / 4.8,
            'Trabajo duro: ' + this.player.trabajoDuro, { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });
        this.playerAgnosticismoText = this.add.text(
            this.sys.game.canvas.width / 40,
            this.sys.game.canvas.height / 3.9,
            'Agnosticismo: ' + this.player.agnosticismo, { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });
        this.playerAfectoText = this.add.text(
            this.sys.game.canvas.width / 40,
            this.sys.game.canvas.height / 3.2,
            'Afecto: '+ this.player.afecto, { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });
        //texto de la salud del enemigo 
        this.enemyHealthText = this.add.text(
            this.sys.game.canvas.width / 1.8,
            this.sys.game.canvas.height / 8,
            'Enemigo: ' + this.enemy.health, { 
                fontSize: '50px', 
                color: '#FFFFFF',       // Blanco
                fontFamily: 'Georgia',  
            });
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
