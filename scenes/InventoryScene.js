/* Escena que sirve para mostrar visualmente los items del inventario
Tiene metodos para utilizar los items, rectangulos y textos para mostar informacion como
cantidad, nombre y si se desea utiliza*/
import Player from "../src/Player.js";
import Inventory from "../src/inventory.js";    
export default class InventoryScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "InventoryScene"});
        this.itemSprites = []; //array donde guardamos los items a renderizar
          //creamos arrays para guardar los textos y los rectangulos
        this.rects=[];
        this.textos=[];
    }


    init(data) {
      
        //recibimos valores del data
        this.lastScene = data.lastScene;
        this.inventoryConfig = data.inventory; // Recibe el inventario de data
        this.playerConfig= data.player;
        this.modo= data.modo;
 
    
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

        //establecemos una posición
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
            'flechaM')
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
        if(item.name!="trozo")
        {
            this.UseItem(item.effect ,item,this.player); //utilizar el item, el trozo de constitucion no tiene usabilidad
        }
        this.inventory.RemoveItem(item);//quita el item del inventario
        this.RenderizarItems();//renderizar inventario
    
    }  
    
    //utilizamos el efecto del item
    UseItem(effect, item, player) {

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
                break;
        }
    } 
    
     //seteamos la visibilidad de rects, desde el primero(prin) hasta el ultimo(fin) y un estado (bool)
    RectVisivility(prin,fin,bool)
    {
        for( let i= prin;i<=fin;i++)
        {
            console.log(this.rects[i].setVisible(bool))
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
     }).setOrigin(0.5, 0.5).setVisible(false);  
     return text;
    }

    RenderizarItems()
    {
       // cada vez que renderizo el inventario hago un primer barrido para eliminar los anteriores y 
       //renderizarlos en las nuevas posiciones
    this.itemSprites.forEach(sprite => {
        sprite.destroy();
    });

 
    // Limpiar la lista de sprites
    this.itemSprites = [];

    let items = this.inventory.GetItems(); // Obtiener los ítems del inventario

    //posiciones y tamaños donde se situan los items
    let fila = 0;
    let columna = 0;
    const numColumnas = 5;
    const margin = 20; 
    const cellSize = 300;
    const verticalOffset = 200;
    const horizontalOffset = 100;

    //para cada item del inventario creamos un sprite
    items.forEach((item, index) => {

        const x = columna * (cellSize + margin) + horizontalOffset;
        const y = fila * (cellSize + margin) + verticalOffset;

        //creamos el sprite segun el nombre del itema
        let sprite = this.add.image(x, y, item.name).setOrigin(0, 0);
        sprite.setDisplaySize(450, 300); // Ajusta el tamaño del ítem
        sprite.setInteractive(); // Hacer el sprite interactivo


        // Crear el rectángulo de fondo con la información
        let rect0=this.CrearRect(950, 500, 600, 400, 0xf6f6f6);
        rect0.setOrigin(0.5);
        this.rects.push(rect0);
    

        // Crear los botones (rectángulos con texto)
            let rect1 = this.CrearRect(1150, 650, 100, 50, 0xff0000);//RECT DEL NO
            rect1.setInteractive();
            this.rects.push(rect1);
            
            let rect2 = this.CrearRect(750, 650, 100, 50, 0x00ff00);//RECT DEL SI
            rect2.setInteractive();
            this.rects.push(rect2);
           
            if(item.name=="trozo")
            {
                rect2.disableInteractive();
            }

            this.RectVisivility(0,2,false);

            //Texto opción NO
            let texto2 = this.CrearText(1150, 650, "No");
            this.textos.push(texto2);
            
            //Texto opción SI
            let texto3 = this.CrearText(750, 650, "Sí");
            this.textos.push(texto3);

            // texto que rellenaremos con info más tarde
            let texto = this.CrearText(950, 500, "", );
            this.textos.push(texto);

            //establecemos el orden de las capas con el depth
            this.SetDepthRect(0,2,1);
            this.SetDepthText(0,2,2);//2

            this.TextVisivility(0,2,false);
           

        // Cuando seleccionamos el sprite los hacemos visibles
        sprite.on('pointerdown', () => {
        
            this.RectVisivility(0,2,true);
            this.TextVisivility(0,2,true);
             
            // Actualizar el texto con la información del item
            if(item.name!="trozo")
            {
                texto.setText("¿Utilizar " + item.name + "?\nCantidad: " + item.cantidad + "\n" + item.description);
            }
            else
            {
                texto.setText("No se puede utilizar el " + item.name + "\nCantidad: " + item.cantidad + "\n" + item.description);

            }
           
            sprite.setInteractive(false);  // Desactivar interactividad del sprite
        });

        // Si selecciono "No"
        rect1.on('pointerdown', () => {
            this.RectVisivility(0,2,false);
            this.TextVisivility(0,2,false);
            
           
        });

        // Si selecciono "Sí"
        rect2.on('pointerdown', () => {

            // Hacer efecto al seleccionar
            this.Remove(item);

            //cuando no tenga mas de ese item lo hago transparente
            if (item.cantidad === 0) {
                sprite.setVisible(false);
            }
            this.RectVisivility(0,2,false);
            this.TextVisivility(0,2,false);
          
        });

        // Guardamos el sprite en la lista para destruirlo después
        this.itemSprites.push(sprite);

        // avanzamos de columna
        columna++;
        if (columna >= numColumnas) {
            columna = 0;
            fila++;
        }
    });
}
    
}
