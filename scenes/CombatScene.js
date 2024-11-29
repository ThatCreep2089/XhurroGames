import Player from '../src/Player.js';
import Enemy from '../src/Enemy.js';

export default class CombatScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CombatScene' });
        this.turn = 'player'; // Inicia el turno el player
        
        
    }

init(data){
    //this.data = data;
    console.log(data.player)
    console.log(data.inventory)
    this.playerConfig = data.player
    this.inventoryConfig = data.inventory
}

    preload() {
        //Cargar imágenes
        this.load.image('player', "./assets/npc/elle.png") //player
        this.load.image('enemy', "./assets/npc/yusoa.png") //enemigo
        this.load.image('combat', "./assets/fondos/combate.jpg") //fondo
    }

    create(data) {
        
        //Pintamos un fondo
        var back = this.add.image(0, 0, 'combat').setOrigin(0, 0);

        //escalar el fondo
        var scaleX = this.cameras.main.width / back.width;
        var scaleY = this.cameras.main.height / back.height;
        
        var scale = Math.min(scaleX, scaleY);
        
        back.setScale(scale);
        
        back.setPosition(
            this.cameras.main.width / 2 - back.displayWidth / 2,
            this.cameras.main.height / 2 - back.displayHeight / 2
        );
        
        
        //ejemplo cambio de escena:
        //this.scene.start("explorarMadrid", {name:"boss", atk: 65})
        //generamos las primeras cartas
        this.espadas;
        this.copas;
        this.bastos;
        this.oros;
        this.generateCards();

        // crear player y  enemigo
        this.player = new Player(this, this.sys.game.canvas.width / 11, this.sys.game.canvas.height / 1.7);
        this.player.init(this.playerConfig);
        //this.player.setScale(0.1);
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
            300, 100,
            0xff0000 
            )
            .setInteractive()
            .on('pointerdown', () => this.playerTurn('magic'));

        // texto en los botones
        this.add.text(
            this.sys.game.canvas.width / 1.95,
            this.sys.game.canvas.height / 2.1,
            'Normal', { 
            fontSize: '50px', 
            color: '#FFFFFF',       //Blanco
            fontFamily: 'Georgia',  
        });
        this.add.text(
            this.sys.game.canvas.width / 3.7,
            this.sys.game.canvas.height / 2.1,
            'Cualidades', { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });


        //texto de valores de las cartas:
        this.espadasText = this.add.text(
            this.sys.game.canvas.width / 5.5,
            this.sys.game.canvas.height / 1.7,
            'espadas: ', { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });
        
        

        this.copasText = this.add.text(
            this.sys.game.canvas.width / 2.9,
            this.sys.game.canvas.height / 1.7,
            'copas: ', { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });


        this.bastosText = this.add.text(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 1.7,
            'bastos: ', { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });


        this.orosText = this.add.text(
            this.sys.game.canvas.width / 1.5,
            this.sys.game.canvas.height / 1.7,
            'oros: ', { 
            fontSize: '50px', 
            color: '#FFFFFF',       // Blanco
            fontFamily: 'Georgia',  
        });

        // Rectángulos (cartas) debajo de cada texto (bajados):
        const offsetY = 160;  // Aumento en el valor Y para bajar los rectángulos

        // Rectángulo para 'espadas'
        this.espadasCard = this.add.rectangle(
            this.espadasText.x + this.espadasText.width / 2,  // Centrado con el texto
            this.espadasText.y + this.espadasText.height + offsetY, // Mover más abajo
            160, 240, // Ancho y alto del rectángulo más grandes
            0xFFFFFF // Color blanco
        );
        this.espadasCard.setOrigin(0.5); // Centrar el origen del rectángulo

        // Rectángulo para 'copas'
        this.copasCard = this.add.rectangle(
            this.copasText.x + this.copasText.width / 2,  // Centrado con el texto
            this.copasText.y + this.copasText.height + offsetY, // Mover más abajo
            160, 240,  // Ancho y alto del rectángulo más grandes
            0xFFFFFF // Color blanco
        );
        this.copasCard.setOrigin(0.5);

        // Rectángulo para 'bastos'
        this.bastosCard = this.add.rectangle(
            this.bastosText.x + this.bastosText.width / 2,  // Centrado con el texto
            this.bastosText.y + this.bastosText.height + offsetY, // Mover más abajo
            160, 240, // Ancho y alto del rectángulo más grandes
            0xFFFFFF // Color blanco
        );
        this.bastosCard.setOrigin(0.5);

        // Rectángulo para 'oros'
        this.orosCard = this.add.rectangle(
            this.orosText.x + this.orosText.width / 2,  // Centrado con el texto
            this.orosText.y + this.orosText.height + offsetY, // Mover más abajo
            160, 240, // Ancho y alto del rectángulo más grandes
            0xFFFFFF // Color blanco
        );
        this.orosCard.setOrigin(0.5);

        // Texto del número de 'espadas' centrado en el rectángulo de 'espadas'
        this.espadasNumber = this.add.text(
            this.espadasCard.x,  // Usamos la posición x del rectángulo
            this.espadasCard.y,  // Usamos la posición y del rectángulo
            this.espadas, { 
                fontSize: '100px', 
                color: '#000000',       // Negro
                fontFamily: 'Georgia',  
            }
        );
        this.espadasNumber.setOrigin(0.5);  // Centramos el texto en su posición

        // Repite lo mismo para los otros textos y rectángulos

        // Texto del número de 'copas' centrado en el rectángulo de 'copas'
        this.copasNumber = this.add.text(
            this.copasCard.x,  // Usamos la posición x del rectángulo
            this.copasCard.y,  // Usamos la posición y del rectángulo
            this.copas, { 
                fontSize: '100px', 
                color: '#000000',       // Negro
                fontFamily: 'Georgia',  
            }
        );
        this.copasNumber.setOrigin(0.5);  // Centramos el texto en su posición

        // Texto del número de 'bastos' centrado en el rectángulo de 'bastos'
        this.bastosNumber = this.add.text(
            this.bastosCard.x,  // Usamos la posición x del rectángulo
            this.bastosCard.y,  // Usamos la posición y del rectángulo
            this.bastos, { 
                fontSize: '100px', 
                color: '#000000',       // Negro
                fontFamily: 'Georgia',  
            }
        );
        this.bastosNumber.setOrigin(0.5);  // Centramos el texto en su posición

        // Texto del número de 'oros' centrado en el rectángulo de 'oros'
        this.orosNumber = this.add.text(
            this.orosCard.x,  // Usamos la posición x del rectángulo
            this.orosCard.y,  // Usamos la posición y del rectángulo
            this.oros, { 
                fontSize: '100px', 
                color: '#000000',       // Negro
                fontFamily: 'Georgia',  
            }
        );
        this.orosNumber.setOrigin(0.5);  // Centramos el texto en su posición



        

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


        //BACK BUTTON (VOLVER A ZONA SCENE)
        const backScene = this.add.image(
            this.sys.game.canvas.width / 12,
            this.sys.game.canvas.height / 1.2, 
            'flecha')
        .setScale(-0.3, 0.3)
        .setInteractive()
        .on('pointerdown', () => this.scene.start('zonaScene', { modo: data.modo}));




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
                //this.changeTextsVisibility();

                
                


                //this.player.useMagic(this.enemy);
            }

            this.updateHealthTexts(); //actualiza la vida
            const result = this.checkGameOver(); //comprueba si ha acabado el combate
            if(!result.end == true){
                this.turn = 'enemy'; // Cambia el turno al enemigo
                this.enemyTurn();
            } else if(result.playerwin == true){
                this.scene.start("victory", {player: this.player.getConfigData(), 
                                            inventory: this.Inventory.getConfigData()})
            } else {
                this.scene.start("lose", {player: this.player.getConfigData(), 
                    inventory: this.Inventory.getConfigData()})
            }
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
        this.espadasNumber.setText(this.espadas);
        this.copasNumber.setText(this.copas);
        this.bastosNumber.setText(this.bastos);
        this.orosNumber.setText(this.oros);
    }

    // Comprueba si alguno de los personajes ha perdido
    checkGameOver() {
       
        if (this.player.health <= 0) {
            //debug
            console.log('Player pierde');
            //this.scene.start("lose");
            return {"end": true, "playerwin": false}
        }
         else if (this.enemy.health <= 0) {
            //debug
            console.log('Enemy pierde');
           //this.scene.start("victory");
           return {"end": true, "playerwin": true}
        }
        return {"end": false, "playerwin": false}
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
