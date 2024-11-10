import Item from '../src/item.js'
import Inventory from '../src/inventory.js'
export default class PickScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "PickScene"});
    }


    init(){

    }

    preload()//cargar imagenes*
    {
        this.load.image('hamburguesa', 'assets/hamburguesa.jpg'); 
        this.load.image('patatas', 'assets/patatas.jpg'); 
    }

    create(){ 
        //instanciar cosas

    // botones para ir a inventario
    const backScene = this.add.rectangle(150, 300, 100, 50, 0xff0000)
    .setInteractive()
    .on('pointerdown', () => this.scene.start('InventoryScene'));

        this.inventario = new Inventory();  // Creamos un inventario

        

        this.hamburguesa= new Item(this,'hamburguesa','cura 3 de vida',1,50,50,3);//creamos item
        console.log(this.hamburguesa.name+this.hamburguesa.description);
        this.hamburguesa.setDisplaySize(50, 50);//ajustamos tam
        this.hamburguesa.setInteractive(); // Habilitar interactividad
        this.hamburguesa.on('pointerdown', () => { //evento para detectar el raton
            this.Pick(this.hamburguesa); 
        });

        this.hamburguesa2= new Item(this,'hamburguesa','cura 3 de vida',1,150,50,3);//creamos item
        console.log(this.hamburguesa2.name+this.hamburguesa2.description);
        this.hamburguesa2.setDisplaySize(50, 50);//ajustamos tam
        this.hamburguesa2.setInteractive(); // Habilitar interactividad
        this.hamburguesa2.on('pointerdown', () => { //evento para detectar el raton
            this.Pick(this.hamburguesa2); 
        });

    this.patatas= new Item(this,'patatas','quita 3 de ansiedad',1,100,50,3);//creamos item
    console.log(this.patatas.name+this.patatas.description);
    this.patatas.setDisplaySize(50, 50);//ajustamos tam
    this.patatas.setInteractive(); // Habilitar interactividad
    this.patatas.on('pointerdown', () => { //evento para detectar el raton
        this.Pick(this.patatas); 
    });

    
    this.patatas2= new Item(this,'patatas','quita 3 de ansiedad',1,200,50,3);//creamos item
    console.log(this.patatas2.name+this.patatas2.description);
    this.patatas2.setDisplaySize(50, 50);//ajustamos tam
    this.patatas2.setInteractive(); // Habilitar interactividad
    this.patatas2.on('pointerdown', () => { //evento para detectar el raton
        this.Pick(this.patatas2); 
    });
       // Guardas el inventario en el registro global
       this.registry.set('inventario', this.inventario); 

    }

    update(){
        
    }

    Pick(item)
    {
        
        item.destroy();
        this.inventario.AddItem(item); // Agregar el item al inventario
    }

   
    
}