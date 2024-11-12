
export default class InventoryScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "InventoryScene"});
    }


    init(data) {
        // Intenta obtener el inventario del registry
        this.inventario = this.registry.get('inventario');
        
        // Verifica si inventario es undefined o null
        if (this.inventario) {
            console.log('Inventario recibido:', this.inventario);
        } else {
            console.log('Inventario no encontrado en el registry.');
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

        // Número de filas y columnas
        this.numFilas = 5;
        this.numColumnas = 10;

        let margin = 10; // Margen de separación entre las imágenes
        let cellSize =200; // Tamaño de cada celda (puedes ajustarlo si es necesario)
        let verticalOffset = 1 * (cellSize + margin); // Desplazamiento vertical adicional

        // Crea la cuadrícula de 5x10 en un array bidimensional
        this.cuadricula = Array.from({ length: this.numFilas }, () => Array(this.numColumnas).fill(null));
        // Llenamos la celda correspondiente con los valores

        let fila=0;
        let columna=0;
        console.log('antes de array');
        console.log(this.inventario.index);
        for (let j = 0; j < this.inventario.index; j++) {
            console.log('dentro inventario para recorrer');
                    // Coloca los items en la cuadrícula
                    console.log(`Colocando ${this.inventario.elems[j].name} en (${fila}, ${columna})`);
                    this.itemSprite=  this.add.image(fila * (cellSize + margin) , columna * (cellSize + margin)+verticalOffset ,this.inventario.elems[j].name).setOrigin(0,0);
                    // Ajusta el tamaño del sprite
                    this.itemSprite.setDisplaySize(200, 200);

                    this.descripcion=this.inventario.elems[j].descripcion;
                    this.ejemplares=this.inventario.elems[j].ejemplares;
                    this.itemSprite.setInteractive(); // Habilitar interactividad
                    /*this.itemSprite.on('pointerdown', () => { //evento para detectar el raton
                                    // botones para ir a inventario
                                    console.log(`Colocando ${this.inventario.elems[j].ejemplares} en (${fila}, ${columna})`);
                        this.use = this.add.rectangle(500, 300, 100, 50, 0xff0000).setInteractive();
                        const buttonText = this.add.text(500, 300, "¿Utilizar?"+this.descripcion+this.ejemplares,{
                            fontSize: '40px',
                            fill: '#800080', // Color del texto
                            align: 'center'
                        });
                        
                        this.use.on('pointerdown', () => {
                            //hago el efecto

                            //elimino el item
                            this.Remove(this.inventario.elems[j]);
                            console.log(this.ejemplares);
                            if(this.ejemplares==0)
                            {
                                this.inventario.elems[j].setVisible(false);
                            }
                        
                            

                        });
                    });*/
                    // Avanza a la siguiente columna
                    columna++;

                // Si llegamos al final de una fila (columna >= numColumnas), avanzamos a la siguiente fila
                if (columna >= this.numColumnas) {
                columna = 0;  // Reinicia la columna
                fila++;  // Pasa a la siguiente fila
                }
        
        }  
        
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
        
        //this.inventario.UseItem(1,item); //si utilizamos el item despues lo quitamos del inventario
        this.inventario.RemoveItem(item);//quita el item del inventario
       
    }  
        
        
    
}
