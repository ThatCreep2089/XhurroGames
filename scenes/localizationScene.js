import Player from '../src/Player.js';

export default class localizationScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "localizationScene"});
        
        this.mode;
        this.titulo = null;
        this.npcTalk;
    }

    init(data){
        // Usar el parámetro 'fondo' para decidir qué fondo cargar
        this.mode = data.fondo || 'parque';
        this.modo = data.modo;
    }

    preload(){
        //FONDOS
            this.load.image('parque', 'assets/fondos/parque.jpg'); //fondo
            this.load.image('puente', 'assets/fondos/puente.jpg'); //fondo
            this.load.image('bar', 'assets/fondos/barFondo.jpg'); //fondo
            this.load.image('cni', 'assets/fondos/cniFondo.jpg'); //fondo
            this.load.image('hipodromo', 'assets/fondos/hipodromoFondo.jpg'); //fondo
            this.load.image('cruzRoja', 'assets/fondos/cruzRoja.jpg'); //fondo
            this.load.image('iglesia', 'assets/fondos/iglesia.jpg'); //fondo

        //NPCS
            this.load.image('paco', 'assets/npc/paco.png');
            this.load.image('humberto', 'assets/npc/humberto.png');
            this.load.image('maria', 'assets/npc/maria.png');
            this.load.image('npc', 'assets/npc/npc.png');

        //BACK BUTTON
        this.load.image('flecha', 'assets/other/flecha.png');

        //FLECHAS
        this.load.image('arrow', 'assets/other/arrow.png');

        this.load.image('accept', 'assets/other/accept.png');

        
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
                                .on('pointerdown', () =>{
                                    this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con PACO?");
                                    this.npcTalk = 'paco';
                                    })
                                .on('pointerover', () => paco.setTint(0xff0000)) //para que se ponga rojo cuando el raton está encima
                                .on('pointerout', () => paco.clearTint());


                                //NOMBRE Npc
                                let npcName1 = this.add.text(
                                    this.sys.game.canvas.width / 2,   // coordenada x
                                    this.sys.game.canvas.height / 3.7, // coordenada y
                                    "NPC", //frase
                                    { 
                                        fontSize: '100px', 
                                        color: '#999999',       // Gris
                                        fontFamily: 'Georgia',  
                                    }
                                );
                                npcName1.setStroke('#000000', 8);  // Trazo negro
                                npcName1.setOrigin(0.5, 0);
                                npcName1.setScale(0.6);

                                names.add(npcName1); //añadir al conjunto
                            
                                //BOTON Npc
                                const npc1 = this.add.image(
                                    this.sys.game.canvas.width / 2,
                                    this.sys.game.canvas.height / 1.4, 
                                    'npc') //id
                                .setOrigin(0.5, 0.5)
                                .setScale(3)
                                .setInteractive()
                                .on('pointerdown', () => {
                                    this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con NPC?");
                                    this.npcTalk = 'random';
                                    })
                                .on('pointerover', () => npc1.setTint(0xff0000)) //para que se ponga rojo cuando el raton está encima
                                .on('pointerout', () => npc1.clearTint());

                                //NOMBRE Npc
                                let npcName2 = this.add.text(
                                    this.sys.game.canvas.width / 1.37,   // coordenada x
                                    this.sys.game.canvas.height / 3.7, // coordenada y
                                    "NPC", //frase
                                    { 
                                        fontSize: '100px', 
                                        color: '#999999',       // Gris
                                        fontFamily: 'Georgia',  
                                    }
                                );
                                npcName2.setStroke('#000000', 8);  // Trazo negro
                                npcName2.setOrigin(0.5, 0);
                                npcName2.setScale(0.6);

                                names.add(npcName2); //añadir al conjunto
                            
                                //BOTON Npc
                                const npc2 = this.add.image(
                                    this.sys.game.canvas.width / 1.37,
                                    this.sys.game.canvas.height / 1.4, 
                                    'npc') //id
                                .setOrigin(0.5, 0.5)
                                .setScale(3)
                                .setInteractive()
                                .on('pointerdown', () => {
                                    this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con NPC?");
                                    this.npcTalk = 'random';
                                    })
                                .on('pointerover', () => npc2.setTint(0xff0000)) //para que se ponga rojo cuando el raton está encima
                                .on('pointerout', () => npc2.clearTint());
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
                            .on('pointerdown', () =>{
                                this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con MARIA?");
                                this.npcTalk = 'maria';
                                })
                            .on('pointerover', () => maria.setTint(0xff0000))
                            .on('pointerout', () => maria.clearTint());


                            //NOMBRE Npc
                            let npcName1 = this.add.text(
                                this.sys.game.canvas.width / 2,   // coordenada x
                                this.sys.game.canvas.height / 3.7, // coordenada y
                                "NPC", //frase
                                { 
                                    fontSize: '100px', 
                                    color: '#999999',       // Gris
                                    fontFamily: 'Georgia',  
                                }
                            );
                            npcName1.setStroke('#000000', 8);  // Trazo negro
                            npcName1.setOrigin(0.5, 0);
                            npcName1.setScale(0.6);

                            names.add(npcName1); //añadir al conjunto
                        
                            //BOTON Npc
                            const npc1 = this.add.image(
                                this.sys.game.canvas.width / 2,
                                this.sys.game.canvas.height / 1.4, 
                                'npc') //id
                            .setOrigin(0.5, 0.5)
                            .setScale(3)
                            .setInteractive()
                            .on('pointerdown', () => {
                                this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con NPC?");
                                this.npcTalk = 'random';
                                })
                            .on('pointerover', () => npc1.setTint(0xff0000)) //para que se ponga rojo cuando el raton está encima
                            .on('pointerout', () => npc1.clearTint());

                            //NOMBRE Npc
                            let npcName2 = this.add.text(
                                this.sys.game.canvas.width / 4,   // coordenada x
                                this.sys.game.canvas.height / 3.7, // coordenada y
                                "NPC", //frase
                                { 
                                    fontSize: '100px', 
                                    color: '#999999',       // Gris
                                    fontFamily: 'Georgia',  
                                }
                            );
                            npcName2.setStroke('#000000', 8);  // Trazo negro
                            npcName2.setOrigin(0.5, 0);
                            npcName2.setScale(0.6);

                            names.add(npcName2); //añadir al conjunto
                        
                            //BOTON Npc
                            const npc2 = this.add.image(
                                this.sys.game.canvas.width / 4,
                                this.sys.game.canvas.height / 1.4, 
                                'npc') //id
                            .setOrigin(0.5, 0.5)
                            .setScale(3)
                            .setInteractive()
                            .on('pointerdown', () => {
                                this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con NPC?");
                                this.npcTalk = 'random';
                                })
                            .on('pointerover', () => npc2.setTint(0xff0000)) //para que se ponga rojo cuando el raton está encima
                            .on('pointerout', () => npc2.clearTint());
                            
                    }
                //LOCALIZACION: HIPODROMO
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
                        .on('pointerdown', () =>{
                            this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con HUMBERTO?");
                            this.npcTalk = 'humberto';
                            })
                        .on('pointerover', () => humberto.setTint(0xff0000))
                        .on('pointerout', () => humberto.clearTint());

                        //NOMBRE Npc
                        let npcName1 = this.add.text(
                            this.sys.game.canvas.width / 4,   // coordenada x
                            this.sys.game.canvas.height / 3.7, // coordenada y
                            "NPC", //frase
                            { 
                                fontSize: '100px', 
                                color: '#999999',       // Gris
                                fontFamily: 'Georgia',  
                            }
                        );
                        npcName1.setStroke('#000000', 8);  // Trazo negro
                        npcName1.setOrigin(0.5, 0);
                        npcName1.setScale(0.6);

                        names.add(npcName1); //añadir al conjunto
                    
                        
                        //BOTON Npc
                        const npc1 = this.add.image(
                            this.sys.game.canvas.width / 4,
                            this.sys.game.canvas.height / 1.4, 
                            'npc') //id
                        .setOrigin(0.5, 0.5)
                        .setScale(3)
                        .setInteractive()
                        .on('pointerdown', () => {
                            this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con NPC?");
                            this.npcTalk = 'random';
                            })
                        .on('pointerover', () => npc1.setTint(0xff0000)) //para que se ponga rojo cuando el raton está encima
                        .on('pointerout', () => npc1.clearTint());

                        //NOMBRE Npc
                        let npcName2 = this.add.text(
                            this.sys.game.canvas.width / 1.37,   // coordenada x
                            this.sys.game.canvas.height / 3.7, // coordenada y
                            "NPC", //frase
                            { 
                                fontSize: '100px', 
                                color: '#999999',       // Gris
                                fontFamily: 'Georgia',  
                            }
                        );
                        npcName2.setStroke('#000000', 8);  // Trazo negro
                        npcName2.setOrigin(0.5, 0);
                        npcName2.setScale(0.6);

                        names.add(npcName2); //añadir al conjunto
                    
                        //BOTON Npc
                        const npc2 = this.add.image(
                            this.sys.game.canvas.width / 1.37,
                            this.sys.game.canvas.height / 1.4, 
                            'npc') //id
                        .setOrigin(0.5, 0.5)
                        .setScale(3)
                        .setInteractive()
                        .on('pointerdown', () => {
                            this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con NPC?");
                            this.npcTalk = 'random';
                            })
                        .on('pointerover', () => npc2.setTint(0xff0000)) //para que se ponga rojo cuando el raton está encima
                        .on('pointerout', () => npc2.clearTint());




                    }
                //LOCALIZACION: PARQUE
                    else if(this.mode == 'parque')
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
                                color: '#999999',       // Gris
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
                        .on('pointerdown', () =>{
                            this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con PACO?");
                            this.npcTalk = 'paco';
                            })
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
                        .on('pointerdown', () =>{
                            this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con HUMBERTO?");
                            this.npcTalk = 'humberto';
                            })
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
                        .on('pointerdown', () =>{
                            this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con MARIA?");
                            this.npcTalk = 'maria';
                            })
                        .on('pointerover', () => maria.setTint(0xff0000))
                        .on('pointerout', () => maria.clearTint());

                        
                    }
                //LOCALIZACION: PUENTE
                    else if(this.mode == 'puente')
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
                                color: '#999999',       // Gris
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
                        .on('pointerdown', () =>{
                            this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con PACO?");
                            this.npcTalk = 'paco';
                            })
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
                        .on('pointerdown', () =>{
                            this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con HUMBERTO?");
                            this.npcTalk = 'humberto';
                            })
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
                        .on('pointerdown', () =>{
                            this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con MARIA?");
                            this.npcTalk = 'maria';
                            })
                        .on('pointerover', () => maria.setTint(0xff0000))
                        .on('pointerout', () => maria.clearTint());

                        
                    }
                  //LOCALIZACION: CNI
                    else if(this.mode == 'cruzRoja')
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
                            .on('pointerdown', () =>{
                                this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con MARIA?");
                                this.npcTalk = 'maria';
                                })
                            .on('pointerover', () => maria.setTint(0xff0000))
                            .on('pointerout', () => maria.clearTint());


                            //NOMBRE Npc
                            let npcName1 = this.add.text(
                                this.sys.game.canvas.width / 2,   // coordenada x
                                this.sys.game.canvas.height / 3.7, // coordenada y
                                "NPC", //frase
                                { 
                                    fontSize: '100px', 
                                    color: '#999999',       // Gris
                                    fontFamily: 'Georgia',  
                                }
                            );
                            npcName1.setStroke('#000000', 8);  // Trazo negro
                            npcName1.setOrigin(0.5, 0);
                            npcName1.setScale(0.6);

                            names.add(npcName1); //añadir al conjunto
                        
                            //BOTON Npc
                            const npc1 = this.add.image(
                                this.sys.game.canvas.width / 2,
                                this.sys.game.canvas.height / 1.4, 
                                'npc') //id
                            .setOrigin(0.5, 0.5)
                            .setScale(3)
                            .setInteractive()
                            .on('pointerdown', () => {
                                this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con NPC?");
                                this.npcTalk = 'random';
                                })
                            .on('pointerover', () => npc1.setTint(0xff0000)) //para que se ponga rojo cuando el raton está encima
                            .on('pointerout', () => npc1.clearTint());

                            //NOMBRE Npc
                            let npcName2 = this.add.text(
                                this.sys.game.canvas.width / 4,   // coordenada x
                                this.sys.game.canvas.height / 3.7, // coordenada y
                                "NPC", //frase
                                { 
                                    fontSize: '100px', 
                                    color: '#999999',       // Gris
                                    fontFamily: 'Georgia',  
                                }
                            );
                            npcName2.setStroke('#000000', 8);  // Trazo negro
                            npcName2.setOrigin(0.5, 0);
                            npcName2.setScale(0.6);

                            names.add(npcName2); //añadir al conjunto
                        
                            //BOTON Npc
                            const npc2 = this.add.image(
                                this.sys.game.canvas.width / 4,
                                this.sys.game.canvas.height / 1.4, 
                                'npc') //id
                            .setOrigin(0.5, 0.5)
                            .setScale(3)
                            .setInteractive()
                            .on('pointerdown', () => {
                                this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con NPC?");
                                this.npcTalk = 'random';
                                })
                            .on('pointerover', () => npc2.setTint(0xff0000)) //para que se ponga rojo cuando el raton está encima
                            .on('pointerout', () => npc2.clearTint());
                            
                    }
                    //LOCALIZACION: CNI
                    else if(this.mode == 'iglesia')
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
                                .on('pointerdown', () =>{
                                    this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con MARIA?");
                                    this.npcTalk = 'maria';
                                    })
                                .on('pointerover', () => maria.setTint(0xff0000))
                                .on('pointerout', () => maria.clearTint());
    
    
                                //NOMBRE Npc
                                let npcName1 = this.add.text(
                                    this.sys.game.canvas.width / 2,   // coordenada x
                                    this.sys.game.canvas.height / 3.7, // coordenada y
                                    "NPC", //frase
                                    { 
                                        fontSize: '100px', 
                                        color: '#999999',       // Gris
                                        fontFamily: 'Georgia',  
                                    }
                                );
                                npcName1.setStroke('#000000', 8);  // Trazo negro
                                npcName1.setOrigin(0.5, 0);
                                npcName1.setScale(0.6);
    
                                names.add(npcName1); //añadir al conjunto
                            
                                //BOTON Npc
                                const npc1 = this.add.image(
                                    this.sys.game.canvas.width / 2,
                                    this.sys.game.canvas.height / 1.4, 
                                    'npc') //id
                                .setOrigin(0.5, 0.5)
                                .setScale(3)
                                .setInteractive()
                                .on('pointerdown', () => {
                                    this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con NPC?");
                                    this.npcTalk = 'random';
                                    })
                                .on('pointerover', () => npc1.setTint(0xff0000)) //para que se ponga rojo cuando el raton está encima
                                .on('pointerout', () => npc1.clearTint());
    
                                //NOMBRE Npc
                                let npcName2 = this.add.text(
                                    this.sys.game.canvas.width / 4,   // coordenada x
                                    this.sys.game.canvas.height / 3.7, // coordenada y
                                    "NPC", //frase
                                    { 
                                        fontSize: '100px', 
                                        color: '#999999',       // Gris
                                        fontFamily: 'Georgia',  
                                    }
                                );
                                npcName2.setStroke('#000000', 8);  // Trazo negro
                                npcName2.setOrigin(0.5, 0);
                                npcName2.setScale(0.6);
    
                                names.add(npcName2); //añadir al conjunto
                            
                                //BOTON Npc
                                const npc2 = this.add.image(
                                    this.sys.game.canvas.width / 4,
                                    this.sys.game.canvas.height / 1.4, 
                                    'npc') //id
                                .setOrigin(0.5, 0.5)
                                .setScale(3)
                                .setInteractive()
                                .on('pointerdown', () => {
                                    this.acceptButton(true, arrows, names, acceptButton, backButton, "Quieres hablar con NPC?");
                                    this.npcTalk = 'random';
                                    })
                                .on('pointerover', () => npc2.setTint(0xff0000)) //para que se ponga rojo cuando el raton está encima
                                .on('pointerout', () => npc2.clearTint());
                                
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


            //ELLE (para la ansiedad)
            let startPosition = window.gameState.playerPosition || { x: 278, y: 150 }; //posicion de la tenfe
            this.player = new Player(this, startPosition.x, startPosition.y);
            this.player.setVisible(false); //que elle NO se vea
            this.player.changeMove(false);
            console.log("Ansiedad: " + this.player.ansiedad); //debug

            //ACCEPT && BACK
                var acceptButton = this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 3.2, 
                    'accept')
                .setScale(0.5, 0.5)
                .setInteractive()
                .on('pointerdown', () => {
                    
                    this.player.IncreaseAnxiety(10);
                    console.log("Ansiedad: " + this.player.ansiedad); //debug
                    console.log(this.npcTalk);
                    this.scene.start('dialogueScene', { npc: this.npcTalk, fondo: this.mode, modo: this.modo})
                }); //cambiar a escena dialogo
                
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


            


            //MOSTRAR ANSIEDAD
            this.anxietyText = this.add.text(
                this.sys.game.canvas.width / 7,   // Coordenada X: centrado horizontalmente
                this.sys.game.canvas.height / 6,
                `Ansiedad: ${this.player.ansiedad}`,
                {
                    fontSize: '100px', 
                    color: '#999999',       // Gris
                    fontFamily: 'Georgia',
                });
                this.anxietyText.setStroke('#000000', 8);  // Trazo negro, puedes ajustar el grosor o eliminarlo
                this.anxietyText.setOrigin(0.5, 0);
                this.anxietyText.setScale(0.6);



            //BACK BUTTON
            const backScene = this.add.image(
                this.sys.game.canvas.width / 12,
                this.sys.game.canvas.height / 1.2, 
                'flecha')
            .setScale(-0.3, 0.3)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('zonaScene', { modo: data.modo}));

            





        // botones para testeo
        let combatButton = this.add.rectangle(
            this.sys.game.canvas.width / 1.2,
            this.sys.game.canvas.height / 5, 
            50, 50, 0xff0000)
        .setInteractive()
        .setScale(4, 2)
        .on('pointerdown', () => this.scene.start('CombatScene'));

         // Texto para mostrar "Ansiedad" en el centro del botón
        let combatText = this.add.text(
            combatButton.x,   // Colocar en la misma X del botón
            combatButton.y,   // Colocar en la misma Y del botón
            `COMBATE`,
            {
                fontSize: '32px',  // Cambia el tamaño del texto según el espacio
                color: '#ffffff',  // Gris
                fontFamily: 'Georgia',
                fontStyle: 'bold',
                align: 'center'    // Centrar el texto internamente
            }
        );

        // Centrar el texto en el botón
        combatText.setOrigin(0.5, 0.5);

    }

    update(){
        // Actualiza el texto con el nuevo valor de la variable
        this.anxietyText.setText(`Ansiedad: ${this.player.ansiedad}`);
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