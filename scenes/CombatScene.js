import Player from '../src/Player.js';
import Enemy from '../src/Enemy.js';
import Inventory from '../src/inventory.js';

export default class CombatScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CombatScene' });
        this.turn = 'player'; // Inicia el turno el player
        this.totalDamage = 0;
        this.usingMana = false;
        this.active = true;
    }

init(data){
      //recibimos info que nos pasan
    this.ant = data.ant;
    this.playerConfig = data.player;
    this.inventoryConfig = data.inventory;
    this.npc = data.npc;
    this.fondo = data.fondo;
    this.dialogueJson = data.dialogueJson;

}

    create() {
        
        //añadimos la música del combate
        if (!this.sound.get('combatMusic')) {
            const music = this.sound.add('combatMusic', { volume: 0.5, loop: true });
            music.play();
        }

        //nos aseguramos de inicializar bien todo
        this.turn = 'player'; // Inicia el turno el player
        this.totalDamage = 0;
        this.usingMana = false;
        this.active = true;


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
        
        
        //generamos las primeras cartas
        this.espadas;
        this.copas;
        this.bastos;
        this.oros;
        this.generateCards();


        // crear player, inventario y enemigo
       this.setEntities(); 
       this.createAttackButtons();
       this.createStadisticsButtons();
       this.createOtherText();

       //eventos de turnos
        this.events.on('changeTurns', ()=>this.changeTurns());
        this.events.on('enemyDamaged', ()=>this.enemyDamageAnim());
        this.events.on('playerDamaged', ()=>this.playerDamageAnim());
        this.events.on('updateStatus', ()=>this.updateCombatStatus());

    }


    enemyDamageAnim(){
        //desactiva botones
        //console.log("cambio botones a false");
        this.changeActiveButtons();
        //pone al enemigo en rojo
        this.enemy.setTint(0xff0000);
        this.time.delayedCall(3000, () => {
            this.enemy.clearTint();});
        //hace el daño al enemigo y actualiza daño total a 0
        this.enemy.takeDamage(this.totalDamage);
        this.totalDamage = 0;
        this.time.delayedCall(3000, () => {
            this.events.emit('updateStatus');});
    }

    playerDamageAnim(){
        this.player.setTint(0xff0000);//coloreamos al player
        this.time.delayedCall(3000, () => {
            this.player.clearTint();});

        //hace daño al player
        this.enemy.attackPlayer(this.player);

        //caundo termine actualizamos
        this.time.delayedCall(3000, () => {
            this.events.emit('updateStatus');});
   }
 

