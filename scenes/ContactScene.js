export default class ContactScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ContactScene' });
         
        
    }

init(data){
    //recibimos info que nos pasan
    this.modo= data.modo;
     //JSON DIALOGOS
     if(data.dialogueJson)
    {
        this.dialogueJson = data.dialogueJson;

    }
    else
    {
        this.dialogueJson = this.cache.json.get('dialogueJson');
    }

    this.playerConfig = data.player;
    this.inventoryConfig = data.inventory;

    this.lastScene = data.lastScene;
    this.barrio = data.barrio;

     
}
   //seteamos la visibilidad de rects, desde el primero(prin) hasta el ultimo(fin) y un estado (bool)
   RectVisivility(prin,fin,bool)
   {
       for( let i= prin;i<=fin;i++)
       {
           this.rects[i].setVisible(bool)
       }
   }

    //seteamos la visibilidad de textos, desde el primero(prin) hasta el ultimo(fin) y un estado (bool)
   TextVisivility(prin,fin,bool)
   {
       for( let i= prin;i<=fin;i++)
       {
           this.textos[i].setVisible(bool)
       }
   }
  
   //creacion de rectangulos
   CrearRect(x,y,w,h,color,origen)
   {
      let rect= this.add.rectangle(x,y,w,h,color,origen);
       return rect;
   }

    //seteamos la profundidad de rects
   SetDepthRect(prin,fin,num)
   {
       for( let i= prin;i<=fin;i++)
           {
               this.rects[i].setDepth(num);
           }
   }

    //seteamos la profundidad de textos
   SetDepthText(prin,fin,num)
   {
       for( let i= prin;i<=fin;i++)
           {
               this.textos[i].setDepth(num);
           }
   }

   //creacion de textos
   CrearText(x,y,string)
   {
    let text=this.add.text(x,y,string,{

        fontSize: '40px',
        fill: '#1c1c1c',
        align: 'center'
    });
    text.setOrigin(0.5, 0.5)
    text.setVisible(false);  
    return text;
   }

    create(data) {

        //pintamos el fondo
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

     //creamos arrays para guardar los textos y los rectangulos
     this.rects=[];
     this.textos=[];
   //set visible false
   this.rect0 = this.CrearRect(950, 600, 900, 400, 0xf6f6f6).setOrigin(0.5) // Fondo del texto
   this.rects.push(this.rect0);

   this.rect = this.CrearRect(1350, 750, 50, 50, 0xff0000).setInteractive(); // Botón cerrar
   this.rects.push(this.rect);
   this.RectVisivility(0,1,false);

   //Texto con descripciones inicialmente vacios
   this.texto = this.CrearText(950, 500, "");
   this.textos.push( this.texto);
   this.texto2 = this.CrearText(950, 550, "");
   this.textos.push( this.texto2);
   this.texto3 = this.CrearText(950, 650, "");
   this.textos.push( this.texto3);
   this.texto4 = this.CrearText(950, 600, "");
   this.textos.push( this.texto4);
    
    this.rect.on('pointerdown', () => {
        // Ocultar todos los elementos al cerrar el rect de cerrar
        this.RectVisivility(0,1,false);
        this.TextVisivility(0,3,false);
        
    });
        //BARRIO: BOTELLIN
        if(this.barrio == 1)
            {  
                const obrero = jsonObject["botellin"];
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

        //BARRIO: PORRAS
            else if(this.barrio == 2)
            {const religioso = jsonObject["porras"];
                religioso.npcs.forEach(npc => {
                if (npc.conocida) { // Comprobar si este NPC es conocido
                    contacto = npc.name; // La imagen se toma del nombre del NPC
                    this.addContactToScene(npc, contacto);
                }
                
            });
    
            }
        //BARRIO: NAVAJAS
            else if(this.barrio == 3)
            {
                const navajas = jsonObject["navajas"];
                navajas.npcs.forEach(npc => {
                if (npc.conocida) { // Comprobar si este NPC es conocido
                    contacto = npc.name; // La imagen se toma del nombre del NPC
                    this.addContactToScene(npc, contacto);
                }
                
            });
    
            }
        //BARRIO: CALDERILLA
            else if(this.barrio == 4)
            {
                const dinero = jsonObject["calderilla"];
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
            'flechaM')
        .setScale(-0.3, 0.3)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('GeneralContactsScene', {
                lastScene : this.lastScene,
                player: this.playerConfig,
                inventory: this.inventoryConfig,
                modo: this.modo,
                dialogueJson : this.dialogueJson
            });
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
            this.textos[0].setText("Nombre: " + currentNpc.name).setVisible(true);
            this.textos[1].setText("Edad: " + currentNpc.edad ).setVisible(true);
            this.textos[2].setText("Descripción: " + currentNpc.descripcion ).setVisible(true);
            this.textos[3].setText("Conocido en: " + currentNpc.localizacion ).setVisible(true);

            this.RectVisivility(0,1,true);
            this.spritePJ.setDepth(0); // Sprite del NPC en el fondo
            this.SetDepthRect(0,1,1);
            this.SetDepthText(0,3,2);
           
        };
    })());
    

    }
 
}
