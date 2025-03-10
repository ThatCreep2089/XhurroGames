import DialogText from "../src/dialog_plugin.js";
import Player from '../src/Player.js';
import Inventory from '../src/inventory.js';
import Item from '../src/item.js';

/**
 * Escena que maneja la creación, modificación y finalización de los diálogos.
 */

export default class DialogueScene extends Phaser.Scene {
    constructor(){
        super({key: "dialogueScene"})
        this.dialog;
        this.jsonObject;
    }


    init(data){
        // Usar el parámetro 'fondo' para decidir qué fondo cargar
        this.npc = data.npc || 'ELLIE';
        this.fondo = data.fondo || 'puente';
        this.ant = data.ant;

        //PLAYER E INVENTARIO
        this.playerConfig = data.player
        this.inventoryConfig = data.inventory

        //JSON DIALOGOS
        if(data.dialogueJson)
        {
            this.dialogueJson = data.dialogueJson;
            
        }
        else{
            this.dialogueJson = this.cache.json.get('dialogueJson');
        }

        //GANAR O PERDER
        this.battleResult = data.battleResult;

        
    }

    create(data){
        //creamos musica
        const music = this.sound.get('zoneMusic');
        const combatMusic = this.sound.get('combatMusic');
        //console.log(music);
        if (music) {
            
            music.resume();
        }
        if(combatMusic) combatMusic.stop();
        
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
        
        // 2. NOMBRE DEL NPC
        this.nombreNPC = this.add.text(
            this.sys.game.canvas.width / 2,   // coordenada x
            this.sys.game.canvas.height / 12, // coordenada y
            this.npc, //frase
            { 
                fontSize: '100px', 
                color: '#999999',       // Gris
                fontFamily: 'Georgia',  
            }
        );
        this.nombreNPC.setStroke('#000000', 8);  // Trazo negro
        this.nombreNPC.setOrigin(0.5, 0);
        this.nombreNPC.setScale(0.8);

        // 3. DESCRIPCION DEL NPC

        // 4. IMAGEN NPC
       
        let npcImage = this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 1.5,
            this.npc)
            .setScale(this.dialogueJson[this.npc].scale);

        // 4.1. CASOS ESPECIALES:
       if(this.dialogueJson[this.npc].isPitiBanco == true)
        {
             //debug (para probar si funciona curar)
             //this.player.takeDamage(50);
             
             // 2.9 MOSTRAR ANSIEDAD
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
             
             // 2.9 MOSTRAR VIDA ACTUAL
             this.vidaText = this.add.text(
                 this.sys.game.canvas.width / 1.3,   // Coordenada X: centrado horizontalmente
                 this.sys.game.canvas.height / 6,
                 `Vida actual: ${this.player.health}`,
                 {
                     fontSize: '100px', 
                     color: '#999999',       // Gris
                     fontFamily: 'Georgia',
                 });
                 this.vidaText.setStroke('#000000', 8);  // Trazo negro, puedes ajustar el grosor o eliminarlo
                 this.vidaText.setOrigin(0.5, 0);
                 this.vidaText.setScale(0.6);
        }

        // 5. LEER DIALOGOS
        if(this.dialogueJson[this.npc].isBoss == true)
        {
            let lines;
            if(this.battleResult == true || this.dialogueJson[this.npc].derrotado == true) //elle ha ganado
            {
                if(this.npc == 'YUSOA') music.stop();
                lines = this.dialogueJson[this.npc].victory;
            }
            else if(this.battleResult == false) //elle ha perdido
            {
                lines = this.dialogueJson[this.npc].lose;
            }
            else //elle todavia NO ha batallado
            {
                lines = this.dialogueJson[this.npc].frases;
            }
            this.addDialogue(lines);
        }
        else{
            this.addDialogue(this.dialogueJson[this.npc].frases);
        }
        

        // Avanza de línea al hacer clic
        this.input.on('pointerdown', () => {
            this.dialog.nextLine();
        });

