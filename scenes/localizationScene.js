export default class localizationScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "localizationScene"});
    }

    init(){
    }

    preload(){
        //FONDOS
            this.load.image('parque', 'assets/parque.jpg'); //fondo
            this.load.image('puente', 'assets/puente.jpg'); //fondo
            this.load.image('bar', 'assets/barFondo.jpg'); //fondo
            this.load.image('cni', 'assets/cniFondo.jpg'); //fondo
            this.load.image('hipodromo', 'assets/hipodromoFondo.jpg'); //fondo

        //NPCS

        //FLECHA

        //OBJETOS COLECCIONABLES
        
    }

    create(data){
        
        //1. PINTAR FONDO
            // Usar el parámetro 'fondo' para decidir qué fondo cargar
            const fondo = data.fondo || 'parque';
            
            //Pintamos un fondo
            var back = this.add.image(0, 0, fondo).setOrigin(0, 0);

            //escalar el fondo
            var scaleX = this.cameras.main.width / back.width;
            var scaleY = this.cameras.main.height / back.height;
            
            var scale = Math.min(scaleX, scaleY);
            
            back.setScale(scale);
            
            back.setPosition(
                this.cameras.main.width / 2 - back.displayWidth / 2,
                this.cameras.main.height / 2 - back.displayHeight / 2
            );

        //2. AÑADIR ELEMENTOS LOCALIZACIÓN
            //elle NO visible
            //frase
            //3 botones NPC (depende de data)
            //Flechas
            //agrupación objetos coleccionables (depende de data)
            //boton back
            //ansiedad
            //botón aceptar




























        // botones para testeo
        const backScene = this.add.rectangle(150, 300, 100, 50, 0x000000)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('zonaScene', { modo: data.modo}));

        // botones para testeo
        const combat = this.add.rectangle(50, 300, 100, 50, 0xFFFFFF)
        .setInteractive()
        .on('pointerdown', () => this.scene.start('CombatScene'));

    }

    update(){

    }
}