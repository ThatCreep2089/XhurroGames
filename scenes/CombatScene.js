import Player from '../src/Player.js';
import Enemy from '../src/Enemy.js';
import Inventory from '../src/inventory.js';

/**
 * Escena que maneja el combate entre el jugador y un enemigo.
 * Este combate fuciona por eventos, en los cuales se gestiona el tiempo que hay entre un ataque y otro.
 * Al acabar el combate se llama a la escena de victoria o derrota y se borran los listeners de eventos propios para evitar errores.
 * En el caso del jugador, tiene 2 acciones posibles: ataque normal y ataque especial. 
 * El ataque normal se basa en la suma de los valores de las cartas.
 * El ataque especial utiliza sus cualidades para dar bonus a los palos concretos, pero consume maná.
 * El enemigo te hace un daño random generado en su turno.
 */

export default class CombatScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CombatScene' });

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
        this.turn = 'player'; 
        this.totalDamage = 0;
        this.usingMana = false;
        this.active = true;


        //Pintamos un fondo
        var back = this.add.image(0, 0, 'fondoCombate').setOrigin(0, 0);

        //escalar el fondo
        var scaleX = this.cameras.main.width / back.width;
        var scaleY = this.cameras.main.height / back.height;
        
        var scale = Math.min(scaleX, scaleY);
        
        back.setScale(scale);
        
        back.setPosition(
            this.cameras.main.width / 2 - back.displayWidth / 2,
            this.cameras.main.height / 2 - back.displayHeight / 2
        );
        
        this.infoButton = this.createButton(this.sys.game.canvas.width / 50,
            this.sys.game.canvas.height / 1.7,
            'infoButton',
            2,
            () => this.mostrarInfo() 
        );

        //generamos las primeras cartas
        this.espadas;
        this.copas;
        this.bastos;
        this.oros;
        this.generateCards();


        // crear player, inventario y enemigo
       this.setEntities(); 
       //creamos botones y textos en la escena
       this.createAttackButtons();
       this.createStadisticsText();
       this.createOtherText();

       //eventos de turnos
        this.events.on('changeTurns', ()=>this.changeTurns());

        this.events.on('playerAttack', ()=>this.playerAttackAnim());

        this.events.on('enemyDamaged', ()=>this.enemyDamageAnim());

        this.events.on('enemyAttack', ()=>this.enemyAttackAnim());

        this.events.on('playerDamaged', ()=>this.playerDamageAnim());

        this.events.on('updateStatus', ()=>this.updateCombatStatus());

    }

    playerAttackAnim(){
        this.changeActiveButtons();
        this.staticAnim.pause();
        this.tweens.add({
            targets: [this.playerSprite],
            x: '+=50',
            y: '-=50', 
            duration: 1000, 
            ease: 'Power2',
            yoyo: true, 
            onComplete: () => {
                
                this.events.emit('enemyDamaged');
            }
        });
    }

    enemyAttackAnim(){
        this.tweens.add({
            targets: [this.enemy],
            x: '-=50',
            y: '+=50', 
            duration: 1000, 
            ease: 'Power2',
            yoyo: true, 
            onComplete: () => {
                
                this.events.emit('playerDamaged');
            }
        });
    }


    //secuencia al dañar un enemigo
    enemyDamageAnim(){
        //desactiva botones
        //console.log("cambio botones a false");
        
        //pone al enemigo en rojo
        this.enemy.setTint(0xff0000);


        this.tweens.add({
            targets: [this.enemy],
            scaleX: 0.5,
            scaleY: 0.5, 
            duration: 1500, 
            ease: 'Power2',
            yoyo: true,
            onComplete: () => {
                this.enemy.clearTint();
            }
        });
        //hace el daño al enemigo y actualiza daño total a 0
        this.player.attackEnemy(this.enemy, this.totalDamage);
        this.totalDamage = 0;
        this.time.delayedCall(3000, () => {
            this.events.emit('updateStatus');});
    }

    //secuencia al dañar al player
    playerDamageAnim(){
        this.playerSprite.setTint(0xff0000);//coloreamos al player
       
        this.tweens.add({
            targets: [this.playerSprite],
            scaleX: 0.25,
            scaleY: 0.25, 
            duration: 1500, 
            ease: 'Power2',
            yoyo: true,
            onComplete: () => {
                this.playerSprite.clearTint();
            }
        });

        //hace daño al player
        this.enemy.attackPlayer(this.player);

        //caundo termine actualizamos
        this.time.delayedCall(3000, () => {
            this.events.emit('updateStatus');});
   }
 
