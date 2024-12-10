export default class GeneralContactsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GeneralContactsScene' });
    }

    init(data) {
        this.lastScene = data.lastScene;
        this.playerConfig= data.player;
        this.modo= data.modo;
        console.log('lastScene', data.lastScene);
        console.log("modo",data.modo);
    
    }

    preload() {
    
    }

    create(data) {
        // Pintamos el fondo
        const back = this.add.image(0, 0, 'fondoC')
        .setOrigin(0, 0)
        .setDisplaySize(this.sys.game.canvas.width, this.sys.game.canvas.height);

        // Mostramos el texto de que barrio elegir
        let titulo = this.add.text(0, this.sys.game.canvas.height / 15, "¿Qué barrio?");
        titulo.setFontSize(100);
        titulo.setStroke('#000000', 7);
        titulo.x = this.sys.game.canvas.width / 2 - titulo.width / 2;



        // Creamos los rectangulos para ir a los contactos de ese barrio
        const createRectangle = (x, y, width, height, color, modo) => {
            const rect = this.add.rectangle(x, y, width, height, color).setOrigin(0);
            rect.setInteractive().on('pointerdown', () => {
                this.scene.start('ContactScene', { modo: modo }); // Cambiar el modo según la escena
            });
            return rect;
        };

        // Crear los rectángulos para cada barrio
        createRectangle(350, 300, 600, 300,0xd54545,1  ); // Barrio Botellín
        createRectangle(1050, 300, 600, 300,0x30ff81,2  );    // Barrio porras
        createRectangle(350, 650, 600, 300, 0x45d5d5,3 );  // Barrio Navajas
        createRectangle(1050, 650, 600, 300, 0xffe90c,4 ); // Barrio dinero

        //BACK BUTTON (VOLVER A LA ESCENA CORRESPONDIENTE)
        var backScene;
        backScene = this.add.image(
            this.sys.game.canvas.width / 12,
            this.sys.game.canvas.height / 1.2, 
            'flechaa')
        .setScale(-0.3, 0.3)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start(this.lastScene, { 
                
                modo: this.modo
            });
        });
    }
}

