import DialogText from "../src/dialog_plugin.js";
import Player from '../src/Player.js';
import Inventory from '../src/inventory.js';

export default class DialogueScene extends Phaser.Scene {
    constructor(){
        super({key: "dialogueScene"})
        this.dialog;
        this.jsonObject;
    }

    preload()
    {
    

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
            this.npc).setScale(this.dialogueJson[this.npc].scale);

        // 4.1. CASOS ESPECIALES:
       if(this.npc == 'PITIBANCO')
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
        if(this.npc == 'BOSS')
        {
            let lines;
            if(this.battleResult == true || this.dialogueJson[this.npc].derrotado == true) //elle ha ganado
            {
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

            if(this.npc == 'PITIBANCO')
            {
                //PORROS (BOTONES)
                //curar ansiedad
                this.addButtonToScene(4, 3, 0xff7c00, `CURAR ANSIEDAD`, this.fumarPorroAnsiedad);
                    
                //curar vida
                this.addButtonToScene(1.5, 3, 0x00fff3, `CURAR VIDA`, this.fumarPorroVida);
            }
            else if(this.npc == 'BOSS')
            {
                console.log(this.dialogueJson[this.npc].derrotado);
                if(this.battleResult == true && this.dialogueJson[this.npc].derrotado == false) //elle ha ganado
                {
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
                if(this.dialogueJson[this.npc].hablado != "true")
                {
                    this.addButtonToScene(2, 2, 0x2eff00, 'ACEPTAR OFRENDA', this.addRecompensa);
                }
                
            }
            
            //DEBUG BACK BUTTON
            const backScene = this.add.image(
                this.sys.game.canvas.width / 12,
                this.sys.game.canvas.height / 2, 
                'flecha')
            .setScale(-0.3, 0.3)
            .setInteractive()
            .on('pointerdown', () => 
            {
                this.dialogueJson[this.npc].hablado = "true";
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
        .setScale(6, 2)
        .on('pointerdown', () => {
            console.log("obtener recompensa");
            callback.call(this); 
        });
        // Texto para mostrar "Ansiedad" en el centro del botón
        let acceptText = this.add.text(
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
        acceptText.setOrigin(0.5, 0.5);
    }

    addRecompensa()
    {
        let recompensa = this.dialogueJson[this.npc].recompensa;
        console.log(recompensa);

        if (this.npc == "BOSS"){
            console.log(recompensa);
            this.addItemToScene(recompensa);
             
        }
        else {
            console.log("Añadir recompensa");
            
            this.player.mejorarCualidad(recompensa);
            console.log(this.player);
        }
    }

    fumarPorroAnsiedad() 
    {
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
    update(){
        if((this.npc == 'PITIBANCO'))
        {
            // Actualiza el texto con el nuevo valor de la variable
            this.anxietyText.setText(`Ansiedad: ${this.player.ansiedad}`);
            this.vidaText.setText(`Vida actual: ${this.player.health}`);
        }
        
    }

}