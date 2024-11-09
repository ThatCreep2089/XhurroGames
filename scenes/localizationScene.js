export default class localizationScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "localizationScene"});
        var acceptButton, backButton;
        var show;
        this.mode;
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
            this.load.image('paco', 'assets/paco.png');
            this.load.image('humberto', 'assets/humberto.png');
            this.load.image('maria', 'assets/maria.png');

        //BACK BUTTON
        this.load.image('flecha', 'assets/flecha.png');

        //FLECHAS
        this.load.image('arrow', 'assets/arrow.png');

        this.load.image('accept', 'assets/accept.png');

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
            //3 botones NPC (depende de data)
            //agrupación objetos coleccionables (depende de data)
            //ansiedad
            //elle NO visible


            // TEXTO
            let titulo = this.add.text(
                this.sys.game.canvas.width / 2,   // Coordenada X: centrado horizontalmente
                this.sys.game.canvas.height / 10, // Coordenada Y: 1/10 del alto de la pantalla 
                "Con quien quieres hablar?", 
                { 
                    fontSize: '100px', 
                    color: '#999999',       // Negro
                    fontFamily: 'Georgia',  
                }
            );
            titulo.setStroke('#000000', 8);  // Trazo negro, puedes ajustar el grosor o eliminarlo
            titulo.setOrigin(0.5, 0);

            
            //FLECHAS
                var arrows = this.add.group();
                var arrow1 = this.add.image(
                    this.sys.game.canvas.width / 4,
                    this.sys.game.canvas.height / 3.2, 
                    'arrow')
                    .setScale(0.2, 0.1);
                arrows.add(arrow1);

                var arrow2 = this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 3.2, 
                    'arrow')
                    .setScale(0.2, 0.1);
                arrows.add(arrow2);


            //ACCEPT && BACK
                var acceptButton = this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 3.2, 
                    'accept')
                .setScale(0.5, 0.5)
                .setInteractive()
                .on('pointerdown', () => this.scene.start('CombatScene')); //cambiar a escena dialogo
                
                var backButton = this.add.image(
                    this.sys.game.canvas.width / 4,
                    this.sys.game.canvas.height / 3.2, 
                    'flecha')
                .setScale(-0.3, 0.3)
                .setInteractive()
                .on('pointerdown', () => {
                    this.acceptButton(false, arrows, acceptButton, backButton);
                });
    ;
                
                this.acceptButton(false, arrows, acceptButton, backButton); //empieza ocultando boton aceptar


            

            

            //NPCS (DEPENDEN DE DATA)
                console.log("mirar data");
                this.mode = data.modo || 2;
                console.log(this.mode);
                
                if(this.mode == 1)
                {
                    //PACO
                    const paco = this.add.image(
                        this.sys.game.canvas.width / 4,
                        this.sys.game.canvas.height / 1.5, 
                        'paco')
                    .setOrigin(0.5, 0.5)
                    .setInteractive()
                    .on('pointerdown', () => this.acceptButton(true, arrows, acceptButton, backButton))
                    .on('pointerover', () => paco.setTint(0xff0000))
                    .on('pointerout', () => paco.clearTint());

                    //HUMBERTO
                    const humberto = this.add.image(
                        this.sys.game.canvas.width / 2,
                        this.sys.game.canvas.height / 1.5, 
                        'humberto')
                    .setOrigin(0.5, 0.5)
                    .setScale(0.45)
                    .setInteractive()
                    .on('pointerdown', () => this.acceptButton(true, arrows, acceptButton, backButton))
                    .on('pointerover', () => humberto.setTint(0xff0000))
                    .on('pointerout', () => humberto.clearTint());
                }
                else if(this.mode == 2)
                {
                    //MARIA
                    const maria = this.add.image(
                        this.sys.game.canvas.width / 1.96,
                        this.sys.game.canvas.height / 1.5, 
                        'maria')
                    .setOrigin(0.5, 0.5)
                    .setScale(0.7)
                    .setInteractive()
                    .on('pointerdown', () => this.acceptButton(true, arrows, acceptButton, backButton))
                    .on('pointerover', () => maria.setTint(0xff0000))
                    .on('pointerout', () => maria.clearTint());
                }
                

                


            //BACK BUTTON
            const backScene = this.add.image(
                this.sys.game.canvas.width / 12,
                this.sys.game.canvas.height / 1.2, 
                'flecha')
            .setScale(-0.3, 0.3)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('zonaScene', { modo: data.modo}));

            





        // botones para testeo
        const combat = this.add.rectangle(50, 300, 100, 50, 0xFFFFFF)
        .setInteractive()
        .on('pointerdown', () => this.scene.start('CombatScene'));

    }

    update(){

    }

    acceptButton(show, arrows, acceptButton, backButton) //para enseñar y ocultar botones
    {
        if(show == true)
        {
            //mostrar boton aceptar y back
            acceptButton.setVisible(true);
            backButton.setVisible(true);


            //ocultar flechas
            arrows.setVisible(false);
        }
        else
        {
            // Ocultar botones aceptar y back
            if (acceptButton) acceptButton.setVisible(false);
            if (backButton) backButton.setVisible(false);   

            // Mostrar flechas
            arrows.setVisible(true);
        }
         
    }
}