//gestión del cambio de turnos
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
        this.staticAnim.resume();
    }
}

//actualiza el combate
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
            this.events.removeListener('playerAttack');
            this.events.removeListener('enemyDamaged');
            this.events.removeListener('enemyAttack');
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
            this.events.removeListener('playerAttack');
            this.events.removeListener('enemyDamaged');
            this.events.removeListener('enemyAttack');
            this.events.removeListener('playerDamaged');
            this.events.removeListener('updateStatus');
            this.changeActiveButtons();

            this.player.health = 1;

            this.scene.start("endCombatScene", {ant: this.ant, player: this.player.getConfigData(), 
                inventory: this.inventory.getConfigData(),
                npc: this.npc,
                fondo: this.fondo,
                dialogueJson: this.dialogueJson,
                battleResult: false})
              
        }
   }


    //player hace daño
    playerMakesDamage(){ 
        if (this.usingMana == true) {

            //restamos mana
            if(this.player.mana >=20) {
            this.player.manaPerdido(20);
        // console.log("llamo enemydamaged desde mana");
        
            this.events.emit('playerAttack');
            }
            else  {
                this.mostrarPestana();
                //console.log("no hay mana");
            }
        }
        else {
            //console.log("llamo enemydamaged desde normal");
            
            this.events.emit('playerAttack');
        }
        
    }


    //ataque normal
    playerTurn() {

        if (this.turn === 'player') {
            
            //ataque normal

            //control para evitar multiplicar infinitamente el daño
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
            //sumamos el daño total y lo mostramos
            this.totalDamage = this.espadas + this.copas + this.bastos + this.oros;
            //console.log("totaldamage: " + this.totalDamage);
            this.updateTotalText();

            this.usingMana = false;
     
        }
    }

    //ataque con cualidades
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

        this.events.emit('enemyAttack');
                        
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

    //Actualiza el texto del daño total
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


    changeActiveButtons(){

        this.active = !this.active;
        //console.log(this.active);

        if(this.active == true){
                this.attackButton.setInteractive();
                this.totalDamageButton.setInteractive();
                this.playerHumildadButton.setInteractive();
                this.playerTrabajoDuroButton.setInteractive();
                this.playerAgnosticismoButton.setInteractive();
                this.playerAfectoButton.setInteractive();
                this.infoButton.setInteractive();
            }
        else {
                this.attackButton.disableInteractive();
                this.totalDamageButton.disableInteractive();
                this.playerHumildadButton.disableInteractive();
                this.playerTrabajoDuroButton.disableInteractive();
                this.playerAgnosticismoButton.disableInteractive();
                this.playerAfectoButton.disableInteractive();
                this.infoButton.disableInteractive();
            }   
        }

    

    createText(x, y, message, fontSize = '50px', color = '#FFFFFF', fontFamily = 'Georgia') {
        return this.add.text(x, y, message, {
            fontSize: fontSize,
            color: color,
            fontFamily: fontFamily
        });
    }


    createButton(x, y, sprite, scale, callback) {
        return this.add.image(x, y, sprite).setScale(scale)
            .setInteractive().on('pointerdown', callback);
    }

    setEntities(){
        //player
        this.player = new Player(this,0,0);
        this.player.init(this.playerConfig);

        //enemigo
        this.enemy = new Enemy(this, this.sys.game.canvas.width / 1.2, this.sys.game.canvas.height / 3.5, this.npc);
        this.enemy.setScale(0.7);

        //inventario
        this.inventory = new Inventory(this)
        this.inventory.init(this.inventoryConfig)


        //anulamos movimiento player
        this.player.changeMove(false);
        this.player.visible = false;

        this.playerSprite = this.add.sprite(this.sys.game.canvas.width / 9, this.sys.game.canvas.height / 1.3,
        'playerCombat').setOrigin(0.5).setScale(0.3);



        //animaciones
        //movimiento estático
        this.staticAnim = this.tweens.add({
            targets: [ this.playerSprite, this.enemy],
            x: '+=5',
            duration: 300,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            delay: 0
        });

    }


    createAttackButtons(){
        //ataque normal        
        this.attackButton = this.createButton(
            this.sys.game.canvas.width / 1.8,
            this.sys.game.canvas.height / 1.5,
            'cartaNormal',
            0.7,
            () => this.playerTurn()
        );



        this.attackNormalText = this.createText(
            this.sys.game.canvas.width / 1.95,
            this.sys.game.canvas.height / 1.56,
            'Normal',
            '50px',
            '#000000'
           ).setDepth(1);


        //ataque humildad
        this.playerHumildadButton = this.createButton(
            this.sys.game.canvas.width / 3.5,
            this.sys.game.canvas.height / 2 + 100,
           'cartaHumildad',
            0.7,                          
            () => this.cualidades('humildad')
        ).setOrigin(0, 0); 

        this.attackHumildadText = this.createText(
            this.sys.game.canvas.width / 3.30,
            this.sys.game.canvas.height / 2 + 115,
            'Humildad',
            '50px',
            '#000000'
           ).setDepth(1);

        //ataque trabajo duro
        this.playerTrabajoDuroButton = this.createButton(
            this.sys.game.canvas.width / 3.5,
            this.sys.game.canvas.height / 2 + 200,
            'cartaTrabajoDuro',
            0.7,                          
            () => this.cualidades('trabajo duro')
        ).setOrigin(0, 0);


        this.attackTrabajoDuroText = this.createText(
            this.sys.game.canvas.width / 3.45,
            this.sys.game.canvas.height / 2 + 215,
            'Trabajo Duro',
            '50px',
            '#000000'
           ).setDepth(1);

        //ataque agnosticismo
        this.playerAgnosticismoButton = this.createButton(
            this.sys.game.canvas.width / 3.5,
            this.sys.game.canvas.height / 2 + 300,
            'cartaAgnosticismo',
            0.7,                          
            () => this.cualidades('agnosticismo')
        ).setOrigin(0, 0);


        this.attackAgnosticismoText = this.createText(
            this.sys.game.canvas.width / 3.45,
            this.sys.game.canvas.height / 2 + 315,
            'Agnosticismo',
            '50px',
            '#000000'
           ).setDepth(1);

        //ataque afecto
        this.playerAfectoButton = this.createButton(
            this.sys.game.canvas.width / 3.5,
            this.sys.game.canvas.height / 2 + 400,
            'cartaAfecto',
            0.7,                         
            () => this.cualidades('afecto')
        ).setOrigin(0, 0);  

        this.attackAfectoText = this.createText(
            this.sys.game.canvas.width / 3.35,
            this.sys.game.canvas.height / 2 + 415,
            'Afecto',
            '50px',
            '#000000'
           ).setDepth(1);

        //suma daño total

        this.totalDamageButton = this.createButton(
            this.sys.game.canvas.width / 1.15,
            this.sys.game.canvas.height / 1.3,
            'botonDamageTotal',
            0.5,
            () => this.playerMakesDamage(this.totalDamage)
      );
      
   
        this.totalDamageText = this.createText(
            this.sys.game.canvas.width / 1.2,
            this.sys.game.canvas.height / 1.55,
            'Total'  
        );
       
        this.totalDamageNumber = this.createText(
            this.sys.game.canvas.width / 1.15,
            this.sys.game.canvas.height / 1.3,
            '0'
        );
        this.totalDamageNumber.setOrigin(0.5);
    }


