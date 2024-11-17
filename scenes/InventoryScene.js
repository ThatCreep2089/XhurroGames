
export default class InventoryScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "InventoryScene"});
    }


    init(data) {
       
        this.inventario = data.inventario; // Recibe el inventario del objeto `data`

    if (this.inventario) {
        console.log('Inventario recibido:', this.inventario);
    } else {
        console.error('El inventario no fue recibido.');
    }
    
    }

    preload()//cargar imagenes*
    {
        this.load.image('inventory', 'assets/fondos/FondoInventario.jpg'); 
        this.load.image('hamburguesa', 'assets/other/hamburguesa.jpg'); 
        this.load.image('patatas', 'assets/other/patatas.jpg'); 
    }

    create(data){ 
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
        let titulo = this.add.text(0, this.sys.game.canvas.height/50,
        "INVENTARIO");
        titulo.setFontSize(100);
        titulo.setStroke('#800080', 3);
        titulo.x = this.sys.game.canvas.width/2 - titulo.width/2;    

                const items = this.inventario.GetItems(); // Obtiene los ítems del inventario

                let fila = 0;
                let columna = 0;
                const numColumnas = 5;
                const margin = 10; 
                const cellSize = 200;
                const verticalOffset = 200;
                const horizontalOffset = 300;
            
                items.forEach((item, index) => {
                    console.log("Descripción del item:", item.description);
                    
                    const x = columna * (cellSize + margin) + horizontalOffset;
                    const y = fila * (cellSize + margin) + verticalOffset;
                    
                    let sprite = this.add.image(x, y, item.name).setOrigin(0, 0);
                    sprite.setDisplaySize(200, 200); // Ajusta el tamaño del ítem
                
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
                    let texto = this.add.text(950, 500, "¿Utilizar"+ " "+item.name+"?\nCantidad: " + item.ejemplar + "\n" + item.description, {
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
                    }).setOrigin(0.5, 0.5).setVisible(false);  // Centrado y oculto
                
                    // Cuando el sprite es clickeado, hacer visible los elementos
                    sprite.on('pointerdown', () => {
                        rect.setVisible(true);
                        rect0.setVisible(true);
                        rect2.setVisible(true);
                        texto.setVisible(true);
                        texto2.setVisible(true);
                        texto3.setVisible(true);
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
                        this.Remove(item); // Eliminar el item
                        console.log(item.ejemplares);
                        
                        rect.setVisible(false);
                        rect0.setVisible(false);
                        rect2.setVisible(false);
                        texto.setVisible(false);
                        texto2.setVisible(false);
                        texto3.setVisible(false);
                    });
                
                    // Lógica de avance de columna y fila fuera del evento `pointerdown`
                    columna++;
                    if (columna >= numColumnas) {
                        columna = 0;
                        fila++;
                    }
                });
        
        //BACK BUTTON (VOLVER A ZONA SCENE)
        const backScene = this.add.image(
            this.sys.game.canvas.width / 12,
            this.sys.game.canvas.height / 1.2, 
            'flecha')
        .setScale(-0.3, 0.3)
        .setInteractive()
        .on('pointerdown', () => this.scene.start('zonaScene', { modo: data.modo}));


    }
    
   Remove(item)
    {
        
        this.inventario.UseItem(item.effect ,item,); //si utilizamos el item despues lo quitamos del inventario
        this.inventario.RemoveItem(item);//quita el item del inventario
        if (item.ejemplares === 0) {
            sprite.setVisible(false); // Hacer invisible si no quedan ejemplares
        }
    }  
        
        
    
}