changeTurns() {
    if (this.turn === 'player') {
        this.turn = 'enemy'; // Cambia el turno al enemigo
        this.enemyTurn();
    } else {
        this.turn = 'player'; // Cambia el turno al player
        this.generateCards();
        this.updateCardsTexts();
        this.changeActiveButtons();
        this.updateTotalText();
    }
}

   updateCombatStatus(){

        //actualiza la vida
        this.updateHealthTexts(); 

        //comprueba si ha acabado el combate
        var result = this.checkGameOver(); 
        //si no, turno del enemigo
        if(!result.end == true){
            this.time.delayedCall(2000, ()=> {this.events.emit('changeTurns');});
        } 
        //si ha acabado, escena de victoria o derrota
        else if(result.playerwin == true){
            this.events.removeListener('changeTurns');
            this.events.removeListener('enemyDamaged');
            this.events.removeListener('playerDamaged');
            this.events.removeListener('updateStatus');
            this.changeActiveButtons();
            this.scene.start("endCombatScene", {ant: this.ant, player: this.player.getConfigData(), 
                inventory: this.inventory.getConfigData(),
                npc: this.npc,
                fondo: this.fondo,
                dialogueJson: this.dialogueJson,
                battleResult: true})
     
        } else {
            //console.log("derrota")
            //quitamos listeners
            this.events.removeListener('changeTurns');
            this.events.removeListener('enemyDamaged');
            this.events.removeListener('playerDamaged');
            this.events.removeListener('updateStatus');
            this.changeActiveButtons();
            this.scene.start("endCombatScene", {ant: this.ant, player: this.player.getConfigData(), 
                inventory: this.inventory.getConfigData(),
                npc: this.npc,
                fondo: this.fondo,
                dialogueJson: this.dialogueJson,
                battleResult: false})
              
        }
   }



 playerMakesDamage(){ 
    if (this.usingMana == true) {

        //restamos mana
        if(this.player.mana >=20) {
        this.player.manaPerdido(20);
       // console.log("llamo enemydamaged desde mana");
        this.events.emit('enemyDamaged');
        }
        else  {
            //console.log("no hay mana");
        }
    }
    else {
        //console.log("llamo enemydamaged desde normal");
        this.events.emit('enemyDamaged');
    }
    
 }


    // turno del jugador
    playerTurn(action) {

        if (this.turn === 'player') {
            
            //ataque normal
            if (action === 'attack') {
                //this.player.attackEnemy(this.enemy, 
                //this.espadas, this.copas, this.bastos,this.oros);
                if(this.totalDamage === 0) {
                
                //si el enemigo es debil a cirto palo el ataque del player es mayor
                if(this.enemy.weakness === 'espadas') {
                    this.espadas *= 2;
                }
                else if(this.enemy.weakness === 'copas'){
                    this.copas *= 2;
                }
                else if(this.enemy.weakness === 'bastos'){
                    this.bastos *= 2;
                }
                else if(this.enemy.weakness === 'oros') {
                    this.oros *= 2;
                }    
            }        
                this.totalDamage = 0;  

                this.totalDamage = this.espadas + this.copas + this.bastos + this.oros;
                //console.log("totaldamage: " + this.totalDamage);
                this.updateTotalText();

                this.usingMana = false;

            } 
            
        }
    }

    cualidades(cualidad) {
        this.totalDamage = 0;
        switch(cualidad){

            //calculamos el daño que hacemos segun el tipo de cualidad
            case 'humildad':
                var lvl = this.player.getCualidad('humildad');

                this.totalDamage = this.oros * 2 * lvl 
                // + this.espadas
                + this.bastos * 1.25 * lvl
                + this.copas;
            
                this.updateTotalText();
                this.usingMana = true;
                break;

            case 'trabajo duro':
                var lvl = this.player.getCualidad('trabajo duro');
                
                this.totalDamage = this.oros * 1.25 * lvl
                + this.espadas
                + this.bastos * 2 * lvl 
                //+ this.copas;
                    
                this.updateTotalText();

                this.usingMana = true;

                break;

            case 'agnosticismo':
                var lvl = this.player.getCualidad('agnosticismo');
                
                this.totalDamage = this.oros
                + this.espadas * 1.25 * lvl
                //+ this.bastos 
                + this.copas * 2 * lvl;
                    
                this.updateTotalText(); 

                this.usingMana = true;

                break;

            case 'afecto':
                var lvl = this.player.getCualidad('afecto');
                
                this.totalDamage =
                // this.oros +
                this.espadas * 2 * lvl
                + this.bastos 
                + this.copas * 1.25 * lvl;

                this.updateTotalText();

                this.usingMana = true;
 
                break;
            default: 
                //console.log("algo está fallando");
        }
    }



    // Método de turno del enemigo
    enemyTurn() {

        this.events.emit('playerDamaged');
                        
    }

    //Genera nuevas cartas aleatorias
    generateCards() {
        this.espadas = Phaser.Math.Between(1, 12);
        this.copas = Phaser.Math.Between(1, 12);
        this.bastos = Phaser.Math.Between(1, 12);
        this.oros = Phaser.Math.Between(1, 12);

        //debug
        //console.log('espadas: ' +this.espadas + ', copas: ' + this.copas + 
        //    ', bastos: ' + this.bastos + ', oros: ' + this.oros);

    }

    // Actualiza el texto de la salud de los personajes
    updateHealthTexts() {
        this.playerHealthText.setText('PlayerHP: ' +this.player.health);
        this.enemyHealthText.setText('Enemigo: ' + this.enemy.health);
        this.playerManaText.setText('PlayerMana: ' + this.player.mana);
    }

    //Actualiza el texto de las cartas
    updateCardsTexts(){
        this.espadasNumber.setText(this.espadas);
        this.copasNumber.setText(this.copas);
        this.bastosNumber.setText(this.bastos);
        this.orosNumber.setText(this.oros);
    }

    updateTotalText(){
        this.totalDamageNumber.setText(this.totalDamage);
    }

    // Comprueba si alguno de los personajes ha perdido
    checkGameOver() {
       
        if (this.player.health <= 0) {
            //debug
           // console.log('Player pierde');
            //this.scene.start("lose");
            return {"end": true, "playerwin": false}
        }
         else if (this.enemy.health <= 0) {
            //debug
            //console.log('Enemy pierde');
           //this.scene.start("victory");
           return {"end": true, "playerwin": true}
        }
        return {"end": false, "playerwin": false}
    }

    
    changeCualidadesVisibility(){
        //para hacer bonito el combate 
    }

    changeActiveButtons(){

        this.active = !this.active;
        //console.log(this.active);

        if(this.active == true){
                this.attackButton.setInteractive();
                this.magicButton.setInteractive();
                this.totalDamageButton.setInteractive();
                this.playerHumildadButton.setInteractive();
                this.playerTrabajoDuroButton.setInteractive();
                this.playerAgnosticismoButton.setInteractive();
                this.playerAfectoButton.setInteractive();
            }
        else {
                this.attackButton.disableInteractive();
                this.magicButton.disableInteractive();
                this.totalDamageButton.disableInteractive();
                this.playerHumildadButton.disableInteractive();
                this.playerTrabajoDuroButton.disableInteractive();
                this.playerAgnosticismoButton.disableInteractive();
                this.playerAfectoButton.disableInteractive();
            }   
        }

    

    createText(x, y, message, fontSize = '50px', color = '#FFFFFF', fontFamily = 'Georgia') {
        return this.add.text(x, y, message, {
            fontSize: fontSize,
            color: color,
            fontFamily: fontFamily
        });
    }

    createButton(x, y, width, height, color, callback) {
        return this.add.rectangle(x, y, width, height, color)
            .setInteractive()
            .on('pointerdown', callback);
    }

    setEntities(){
        //player
        this.player = new Player(this, this.sys.game.canvas.width / 20, this.sys.game.canvas.height / 1.01, 'playerCombat').setOrigin(0.5);;
        this.player.init(this.playerConfig);
        this.player.setScale(0.7);
        //enemigo
        this.enemy = new Enemy(this, this.sys.game.canvas.width / 1.2, this.sys.game.canvas.height / 3.5, this.npc);
        this.enemy.setScale(0.7);

        //inventario
        this.inventory = new Inventory(this)
        this.inventory.init(this.inventoryConfig)


        //anulamos movimiento player
        this.player.changeMove(false);
        //this.player.visible = false;
    }


    createAttackButtons(){
        //ataque normal
        this.attackButton = this.createButton(
            this.sys.game.canvas.width / 1.8,
            this.sys.game.canvas.height / 2,
            200, 100,
            0xff0000,
            () => this.playerTurn('attack')
     );
        
        this.attackNormalText = this.createText(
            this.sys.game.canvas.width / 1.95,
            this.sys.game.canvas.height / 2.1,
            'Normal'
           );


        //ataque cualidades
        this.magicButton = this.createButton(
            this.sys.game.canvas.width / 3,
            this.sys.game.canvas.height / 2,
            300, 100,
            0xff0000,
            () => this.playerTurn('magic')
      );
        
        this.attackCualidadesText = this.createText(
            this.sys.game.canvas.width / 3.7,
            this.sys.game.canvas.height / 2.1,
            'Cualidades'
        );

        //suma daño total
        this.totalDamageButton = this.createButton(
            this.sys.game.canvas.width / 1.15,
            this.sys.game.canvas.height / 1.3,
            300, 300,
            0xff0000,
            () => this.playerMakesDamage(this.totalDamage)
      );
   
        this.totalDamageText = this.createText(
            this.sys.game.canvas.width / 1.2,
            this.sys.game.canvas.height / 1.8,
            'Total'  
        );
       
        this.totalDamageNumber = this.createText(
            this.sys.game.canvas.width / 1.15,
            this.sys.game.canvas.height / 1.3,
            '0'
        );
        this.totalDamageNumber.setOrigin(0.5);
    }


