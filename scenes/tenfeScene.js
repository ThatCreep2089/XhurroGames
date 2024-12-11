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
            this.player.changeMove(false);
            this.player.setVisible(false);
        
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

            back.setDepth(-2);
        
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
        
         if(this.inventory.GetTrozos() >= 1)
         {
            //pintar contador
            let tiempoEspera = null;
            this.resultText = this.add.text(
                this.sys.game.canvas.width / 5,
                this.sys.game.canvas.height / 2.5,
                'Tiempo de espera: ',
                { fontSize: '40px', color: '#000000', backgroundColor: '#f38383', fontWeight: 'bold', fontFamily: 'Georgia', padding: { x: 10, y: 5 } }
            ).setOrigin(0.5);

            //pintar boton  linea metro yusoa
            const yusoaMetroButton = this.add.text(
                this.sys.game.canvas.width / 5,
                this.sys.game.canvas.height / 5,
                'ESPERAR TENFE',
                { fontSize: '75px', color: '#ffffff', backgroundColor: '#a51b1b', fontWeight: 'bold', fontFamily: 'Georgia', padding: { x: 10, y: 5 } }
            ).setOrigin(0.5).setInteractive();
            
            yusoaMetroButton.on('pointerdown', () => {
                // Reiniciar texto y temporizador (BORRA LO QUE HAYA)
                this.resultText.setText('');
                if (tiempoEspera) {
                    tiempoEspera.remove(false);
                }
                
            
                // Generar número aleatorio
                const secs = Phaser.Math.Between(0, 20);
                console.log("secs"+ secs);
                this.countdown = secs * 1000;
                console.log("countdown" + this.countdown)
                this.resultText.setText("Tiempo de espera: "+ this.countdown);

                // Temporizador para mostrar "renfe"
                tiempoEspera = this.time.addEvent({
                    delay: secs * 1000, // Convertir a milisegundos
                    callback: () => {
                        //añadir imagen tren
                        let vagonImage = this.add.image(this.sys.game.canvas.width / 1.4, this.sys.game.canvas.height / 1.8, 'vagon');
                        vagonImage.setDepth(-1);

                        console.log("el metro ha llegado");//debug
                        //reemplza timer por texto
                        this.resultText.setText('EL TREN HA LLEGADO');
                        //subir ansiedad, referencia al player inventario json dialogo...
                        this.player.IncreaseAnxiety(secs);
                        this.createButton('Entrar al tren', this.sys.game.canvas.width / 5, this.sys.game.canvas.height / 2, () => {
                            //subir ansiedad
                            //...
                            this.scene.start('zonaScene', {// Cambiar escena
                            modo: 4, //cambiar a modo: 4
                                player: this.player.getConfigData(),
                                inventory: this.inventory.getConfigData(),
                                dialogueJson: this.dialogueJson
                            
                            })
                        })
                    },
                    callbackScope: this
                });

            })}
        else{
            //mensaje diciendo que no se puede utilizar
            let aviso = this.add.text(
                this.sys.game.canvas.width / 2,
                this.sys.game.canvas.height / 2,
                'TENFE NO ESTÁ DISPONIBLE',
                { fontSize: '100px', color: '#000000', backgroundColor: '#d31a14', fontWeight: 'bold', fontFamily: 'Georgia', padding: { x: 10, y: 5 } }
            ).setOrigin(0.5);
        }


        

    }

    update(countdown, dt){

        if(this.inventory.GetTrozos() >= 1)
        {
            if ( this.countdown < 0) { // Si se pasan del tiempo o ...
                console.log("se ha terminao el tiempo");//debug   
                this.resultText.setText("Tiempo de espera: 0");
             }
             else {
                 this.countdown -= dt;
                 
                 if(isNaN(this.countdown) || this.countdown === null || this.countdown === undefined)
                 {
                    this.resultText.setText("Tiempo de espera: 0");
                 }
                 else{
                    this.resultText.setText("Tiempo de espera: " + Math.round(this.countdown * 0.001));
                 }
                 
             }
        }
    }

    createButton(text, x, y, callback) {
        const button = this.add.text(x, y, text, { fontSize: '50px', color: '#ffffff', backgroundColor: '#7e1c9e', fontWeight: 'bold', fontFamily: 'Georgia', padding: { x: 10, y: 5 } })
        .setOrigin(0.5).setInteractive();
        button.on('pointerdown', callback);
    }   

}