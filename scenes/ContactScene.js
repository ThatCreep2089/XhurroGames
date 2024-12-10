export default class ContactScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ContactScene' });
        
        
    }

init(data){
    this.modo= data.modo;
     //JSON DIALOGOS
     if(data.dialogueJson)
        {
            this.dialogueJson = data.dialogueJson;
        }
        else{
            this.dialogueJson = this.cache.json.get('dialogueJson');
        }
}

    preload() {
       
    }

    create(data) {

        const back = this.add.image(0, 0, 'fondoC')
        .setOrigin(0, 0)
        .setDisplaySize(this.sys.game.canvas.width, this.sys.game.canvas.height);
        
 // Mostramos texto de CONTACTOS
    let titulo = this.add.text(0, this.sys.game.canvas.height/15,
    "CONTACTOS");
    titulo.setFontSize(100);
    titulo.setStroke('#000000', 7);
    titulo.x = this.sys.game.canvas.width/2 - titulo.width/2;    

    let contacto;//para saber el color del contacto
        
         //leer mapa
         const jsonObject = this.cache.json.get('contactsJson');

         // Crear los detalles del contacto (inicialmente ocultos)
    this.rect0 = this.add.rectangle(950, 600, 900, 400, 0xf6f6f6).setOrigin(0.5).setVisible(false); // Fondo del texto
    this.rect = this.add.rectangle(1350, 750, 50, 50, 0xff0000).setInteractive().setVisible(false); // Botón cerrar

   
    //Texto con descripciones
    this.texto = this.add.text(950, 500, "", {//nomnre
        fontSize: '40px',
        fill: '#1c1c1c',
        align: 'center'
    }).setOrigin(0.5, 0.5).setVisible(false);

    this.texto2 = this.add.text(950, 550, "", {//edad
        fontSize: '40px',
        fill: '#1c1c1c',
        align: 'center'
    }).setOrigin(0.5, 0.5).setVisible(false);

    this.texto3 = this.add.text(950, 650, "", {//localizacion
        fontSize: '40px',
        fill: '#1c1c1c',
        align: 'center'
    }).setOrigin(0.5, 0.5).setVisible(false);

    this.texto4 = this.add.text(950, 600, "", {//descripcion
        fontSize: '40px',
        fill: '#1c1c1c',
        align: 'center'
    }).setOrigin(0.5, 0.5).setVisible(false);
   
// Asignar evento al botón cerrar
    this.rect.on('pointerdown', () => {
        // Ocultar todos los elementos al cerrar
        this.texto.setVisible(false);
        this.texto2.setVisible(false);
        this.texto3.setVisible(false);
        this.texto4.setVisible(false);
        this.rect0.setVisible(false);
        this.rect.setVisible(false);
    });
        //BARRIO: OBRERO
        if(this.modo == 1)
            {  const obrero = jsonObject["botellin"];
                
                obrero.npcs.forEach(npc => {
                    let name = npc.name.toUpperCase(); //guardar nombre del npc en mayusculas

                    let npcOb = this.dialogueJson[name]; //acceder al objeto npc especifico del dialogo json

                    if(npcOb.hablado == "true")
                    {
                        contacto = npc.name; // La imagen se toma del nombre del NPC
                        this.addContactToScene(npc, contacto);
                    }
                });
            }
        //BARRIO: RELIGIOSO
           
            else if(this.modo == 2)
            {const religioso = jsonObject["religioso"];
                religioso.npcs.forEach(npc => {
                if (npc.conocida) { // Comprobar si este NPC es conocido
                    contacto = npc.name; // La imagen se toma del nombre del NPC
                    this.addContactToScene(npc, contacto);
                }
                
            });
    
            }
        //BARRIO: NAVAJAS
            else if(this.modo == 3)
            {
                const navajas = jsonObject["navajas"];
                navajas.npcs.forEach(npc => {
                if (npc.conocida) { // Comprobar si este NPC es conocido
                    contacto = npc.name; // La imagen se toma del nombre del NPC
                    this.addContactToScene(npc, contacto);
                }
                
            });
    
            }
        //BARRIO: DINERO
            else if(this.modo == 4)
            {
                const dinero = jsonObject["dinero"];
                dinero.npcs.forEach(npc => {
                if (npc.conocida) { // Comprobar si este NPC es conocido
                    contacto = npc.name; // La imagen se toma del nombre del NPC
                    this.addContactToScene(npc, contacto);
                }
                
            });
            }
          
              //BACK BUTTON (VOLVER A GENERALCONTACS)
        var backScene;
        backScene = this.add.image(
            this.sys.game.canvas.width / 12,
            this.sys.game.canvas.height / 1.2, 
            'flechaa')
        .setScale(-0.3, 0.3)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('GeneralContactsScene');
        });


        }
   
    
    addContactToScene(npcs,contacto){  
        // Crear el sprite para el contacto
    this.spritePJ = this.add.image(
        npcs.posx* (this.sys.game.canvas.width / 16),
        npcs.posy*(this.sys.game.canvas.height / 9), 
        contacto // Imagen asociada
    )
    .setOrigin(0.5, 0.5)
    .setScale(0.5)
    .setInteractive();
    this.spritePJ.on('pointerdown', (() => {
        const currentNpc = npcs; // el npc actual
        return () => {
            // Actualizar y mostrar detalles específicos de este NPC
            this.texto.setText("Nombre: " + currentNpc.name).setVisible(true);
            this.texto2.setText("Edad: " + currentNpc.edad ).setVisible(true);
            this.texto4.setText("Descripción: " + currentNpc.descripcion ).setVisible(true);
            this.texto3.setText("Conocido en: " + currentNpc.localizacion ).setVisible(true);

            this.rect0.setVisible(true); // Fondo visible
            this.rect.setVisible(true); // Botón cerrar visible
            this.spritePJ.setDepth(0); // Sprite del NPC en el fondo
            this.rect0.setDepth(1);    // Fondo del texto encima del sprite
            this.rect.setDepth(1);    // Fondo del texto encima del sprite
            this.texto.setDepth(2);    // Texto por encima del fondo
            this.texto2.setDepth(2);
            this.texto3.setDepth(2);
            this.texto4.setDepth(2);
        };
    })());
    

    }
 
}