createStadisticsButtons() {

    //botón humildad
    this.playerHumildadText = this.createText(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 4.8,
        'Humildad: ' + this.player.humildad
    );

    this.playerHumildadButton = this.createButton(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 4.8,
        this.playerHumildadText.width,     
        this.playerHumildadText.height,    
        0x000000,                          
        () => this.cualidades('humildad')
    ).setOrigin(0, 0)
     .setAlpha(0.5);  

    
    // botón trabajo duro
    this.playerTrabajoDuroText = this.createText(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 3.9,
        'Trabajo duro: ' + this.player.trabajoDuro
    );

    this.playerTrabajoDuroButton = this.createButton(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 3.9,
        this.playerTrabajoDuroText.width,     
        this.playerTrabajoDuroText.height,    
        0x000000,                          
        () => this.cualidades('trabajo duro')
    ).setOrigin(0, 0)
     .setAlpha(0.5);

     //botón agnosticismo
    this.playerAgnosticismoText = this.createText(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 3.2,
        'Agnosticismo: ' + this.player.agnosticismo
    );

    this.playerAgnosticismoButton = this.createButton(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 3.2,
        this.playerAgnosticismoText.width,     
        this.playerAgnosticismoText.height,    
        0x000000,                          
        () => this.cualidades('agnosticismo')
    ).setOrigin(0, 0)
     .setAlpha(0.5);

    //botón afecto
    this.playerAfectoText = this.createText(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 2.7,
        'Afecto: '+ this.player.afecto
    );

    this.playerAfectoButton = this.createButton(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 2.7,
        this.playerAfectoText.width,     
        this.playerAfectoText.height,    
        0x000000,                          
        () => this.cualidades('afecto')
    ).setOrigin(0, 0)
     .setAlpha(0.5);    

    

}



    createOtherText() {

                
        //texto de la salud del player
        this.playerHealthText = this.createText(
            this.sys.game.canvas.width / 40,
            this.sys.game.canvas.height / 20,
            'PlayerHP: ' + this.player.health
        );

        //texto del maná del player
        this.playerManaText = this.createText(
            this.sys.game.canvas.width / 40,
            this.sys.game.canvas.height / 10,
            'PlayerMana: ' + this.player.mana
        );

        //texto de la salud del enemigo 
        this.enemyHealthText = this.createText(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 8,
            'Enemigo: ' + this.enemy.health,  
            );


        //texto de valores de las cartas:
        this.espadasText = this.createText(
            this.sys.game.canvas.width / 5.5,
            this.sys.game.canvas.height / 1.7,
            'espadas: '
        );
        
        

        this.copasText = this.createText(
            this.sys.game.canvas.width / 2.9,
            this.sys.game.canvas.height / 1.7,
            'copas: '
        );


        this.bastosText = this.createText(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 1.7,
            'bastos: '  
        );


        this.orosText = this.createText(
            this.sys.game.canvas.width / 1.5,
            this.sys.game.canvas.height / 1.7,
            'oros: '
        );

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
        this.espadasNumber = this.createText(
            this.espadasCard.x,  // Usamos la posición x del rectángulo
            this.espadasCard.y,  // Usamos la posición y del rectángulo
            this.espadas,
            '100px', 
            '#000000',       // Negro  
            
        ).setOrigin(0.5);  // Centramos el texto en su posición

        // Repite lo mismo para los otros textos y rectángulos

        // Texto del número de 'copas' centrado en el rectángulo de 'copas'
        this.copasNumber = this.createText(
            this.copasCard.x,  // Usamos la posición x del rectángulo
            this.copasCard.y,  // Usamos la posición y del rectángulo
            this.copas,  
            '100px', 
            '#000000',       // Negro    
        
        ).setOrigin(0.5);  // Centramos el texto en su posición

        // Texto del número de 'bastos' centrado en el rectángulo de 'bastos'
        this.bastosNumber = this.createText(
            this.bastosCard.x,  // Usamos la posición x del rectángulo
            this.bastosCard.y,  // Usamos la posición y del rectángulo
            this.bastos, 
            '100px', 
            '#000000',       // Negro
                 
        ).setOrigin(0.5);  // Centramos el texto en su posición

        // Texto del número de 'oros' centrado en el rectángulo de 'oros'
        this.orosNumber = this.createText(
            this.orosCard.x,  // Usamos la posición x del rectángulo
            this.orosCard.y,  // Usamos la posición y del rectángulo
            this.oros,  
            '100px', 
            '#000000',       // Negro
                
        ).setOrigin(0.5);  // Centramos el texto en su posición



       /* let inventarioButton = this.add.rectangle(
            this.sys.game.canvas.width / 14,
            this.sys.game.canvas.height / 1.5, 
            50, 50, 0xffe800)
        .setInteractive()
        .setScale(4, 2)
        .on('pointerdown', () => {
            console.log("Valor de this.key:", this.key); // Aquí verificamos el valor de this.key
            this.scene.start('InventoryScene', {
                lastScene: this.key, // Este es el valor que debería contener "zonaScene"
                player: this.player.getConfigData(),
                inventory: this.inventory.getConfigData(),
                //modo: this.modo,
                dialogueJson: this.dialogueJson
            });
        });
*/
    }
}
