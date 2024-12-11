import Player from '../src/Player.js';
import Inventory from '../src/inventory.js';

export default class TenfeScene extends Phaser.Scene {
    constructor(){
        super({key: "tenfeScene"})
    }

    preload()
    {
        
    }

    init(data){
        // Usar el parámetro 'fondo' para decidir qué fondo cargar
        this.fondo = data.fondo || 'parque';
        this.modo = data.modo;
        this.playerConfig = data.player;    
        this.inventoryConfig = data.inventory;
        this.dialogueJson = data.dialogueJson;
    }

    create(data){

        //INVENTARIO
            //instanciar inventario
            this.inventory = new Inventory(this);
            if(this.inventoryConfig != undefined) {
                this.inventory.init(this.inventoryConfig);
            }

        //PLAYER
            //instanciar player
            this.player = new Player(this, 50, 60);
            
            this.player.setScale(0.03);
            if(this.playerConfig != undefined)
            {
                this.player.init(this.playerConfig);
            }

        
        console.log("tenfeFondo");//debug
        
        //1. PINTAR FONDO
            //Pintamos un fondo
            var back = this.add.image(0, 0, this.fondo).setOrigin(0, 0);

            //escalar el fondo
            var scaleX = this.cameras.main.width / back.width;
            var scaleY = this.cameras.main.height / back.height;
            
            var scale = Math.min(scaleX, scaleY);
            
            back.setScale(scale);
            
            back.setPosition(
                this.cameras.main.width / 2 - back.displayWidth / 2,
                this.cameras.main.height / 2 - back.displayHeight / 2
            );
        
        //BACK BUTTON
        const backScene = this.add.image(
            this.sys.game.canvas.width / 12,
            this.sys.game.canvas.height / 1.2, 
            'flecha')
        .setScale(-0.3, 0.3)
        .setInteractive()
        .on('pointerdown', () =>  
            this.scene.start('zonaScene', {// Cambiar escena
            modo: this.modo,
             player: this.player.getConfigData(),
             inventory: this.inventory.getConfigData(),
             dialogueJson: this.dialogueJson
           
         }));
        
        //pintar contador
        let tiempoEspera = null;
        this.resultText = this.add.text(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2 + 50,
            'numero:0',
            { fontSize: '32px', color: '#ff0000' }
        ).setOrigin(0.5);

        //pintar boton  linea metro yusoa

        const yusoaMetroButton = this.add.text(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2 - 50,
            'esperar tenfe',
            { fontSize: '32px', color: '#ffffff', backgroundColor: '#000000', padding: { x: 10, y: 5 } }
        ).setOrigin(0.5).setInteractive();
        
        yusoaMetroButton.on('pointerdown', () => {
            // Reiniciar texto y temporizador (BORRA LO QUE HAYA)
            this.resultText.setText('');
            if (tiempoEspera) {
                tiempoEspera.remove(false);
            }
            
        
            // Generar número aleatorio
            const secs = Phaser.Math.Between(0, 60);
            this.countdown = secs * 1000;
            this.resultText.setText(`Número: ${secs}`);

              // Temporizador para mostrar "renfe"
              tiempoEspera = this.time.addEvent({
                delay: secs * 1000, // Convertir a milisegundos
                callback: () => {

                    console.log("el metro ha llegado");//debug
                    //reemplza timer por texto
                    this.resultText.setText('el metro ha llegado');
                    //subir ansiedad, referencia al player inventario json dialogo...
                    //...
                    this.createButton('entrar en el metro', this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 50, () => {
                        //subir ansiedad
                        //...
                        this.scene.start('zonaScene', {// Cambiar escena
                           modo: this.modo, //cambiar a modo: 4
                            player: this.player.getConfigData(),
                            inventory: this.inventory.getConfigData(),
                            dialogueJson: this.dialogueJson
                          
                        })
                    })
                },
                callbackScope: this
            });

        })




       





        /*/gambling de tenfe
        const gachaButton = this.add.text(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2 - 50,
            'esperar tenfe',
            { fontSize: '32px', color: '#ffffff', backgroundColor: '#000000', padding: { x: 10, y: 5 } }
        ).setOrigin(0.5).setInteractive();

       

        let timerEvent = null;


        gachaButton.on('pointerdown', () => {
            // Reiniciar texto y temporizador
            resultText.setText('');
            if (timerEvent) {
                timerEvent.remove(false);
            }

            // Generar número aleatorio
            const secs = Phaser.Math.Between(0, 60);
            resultText.setText(`Número: ${secs}`);

            // Temporizador para mostrar "renfe"
            timerEvent = this.time.addEvent({
                delay: secs * 1000, // Convertir a milisegundos
                callback: () => {
                    resultText.setText('el metro ha llegado');
                },
                callbackScope: this
            });
        });
*/
    }

    update(countdown, dt){

        if ( this.countdown < 0) { // Si se pasan del tiempo o ...
           console.log("se ha terminao el tiempo");//debug   
           this.resultText.setText("secs: 0");
        }
        else {
            
        this.countdown -= dt;
        this.resultText.setText("secs: ",Math.round(this.time * 0.001));
        }


       // this.timeText.setText(Math.round(this.time 0.001));

    }

    random_tenfe(){

        
            // Generar número aleatorio
            const secs = Phaser.Math.Between(0, 60);
            this.resultText.setText(`Número: ${secs}`);
    }

    createButton(text, x, y, callback) {
        const button = this.add.text(x, y, text, { fontSize: '32px', color: '#ffffff', backgroundColor: '#000000', padding: { x: 10, y: 5 } }).setOrigin(0.5).setInteractive();
        button.on('pointerdown', callback);
    }   

}