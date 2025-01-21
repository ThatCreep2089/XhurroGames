import Player from '../src/Player.js';
import Inventory from '../src/inventory.js';

/**
 * Escena que maneja la funcionalidad del "TENFE".
 * Hasta que el jugador no consiga los 4 trozos de constitución, esta estará deshabilitada (actualmente el número de copias se ha rebajado a 1, ya que faltan por añadir tres barrios)
 * Contiene un botón "Esperar Tenfe". Al pulsarlo se eligirá un número random del 0-20, siendo este el número de segundos que el jugador debe esperar hasta poder utilizar el Tenfe.
 * Este número random será también el aumento de ansiedad al jugador.
 * Una vez que termine el tiempo establecido, el tren llegará y el jugador podrá viajar al resto de los barrios (actualmente solo se puede viajar a la zona del enemigo final "Yusoa", por la misma razón anteriormente mencionada)
 */

export default class TenfeScene extends Phaser.Scene {
    constructor(){
        super({key: "tenfeScene"});
        this.destino = '';
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
        
        //console.log("tenfeFondo");//debug
        
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
        
         if(this.inventory.GetTrozos() >= 0)
         {
            
            //pintar contador
            let tiempoEspera = null;
            this.resultText = this.add.text(
                this.sys.game.canvas.width / 5,
                this.sys.game.canvas.height / 2.5,
                'Tiempo de espera: ',
                { fontSize: '40px', color: '#000000', backgroundColor: '#e677ff', fontWeight: 'bold', fontFamily: 'Georgia', padding: { x: 10, y: 5 } }
            ).setOrigin(0.5);

            //pintar boton linea metro yusoa
            const yusoaMetroButton = this.add.text(
                this.sys.game.canvas.width / 5,
                this.sys.game.canvas.height / 5,
                'ESPERAR TENFE',
                { fontSize: '75px', color: '#ffffff', backgroundColor: '#d100ff', fontWeight: 'bold', fontFamily: 'Georgia', padding: { x: 10, y: 5 } }
            ).setOrigin(0.5).setInteractive();
            
            yusoaMetroButton.on('pointerdown', () => {
                //inhabilitar boton esperarTenfe
                yusoaMetroButton.disableInteractive();

                //inhabiltar back button
                backScene.disableInteractive();
                backScene.setVisible(false);
                
                // Reiniciar texto y temporizador (BORRA LO QUE HAYA)
                this.resultText.setText('');
                if (tiempoEspera) {
                    tiempoEspera.remove(false);
                }
                
            
                // Generar número aleatorio
                const secs = Phaser.Math.Between(0, 20);
                //console.log("secs"+ secs);
                this.countdown = secs * 1000;
                //console.log("countdown" + this.countdown)
                this.resultText.setText("Tiempo de espera: "+ this.countdown);

                // Temporizador para mostrar "renfe"
                tiempoEspera = this.time.addEvent({
                    delay: secs * 1000, // Convertir a milisegundos
                    callback: () => {
                        //habilitar de nuevo back button
                        backScene.setVisible(true);
                        backScene.setInteractive();
                        
                        //añadir imagen tren
                        let vagonImage = this.add.image(this.sys.game.canvas.width / 1.4, this.sys.game.canvas.height / 1.8, 'vagon');
                        vagonImage.setDepth(-1);
                        vagonImage.setOrigin(0.5);

                        //console.log("el metro ha llegado");//debug
                        //reemplza timer por texto

                        if (!this.sound.get('avisoMetro')) {
                            const music = this.sound.add('avisoMetro', { volume: 0.5, loop: false });
                            music.play();
                        }

                        this.resultText.setText('EL TREN HA LLEGADO');
                        //subir ansiedad, referencia al player inventario json dialogo...
                        this.player.IncreaseAnxiety(secs);
                        this.createButton('Entrar al tren', this.sys.game.canvas.width / 5, this.sys.game.canvas.height / 2, '#7e1c9e', () => {
                            //subir ansiedad
                            //...
                            this.scene.start('zonaScene', {// Cambiar escena
                            modo: this.destino, //cambiar a modo: 13
                                player: this.player.getConfigData(),
                                inventory: this.inventory.getConfigData(),
                                dialogueJson: this.dialogueJson
                            
                            })
                        })
                    },
                    callbackScope: this
                });

            })
            
            //pintar seleccion de barrios
            this.mostrarPestana();
        
        }
        else
        {
            //mensaje diciendo que no se puede utilizar
            let aviso = this.add.text(
                this.sys.game.canvas.width / 2,
                this.sys.game.canvas.height / 2,
                'TENFE NO ESTÁ DISPONIBLE',
                { fontSize: '100px', color: '#ffffff', backgroundColor: '#d100ff', fontWeight: 'bold', fontFamily: 'Georgia', padding: { x: 10, y: 5 } }
            ).setOrigin(0.5);
        }


        

    }