        // Cuando se termina el dialogo...
        this.dialog.on('dialogComplete', () => {

            //console.log("dialogo completado")
            if(this.dialogueJson[this.npc].isPitiBanco == true)
            {
                //PORROS (BOTONES)

                if(this.dialogueJson[this.npc].curarAnsiedad == "true")
                {
                //curar ansiedad
                this.addButtonToScene(4, 3, 0xff7c00, `CURAR ANSIEDAD`, this.fumarPorroAnsiedad);
                }
                else
                {
                    this.dialog.setText(this.dialogueJson[this.npc].fumado, true);
                }

                if(this.dialogueJson[this.npc].curarVida == "true")
                {
                //curar vida
                this.addButtonToScene(1.5, 3, 0x00fff3, `CURAR VIDA`, this.fumarPorroVida);
                }
                else
                {
                    this.dialog.setText(this.dialogueJson[this.npc].fumado, true);
                }
                    
                
            }
            else if(this.dialogueJson[this.npc].isBoss == true)
            {
                if(this.battleResult == true && this.dialogueJson[this.npc].derrotado == false) //elle ha ganado
                {
                    
                    if(this.npc == "YUSOA")
                    {
                        //llamar a escena final
                        this.scene.start('endGameScene');
                    }
                    //mostrar recompensa
                    this.addButtonToScene(2, 2, 0x2eff00, 'ACEPTAR OFRENDA', this.addRecompensa);
                    this.dialogueJson[this.npc].derrotado = true;
                }
                else if(this.dialogueJson[this.npc].derrotado != true) //elle todavia NO ha batallado o ha perdido
                {
                    this.addButtonToScene(1.2, 5, 0xff0000, 'COMBATE', this.mostrarCombate);
                }
                
            }
            else
            {
                if(this.dialogueJson[this.npc].hablado != "true" && this.npc != "ELLIE")
                {
                    this.addButtonToScene(2, 2, 0x2eff00, 'ACEPTAR OFRENDA', this.addRecompensa);
                    this.dialogueJson[this.npc].hablado = "true";
                    
                }
                
            }
            
            //DEBUG BACK BUTTON
            const backScene = this.add.image(
                this.sys.game.canvas.width / 12,
                this.sys.game.canvas.height / 2, 
                'flechaM')
            .setScale(-0.3, 0.3)
            .setInteractive()
            .on('pointerdown', () => 
            {
                if(this.npc == 'ELLIE'){
                    this.scene.start('zonaScene');
                }
                else{
                    this.scene.start('localizationScene',{
                        fondo: data.fondo,
                        ant: this.ant,
                        player: this.player.getConfigData(), 
                        inventory: this.inventory.getConfigData(),
                        dialogueJson: this.dialogueJson
                    });
                }
                
            });

        });

       

    }

    addDialogue(frases)
    {
        //TEXTO DIALOGO
        this.dialog = new DialogText(this, {
            borderThickness: 10,
            borderColor: 0x5a5a5a,
            borderAlpha: 1,
            windowAlpha: 0.9,
            windowColor: 0x212121,
            windowHeight: 150,
            padding: 32,
            closeBtnColor: 'Georgia',
            dialogSpeed: 3,
            fontSize: 50,
            fontFamily: "pixel"
        });
        
        this.dialog.startDialog(frases);
    }

    addButtonToScene(x, y, color, text, callback)
    {
        let button = this.add.rectangle(
            this.sys.game.canvas.width / x,
            this.sys.game.canvas.height / y, 
            50, 50, color)
        .setInteractive()
        .setScale(6, 2);

        // Texto para mostrar texto en el centro del botón
        let buttonText = this.add.text(
            button.x,   // Colocar en la misma X del botón
            button.y,   // Colocar en la misma Y del botón
            text,
            {
                fontSize: '25px',  // Cambia el tamaño del texto según el espacio
                color: '#000000',  // Negro
                fontFamily: 'Georgia',
                fontStyle: 'bold',
                align: 'center'    // Centrar el texto internamente
            }
        );

        // Centrar el texto en el botón
        buttonText.setOrigin(0.5, 0.5);

        //evento
        button.on('pointerdown', () => {
            callback.call(this);  // Ejecuta la función asociada
            button.destroy();
            buttonText.destroy();
        });
    }

    addRecompensa()
    {
        let recompensa = this.dialogueJson[this.npc].recompensa;
        //console.log(recompensa);

        if (this.dialogueJson[this.npc].isBoss == true){
           // console.log(recompensa);
           // console.log(recompensa.name)
            this.addItemToScene(recompensa);
        }
        else {
            //le.log("Añadir recompensa");
            
            this.player.mejorarCualidad(recompensa);
            //console.log(this.player);

            // Crear texto temporal
            const mensaje = this.add.text( this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, recompensa + ": +1", {
                font: '40px Arial',
                fill: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 },
                align: 'center'
            }).setOrigin(0.5);

            // Destruir el texto después de 4 segundos (4000 ms)
            this.time.delayedCall(4000, () => {
                mensaje.destroy();
            });
        }
    }

    fumarPorroAnsiedad() 
    {
        //console.log("entra en fumar porro")
        //console.log(this.dialogueJson[this.npc].curarAnsiedad)
        if(this.dialogueJson[this.npc].curarAnsiedad == "true")
        {
            this.player.LessAnxiety(this.player.ansiedad); //le quita toda la ansiedad
            this.dialogueJson[this.npc].curarAnsiedad = "false";
        }
        else{
            this.dialog.setText(this.dialogueJson[this.npc].fumado, true);
        } 
    }

    fumarPorroVida()
    {
        if(this.dialogueJson[this.npc].curarVida == "true")
            {
                var diff = this.player.maxHealth - this.player.health; //lo que le falta para estar al maximo
                this.player.HealPlayer(diff);
                this.dialogueJson[this.npc].curarVida = "false";
            }
            else
            {
                this.dialog.setText(this.dialogueJson[this.npc].fumado, true);
            }
    }


    mostrarCombate()
    {
        this.sound.get('zoneMusic').pause();
        this.scene.start('CombatScene', {
            ant: this.ant,
            player: this.player.getConfigData(), 
            inventory: this.inventory.getConfigData(),
            npc: this.npc,
            fondo: this.fondo,
            dialogueJson: this.dialogueJson
        })
    }

    
    addItemToScene(item)
    {
        if(item.recogido == "false")
        {
           let newItem= new Item(this, item.name, item.description, item.effect, item.x, item.y, item.amountOfEffect);//creamos item
           newItem.setScale(0.3);//ajustamos tam
           newItem.setInteractive(); // Habilitar interactividad
      
            //evento boton
            newItem.on('pointerdown', () => { //evento para detectar el raton
                item.recogido = "true";
                this.Pick(newItem); //recoger item (meter en inventario) y quitar de escena
            });
            newItem.on('pointerover', () => newItem.setTint(0x4ec647)) //para que se ponga rojo cuando el raton está encima
            newItem.on('pointerout', () =>newItem.clearTint());
    
        }
        
    }

    Pick(item)
    {
        //console.log(item.name)
        if (this.inventory) {
            this.inventory.AddItem(item); // Agregar el item al inventario
            item.setVisible(false);
        }
    }


    update(){
        if(this.dialogueJson[this.npc].isPitiBanco == true)
        {
            // Actualiza el texto con el nuevo valor de la variable
            this.anxietyText.setText(`Ansiedad: ${this.player.ansiedad}`);
            this.vidaText.setText(`Vida actual: ${this.player.health}`);
        }
        
    }

}