createStadisticsText() {

    //humildad
    this.playerHumildadText = this.createText(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 4.8,
        'Humildad: ' + this.player.humildad,
        '50px',
        '#000000'
    );


    //trabajo duro
    this.playerTrabajoDuroText = this.createText(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 3.9,
        'Trabajo duro: ' + this.player.trabajoDuro,
        '50px',
        '#000000'
    );

   

     // agnosticismo
    this.playerAgnosticismoText = this.createText(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 3.2,
        'Agnosticismo: ' + this.player.agnosticismo,
        '50px',
        '#000000'
    );

    

    //afecto
    this.playerAfectoText = this.createText(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 2.7,
        'Afecto: '+ this.player.afecto,
        '50px',
        '#000000'    
    );

    //texto de la salud del player
    this.playerHealthText = this.createText(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 20,
        'PlayerHP: ' + this.player.health,
        '50px',
        '#000000'
    );

    //texto del maná del player
    this.playerManaText = this.createText(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 10,
        'PlayerMana: ' + this.player.mana,
        '50px',
        '#000000'
    );

    //texto de la ansiedad del player
    this.playerAnxietyText = this.createText(
        this.sys.game.canvas.width / 40,
        this.sys.game.canvas.height / 6.75,
        'Ansiedad: ' + this.player.ansiedad,
        '50px',
        '#000000'
    );

    //texto de la salud del enemigo 
    this.enemyHealthText = this.createText(
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 8,
        'Enemigo: ' + this.enemy.health,
        '50px',
        '#000000'
        );    



}



    createOtherText() {


  
        // Rectángulos (cartas) debajo de cada texto (bajados):
        const offsetY = 350;  // Aumento en el valor Y para bajar los rectángulos
        // Rectángulo para 'espadas'
        this.espadasCard = this.add.image(
            this.sys.game.canvas.width / 2 + 100,  
            this.sys.game.canvas.height / 1.7 + offsetY, // Mover más abajo
            'cartaNavajas'
        ).setScale(0.4);
        this.espadasCard.setOrigin(0.5); // Centrar el origen del rectángulo

        // Rectángulo para 'copas'
        this.copasCard = this.add.image(
            this.sys.game.canvas.width / 2 + 200,  
            this.sys.game.canvas.height / 1.7 + offsetY, // Mover más abajo
            `cartaBotellin`
        ).setScale(0.4);
        this.copasCard.setOrigin(0.5);

        // Rectángulo para 'bastos'
        this.bastosCard = this.add.image(
            this.sys.game.canvas.width / 2 + 300,  
            this.sys.game.canvas.height / 1.7 + offsetY, // Mover más abajo
            'cartaPorras'
        ).setScale(0.4);
        this.bastosCard.setOrigin(0.5);

        // Rectángulo para 'oros'
        this.orosCard = this.add.image(
            this.sys.game.canvas.width / 2 + 400, 
            this.sys.game.canvas.height / 1.7 + offsetY, // Mover más abajo
            'cartaCalderilla'
        ).setScale(0.4);
        this.orosCard.setOrigin(0.5);

        
        // Texto del número de 'espadas' centrado en el rectángulo de 'espadas'
        this.espadasNumber = this.createText(
            this.espadasCard.x,  // Usamos la posición x del rectángulo
            this.espadasCard.y,  // Usamos la posición y del rectángulo
            this.espadas,
            '40px', 
            '#000000',       // Negro  
            
        ).setOrigin(0.5);  // Centramos el texto en su posición


        // Texto del número de 'copas' centrado en el rectángulo de 'copas'
        this.copasNumber = this.createText(
            this.copasCard.x,  // Usamos la posición x del rectángulo
            this.copasCard.y,  // Usamos la posición y del rectángulo
            this.copas,  
            '40px', 
            '#000000',       // Negro    
        
        ).setOrigin(0.5);  // Centramos el texto en su posición

        // Texto del número de 'bastos' centrado en el rectángulo de 'bastos'
        this.bastosNumber = this.createText(
            this.bastosCard.x,  // Usamos la posición x del rectángulo
            this.bastosCard.y,  // Usamos la posición y del rectángulo
            this.bastos, 
            '40px', 
            '#000000',       // Negro
                 
        ).setOrigin(0.5);  // Centramos el texto en su posición

        // Texto del número de 'oros' centrado en el rectángulo de 'oros'
        this.orosNumber = this.createText(
            this.orosCard.x,  // Usamos la posición x del rectángulo
            this.orosCard.y,  // Usamos la posición y del rectángulo
            this.oros,  
            '40px', 
            '#000000',       // Negro
                
        ).setOrigin(0.5);  // Centramos el texto en su posición

    }


    mostrarPestana()
    {
        // Crear la pestaña
        this.pestana = this.add.container(
            this.sys.game.canvas.width / 2, // Centro del canvas
            this.sys.game.canvas.height / 2 // Centro del canvas
        );
    
        // Fondo semitransparente para bloquear clics detrás
        this.blocker = this.add.rectangle(
            this.sys.game.canvas.width / 2, 
            this.sys.game.canvas.height / 2, 
            this.sys.game.canvas.width, 
            this.sys.game.canvas.height, 
            0x939393, 
            0.5 // Opacidad (50%)
        ).setInteractive(); // Captura eventos para bloquear interacciones

        // Fondo de la pestaña (más grande)
        const fondoPestana = this.add.rectangle(0, 0, 600, 500, 0x000000) // Nuevo tamaño: 600x500
            .setOrigin(0.5) // Centrado
            .setInteractive(); // Fondo para capturar clics
        this.pestana.add(fondoPestana);
    
        let nombres = "No te queda maná,\n no puedes usar ataques especiales.";

        // Crear el texto con los nombres
        const textoPestana = this.add.text(0, 0, nombres, {
            font: "40px Georgia",
            color: "#ffffff",
            align: "center"
        });
    
        textoPestana.setOrigin(0.5, 0.5); // Centrar el origen del texto
        textoPestana.setPosition(0, 5); // Ajustar la posición dentro del fondo
        this.pestana.add(textoPestana);
    
        // Crear el botón rojo para ocultar la pestaña
        const botonCerrar = this.add.rectangle(250, -200, 60, 60, 0xff0000) // Ajuste relativo a la posición del fondo
            .setOrigin(0.5)
            .setInteractive();
        this.pestana.add(botonCerrar);

        const botonCerrarTexto = this.add.text(250, -200, "X", {
            fontSize: "30px", // Asegurar tamaño de fuente
            fontFamily: "Arial",
            fontStyle: "bold",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.pestana.add(botonCerrarTexto);
    
        // Evento del botón para ocultar la pestaña
        botonCerrar.on("pointerdown", () => {
            this.blocker.destroy(); // Eliminar bloqueador
            this.pestana.destroy(); // Eliminar la pestaña
        });

        // Agregar el fondo bloqueador detrás de la pestaña
        this.children.bringToTop(this.pestana);
    }


    mostrarInfo()
    {
        // Crear la pestaña
        this.pestana = this.add.container(
            this.sys.game.canvas.width / 2, // Centro del canvas
            this.sys.game.canvas.height / 2 // Centro del canvas
        );
    
        // Fondo semitransparente para bloquear clics detrás
        this.blocker = this.add.rectangle(
            this.sys.game.canvas.width / 2, 
            this.sys.game.canvas.height / 2, 
            this.sys.game.canvas.width, 
            this.sys.game.canvas.height, 
            0x939393, 
            0.5 // Opacidad (50%)
        ).setInteractive(); // Captura eventos para bloquear interacciones

        // Fondo de la pestaña (más grande)
        const fondoPestana = this.add.rectangle(0, 0, 1000, 500, 0x000000) // Nuevo tamaño: 600x500
            .setOrigin(0.5) // Centrado
            .setInteractive(); // Fondo para capturar clics
        this.pestana.add(fondoPestana);
    
        let nombres = "Información sobre el combate:\n" +
        "Ataque normal: Suma el valor de las cartas.\n" +
        "Ataque especial: Utiliza maná y multiplica las cartas\n dependiendo del nivel de la cualidad correspondiente. \n" +
        "Utiliza estos ataques con cabeza y \n ¡Buena suerte!";

        // Crear el texto con los nombres
        const textoPestana = this.add.text(0, 0, nombres, {
            font: "40px Georgia",
            color: "#ffffff",
            align: "center"
        });
    
        textoPestana.setOrigin(0.5, 0.5); // Centrar el origen del texto
        textoPestana.setPosition(0, 5); // Ajustar la posición dentro del fondo
        this.pestana.add(textoPestana);
    
        // Crear el botón rojo para ocultar la pestaña
        const botonCerrar = this.add.rectangle(450, -200, 60, 60, 0xff0000) // Ajuste relativo a la posición del fondo
            .setOrigin(0.5)
            .setInteractive();
        this.pestana.add(botonCerrar);

        const botonCerrarTexto = this.add.text(450, -200, "X", {
            fontSize: "30px", // Asegurar tamaño de fuente
            fontFamily: "Arial",
            fontStyle: "bold",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.pestana.add(botonCerrarTexto);
    
        // Evento del botón para ocultar la pestaña
        botonCerrar.on("pointerdown", () => {
            this.blocker.destroy(); // Eliminar bloqueador
            this.pestana.destroy(); // Eliminar la pestaña
        });

        // Agregar el fondo bloqueador detrás de la pestaña
        this.children.bringToTop(this.pestana);
    }

}
