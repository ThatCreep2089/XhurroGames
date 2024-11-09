export default class localizationScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "localizationScene"});
        
        this.mode;
        this.titulo = null;
    }

    init(data){
        // Usar el parámetro 'fondo' para decidir qué fondo cargar
        this.mode = data.fondo || 'parque';
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
            //Pintamos un fondo
            var back = this.add.image(0, 0, this.mode).setOrigin(0, 0);

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
            //agrupación objetos coleccionables (depende de data)
            //ansiedad
            //elle NO visible


            // TEXTO
            this.titulo = this.add.text(
                this.sys.game.canvas.width / 2,   // coordenada x
                this.sys.game.canvas.height / 12, // coordenada y
                "Con quien quieres hablar?", //frase
                { 
                    fontSize: '100px', 
                    color: '#999999',       // Gris
                    fontFamily: 'Georgia',  
                }
            );
            this.titulo.setStroke('#000000', 8);  // Trazo negro
            this.titulo.setOrigin(0.5, 0);
            this.titulo.setScale(0.8);

            
            //NPCS (DEPENDEN DE DATA)
                //LOCALIZACION: BAR
                    if(this.mode == 'bar')
                        {
                            var names = this.add.group(); //grupo de nombres de npcs

                                //NOMBRE Paco
                                let pacoName = this.add.text(
                                    this.sys.game.canvas.width / 4,   // coordenada x
                                    this.sys.game.canvas.height / 3.7, // coordenada y
                                    "PACO", //frase
                                    { 
                                        fontSize: '100px', 
                                        color: '#999999',       // Gris
                                        fontFamily: 'Georgia',  
                                    }
                                );
                                pacoName.setStroke('#000000', 8);  // Trazo negro
                                pacoName.setOrigin(0.5, 0);
                                pacoName.setScale(0.6);

                                names.add(pacoName); //añadir al conjunto
                            
                                //BOTON Paco
                                const paco = this.add.image(
                                    this.sys.game.canvas.width / 4,
                                    this.sys.game.canvas.height / 1.4, 
                                    'paco') //id
                                .setOrigin(0.5, 0.5)
                                .setScale(0.9)
                                .setInteractive()
                                .on('pointerdown', () => this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con PACO?"))
                                .on('pointerover', () => paco.setTint(0xff0000)) //para que se ponga rojo cuando el raton está encima
                                .on('pointerout', () => paco.clearTint());
                        }
                //LOCALIZACION: CNI
                    else if(this.mode == 'cni')
                    {
                        var names = this.add.group();
                            
                            let mariaName = this.add.text(
                                this.sys.game.canvas.width / 1.37,   // Coordenada X: centrado horizontalmente
                                this.sys.game.canvas.height / 3.7, // Coordenada Y: 1/10 del alto de la pantalla 
                                "MARIA", 
                                { 
                                    fontSize: '100px', 
                                    color: '#999999',       // Gris
                                    fontFamily: 'Georgia',  
                                }
                            );
                            mariaName.setStroke('#000000', 8);  // Trazo negro
                            mariaName.setOrigin(0.5, 0);
                            mariaName.setScale(0.6);

                            names.add(mariaName);
                        
                            //MARIA
                            const maria = this.add.image(
                                this.sys.game.canvas.width / 1.35,
                                this.sys.game.canvas.height / 1.4, 
                                'maria')
                            .setOrigin(0.5, 0.5)
                            .setScale(0.6)
                            .setInteractive()
                            .on('pointerdown', () => this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con MARIA?"))
                            .on('pointerover', () => maria.setTint(0xff0000))
                            .on('pointerout', () => maria.clearTint());
                    }
                else if(this.mode == 'hipodromo')
                {
                    var names = this.add.group();

                        let humbertoName = this.add.text(
                            this.sys.game.canvas.width / 2,   // Coordenada X: centrado horizontalmente
                            this.sys.game.canvas.height / 3.7, // Coordenada Y: 1/10 del alto de la pantalla 
                            "HUMBERTO", 
                            { 
                                fontSize: '100px', 
                                color: '#999999',       // Negro
                                fontFamily: 'Georgia',  
                            }
                        );
                        humbertoName.setStroke('#000000', 8);  // Trazo negro, puedes ajustar el grosor o eliminarlo
                        humbertoName.setOrigin(0.5, 0);
                        humbertoName.setScale(0.6);

                        names.add(humbertoName);

                    
                        //HUMBERTO
                        const humberto = this.add.image(
                            this.sys.game.canvas.width / 2,
                            this.sys.game.canvas.height / 1.4, 
                            'humberto')
                        .setOrigin(0.5, 0.5)
                        .setScale(0.4)
                        .setInteractive()
                        .on('pointerdown', () => this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con HUMBERTO?"))
                        .on('pointerover', () => humberto.setTint(0xff0000))
                        .on('pointerout', () => humberto.clearTint());
                }
                else if(this.mode == 'parque') //pruebas
                    {
                        
                        var names = this.add.group();

                        let pacoName = this.add.text(
                            this.sys.game.canvas.width / 4,   // Coordenada X: centrado horizontalmente
                            this.sys.game.canvas.height / 3.7, // Coordenada Y: 1/10 del alto de la pantalla 
                            "PACO", 
                            { 
                                fontSize: '100px', 
                                color: '#999999',       // Negro
                                fontFamily: 'Georgia',  
                            }
                        );
                        pacoName.setStroke('#000000', 8);  // Trazo negro, puedes ajustar el grosor o eliminarlo
                        pacoName.setOrigin(0.5, 0);
                        pacoName.setScale(0.6);

                        names.add(pacoName);

                        let humbertoName = this.add.text(
                            this.sys.game.canvas.width / 2,   // Coordenada X: centrado horizontalmente
                            this.sys.game.canvas.height / 3.7, // Coordenada Y: 1/10 del alto de la pantalla 
                            "HUMBERTO", 
                            { 
                                fontSize: '100px', 
                                color: '#999999',       // Negro
                                fontFamily: 'Georgia',  
                            }
                        );
                        humbertoName.setStroke('#000000', 8);  // Trazo negro, puedes ajustar el grosor o eliminarlo
                        humbertoName.setOrigin(0.5, 0);
                        humbertoName.setScale(0.6);

                        names.add(humbertoName);

                        let mariaName = this.add.text(
                            this.sys.game.canvas.width / 1.37,   // Coordenada X: centrado horizontalmente
                            this.sys.game.canvas.height / 3.7, // Coordenada Y: 1/10 del alto de la pantalla 
                            "MARIA", 
                            { 
                                fontSize: '100px', 
                                color: '#999999',       // Negro
                                fontFamily: 'Georgia',  
                            }
                        );
                        mariaName.setStroke('#000000', 8);  // Trazo negro, puedes ajustar el grosor o eliminarlo
                        mariaName.setOrigin(0.5, 0);
                        mariaName.setScale(0.6);

                        names.add(mariaName);
                        
                        
                        
                        
                        
                        
                        //PACO
                        const paco = this.add.image(
                            this.sys.game.canvas.width / 4,
                            this.sys.game.canvas.height / 1.4, 
                            'paco')
                        .setOrigin(0.5, 0.5)
                        .setScale(0.9)
                        .setInteractive()
                        .on('pointerdown', () => this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con PACO?"))
                        .on('pointerover', () => paco.setTint(0xff0000))
                        .on('pointerout', () => paco.clearTint());
                        


                        


                        //HUMBERTO
                        const humberto = this.add.image(
                            this.sys.game.canvas.width / 2,
                            this.sys.game.canvas.height / 1.4, 
                            'humberto')
                        .setOrigin(0.5, 0.5)
                        .setScale(0.4)
                        .setInteractive()
                        .on('pointerdown', () => this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con HUMBERTO?"))
                        .on('pointerover', () => humberto.setTint(0xff0000))
                        .on('pointerout', () => humberto.clearTint());


                        

                        //MARIA
                        const maria = this.add.image(
                            this.sys.game.canvas.width / 1.35,
                            this.sys.game.canvas.height / 1.4, 
                            'maria')
                        .setOrigin(0.5, 0.5)
                        .setScale(0.6)
                        .setInteractive()
                        .on('pointerdown', () => this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con MARIA?"))
                        .on('pointerover', () => maria.setTint(0xff0000))
                        .on('pointerout', () => maria.clearTint());

                        
                    }



            //FLECHAS
                var arrows = this.add.group();
                var arrow1 = this.add.image(
                    this.sys.game.canvas.width / 4,
                    this.sys.game.canvas.height / 2.5, 
                    'arrow')
                    .setScale(0.2, 0.1);
                arrows.add(arrow1);

                var arrow2 = this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 2.5, 
                    'arrow')
                    .setScale(0.2, 0.1);
                arrows.add(arrow2);

                var arrow3 = this.add.image(
                    this.sys.game.canvas.width / 1.37,
                    this.sys.game.canvas.height / 2.5, 
                    'arrow')
                    .setScale(0.2, 0.1);
                arrows.add(arrow3);


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
                    this.acceptButton(false, arrows, names, acceptButton, backButton, "Con quien quieres hablar?");
                });
    
                
                this.acceptButton(false, arrows, names, acceptButton, backButton, "Con quien quieres hablar?"); //empieza ocultando boton aceptar


            



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

    acceptButton(show, arrows, names, acceptButton, backButton, nuevoTexto) //para enseñar y ocultar botones
    {
        if(show == true)
        {
            //mostrar boton aceptar y back
            acceptButton.setVisible(true);
            backButton.setVisible(true);


            //ocultar flechas
            arrows.setVisible(false);

            //ocultar names
            names.setVisible(false);

            if (this.titulo) {
                this.titulo.setText(nuevoTexto);  // Cambia el texto en el objeto titulo
            }
        }
        else
        {
            // Ocultar botones aceptar y back
            if (acceptButton) acceptButton.setVisible(false);
            if (backButton) backButton.setVisible(false);   

            // Mostrar flechas
            arrows.setVisible(true);

            //mostrar names
            names.setVisible(true);

            if (this.titulo) {
                this.titulo.setText(nuevoTexto);  // Cambia el texto en el objeto titulo
            }
        }
         
    }
}