    update(countdown, dt){

        if(this.inventory.GetTrozos() >= 1)
        {
            if ( this.countdown < 0) { // Si se pasan del tiempo o ...
                //console.log("se ha terminao el tiempo");//debug   
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

    createButton(text, x, y, color, callback) {
        const button = this.add.text(x, y, text, { fontSize: '50px', color: '#ffffff', backgroundColor: color, fontWeight: 'bold', fontFamily: 'Georgia', padding: { x: 10, y: 5 } })
        .setOrigin(0.5).setInteractive();
        button.on('pointerdown', callback);
        return button;
    }   

    mostrarPestana()
    {
        // Tamaño del rectángulo de botones
        let rectWidth = 700;
        let rectHeight = 500;

        // Centro de la pantalla
        let centerX = this.sys.game.canvas.width / 2;
        let centerY = this.sys.game.canvas.height / 2;

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
            0x000000, 
            1 // Opacidad (50%)
        ).setInteractive(); // Captura eventos para bloquear interacciones

        // Posiciones de los botones formando un rectángulo
        let positions = [
            { x: -rectWidth / 2, y: -rectHeight / 2 }, // Esquina superior izquierda
            { x: rectWidth / 2, y: -rectHeight / 2 },  // Esquina superior derecha
            { x: -rectWidth / 2, y: rectHeight / 2 },  // Esquina inferior izquierda
            { x: rectWidth / 2, y: rectHeight / 2 }    // Esquina inferior derecha
        ];

        // Crear titulo
        let pestanaTitulo = this.add.text(0, -rectHeight / 1.3, "SELECCIONE BARRIO AL QUE VIAJAR", { fontSize: '50px', color: '#FFFFFF', backgroundColor: '#7e1c9e', fontWeight: 'bold', fontFamily: 'Georgia', padding: { x: 10, y: 5 } })
        .setOrigin(0.5);
        this.pestana.add(pestanaTitulo);

        // Crear botones
        let calderillaButton = this.createButton("CALDERILLA", positions[0].x, positions[0].y, '#ffff00', () => {
            this.destino = 4;

            // Evento del botón para ocultar la pestaña
            this.blocker.destroy(); // Eliminar bloqueador
            this.pestana.destroy(); // Eliminar la pestaña
        });
        this.pestana.add(calderillaButton);

        let navajasButton = this.createButton("NAVAJAS", positions[1].x, positions[1].y, '#00f7ff', () => {
            this.destino = 10;

            // Evento del botón para ocultar la pestaña
            this.blocker.destroy(); // Eliminar bloqueador
            this.pestana.destroy(); // Eliminar la pestaña
        });
        this.pestana.add(navajasButton);

        let porrasButton = this.createButton("PORRAS", positions[2].x, positions[2].y, '#4dff00', () => {
            this.destino = 7;

            // Evento del botón para ocultar la pestaña
            this.blocker.destroy(); // Eliminar bloqueador
            this.pestana.destroy(); // Eliminar la pestaña
        });
        this.pestana.add(porrasButton);

        let botellinButton = this.createButton("BOTELLIN", positions[3].x, positions[3].y, '#ff0000', () => {
            this.destino = 1;

            // Evento del botón para ocultar la pestaña
            this.blocker.destroy(); // Eliminar bloqueador
            this.pestana.destroy(); // Eliminar la pestaña
        });
        this.pestana.add(botellinButton);
    
        if(this.inventory.GetTrozos() >= 4) //se han derrotado todos los bosses
        {
            let yusoaButton = this.createButton("CONGRESO", 0, 0, '#7e1c9e', () => {
                this.destino = 13;
    
                // Evento del botón para ocultar la pestaña
                this.blocker.destroy(); // Eliminar bloqueador
                this.pestana.destroy(); // Eliminar la pestaña
            });
            this.pestana.add(yusoaButton);
        }

        // Agregar el fondo bloqueador detrás de la pestaña
        this.children.bringToTop(this.pestana);
    }

}