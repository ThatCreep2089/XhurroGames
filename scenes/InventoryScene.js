import Player from "../src/Player.js";
import Inventory from "../src/inventory.js";    
export default class InventoryScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "InventoryScene"});
        this.itemSprites = []; //array donde guardamos los items a renderizar
    }


    init(data) {
      
        
        this.lastScene = data.lastScene;
        this.inventoryConfig = data.inventory; // Recibe el inventario de data
        this.playerConfig= data.player;
        this.modo= data.modo;
        console.log('lastScene', data.lastScene);
        console.log("modo",data.modo);
    
    }

    preload()//cargar imagenes*
    {
    }


    create(){ 

        //Creamos player
        this.player= new Player(this,0,0);
        this.player.init(this.playerConfig);

        //Creamos inventario
        this.inventory= new Inventory(this);
        this.inventory.init(this.inventoryConfig);

        //Pintamos un fondo
        var back = this.add.image(0, 0, 'inventory').setOrigin(0, 0);

        //escalar el fondo
        var scaleX = this.cameras.main.width / back.width;
        var scaleY = this.cameras.main.height / back.height;

        var scale = Math.min(scaleX, scaleY);

        back.setScale(scale);

        back.setPosition(
            this.cameras.main.width / 2 - back.displayWidth / 2,
            this.cameras.main.height / 2 - back.displayHeight / 2
        );

   

        // Mostramos texto de INVENTARIO
        let titulo = this.add.text(0, this.sys.game.canvas.height/15,
        "INVENTARIO");
        titulo.setFontSize(100);
        titulo.setStroke('#000000', 7);
        titulo.x = this.sys.game.canvas.width/2 - titulo.width/2;    

        //renderizamos inventario
        this.RenderizarItems();
        
        //BACK BUTTON (VOLVER A ZONA SCENE)
        var backScene;
        backScene = this.add.image(
            this.sys.game.canvas.width / 12,
            this.sys.game.canvas.height / 1.2, 
            'flechaa')
        .setScale(-0.3, 0.3)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start(this.lastScene, { 
                player: this.player.getConfigData(),
                inventory: this.inventory.getConfigData(),
                modo: this.modo
            });
        });


    }
    
   Remove(item)
    {
        
       this.UseItem(item.effect ,item,this.player); //si utilizamos el item despues lo quitamos del inventario
        this.inventory.RemoveItem(item);//quita el item del inventario
        this.RenderizarItems();//renderizar inventario
    
    }  
    
    //utilizamos el effecto del item
    UseItem(effect, item, player) {
        console.log("item"+item.name);
        switch (effect) {
            case 1:
               player.HealPlayer(item.amount);
                break;
            case 2:
               player.MaxLife(item.amount);
                break;
            case 3:
                player.LessAnxiety(item.amount);
                break;
            case 4:
                player.HealQuality(item.amount);
        }
    }   

    RenderizarItems()
    {
       // Eliminar solo los sprites de los ítems 
    this.itemSprites.forEach(sprite => {
        sprite.destroy();
    });

    // Limpiar la lista de sprites
    this.itemSprites = [];

    console.log(this.inventory.GetItems())

    let items = this.inventory.GetItems(); // Obtiene los ítems del inventario

    //posiciones y tamaños donde se situan los items
    let fila = 0;
    let columna = 0;
    const numColumnas = 5;
    const margin = 20; 
    const cellSize = 300;
    const verticalOffset = 200;
    const horizontalOffset = 100;

    console.log("antesforeash")
    items.forEach((item, index) => {
        console.log("dentrofroeach")
        console.log("Descripción del item:", item.description);

        const x = columna * (cellSize + margin) + horizontalOffset;
        const y = fila * (cellSize + margin) + verticalOffset;

        //creamos el sprite segun el nombre del itema
        let sprite = this.add.image(x, y, item.name).setOrigin(0, 0);
        sprite.setDisplaySize(450, 300); // Ajusta el tamaño del ítem

        sprite.setInteractive(); // Hacer el sprite interactivo

        // Crear el rectángulo de fondo con la información
        const rect0 = this.add.rectangle(950, 500, 600, 400, 0xf6f6f6).setOrigin(0.5); // Rectángulo de fondo centrado

        // Crear los botones (rectángulos con texto)
        const rect = this.add.rectangle(1150, 650, 100, 50, 0xff0000).setInteractive();
        const rect2 = this.add.rectangle(750, 650, 100, 50, 0x00ff00).setInteractive();

        // Inicialmente, todo está invisible
        rect.setVisible(false);
        rect0.setVisible(false);
        rect2.setVisible(false);

        // Crear los textos, también invisibles al principio
        let texto = this.add.text(950, 500, "", {
            fontSize: '40px',
            fill: '#1c1c1c',
            align: 'center'
        }).setOrigin(0.5, 0.5).setVisible(false);  // Centrado y oculto

        let texto2 = this.add.text(1150, 650, "No", {
            fontSize: '40px',
            fill: '#1c1c1c',
            align: 'center'
        }).setOrigin(0.5, 0.5).setVisible(false);  // Centrado y oculto

        let texto3 = this.add.text(750, 650, "Sí", {
            fontSize: '40px',
            fill: '#1c1c1c',
            align: 'center'
        }).setOrigin(0.5, 0.5).setVisible(false);  

        texto.setDepth(2);
        texto2.setDepth(2);
        texto3.setDepth(2);
        rect0.setDepth(2);
        rect2.setDepth(2);
        rect.setDepth(2);

        // Cuando seleccionamos el sprite los hacemos visibles
        sprite.on('pointerdown', () => {
            rect.setVisible(true);
            rect0.setVisible(true);
            rect2.setVisible(true);
            texto.setVisible(true);
            texto2.setVisible(true);
            texto3.setVisible(true);
            // Actualizar el texto con la información del item
            texto.setText("¿Utilizar " + item.name + "?\nCantidad: " + item.cantidad + "\n" + item.description);
            sprite.setInteractive(false);  // Desactivar interactividad del sprite
        });

        // Si selecciono "No"
        rect.on('pointerdown', () => {
            rect.setVisible(false);
            rect0.setVisible(false);
            rect2.setVisible(false);
            texto.setVisible(false);
            texto2.setVisible(false);
            texto3.setVisible(false);
        });

        // Si selecciono "Sí"
        rect2.on('pointerdown', () => {
            // Hacer efecto al seleccionar "Sí"
            console.log("he seleccinado si")
            console.log(this.inventory)
            this.Remove(item);
            if (item.cantidad === 0) {
                sprite.setVisible(false);
            }

            rect.setVisible(false);
            rect0.setVisible(false);
            rect2.setVisible(false);
            texto.setVisible(false);
            texto2.setVisible(false);
            texto3.setVisible(false);
        });

        // Guardamos el sprite en la lista para destruirlo después
        this.itemSprites.push(sprite);

        // Lógica de avance de columna y fila fuera del evento `pointerdown`
        columna++;
        if (columna >= numColumnas) {
            columna = 0;
            fila++;
        }
    });
}
    
}
