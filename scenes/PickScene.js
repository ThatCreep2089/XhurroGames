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
        this.load.image('hamburguesa', 'assets/other/hamburguesa.jpg'); 
        this.load.image('patatas', 'assets/other/patatas.jpg'); 
    }

    create(){ 
        //instanciar cosas

    // botones para ir a inventario
    const backScene = this.add.rectangle(150, 300, 100, 50, 0xff0000)
    .setInteractive()
    .on('pointerdown', () => this.scene.start('InventoryScene', { inventario: this.registry.get('inventario') }));

   // Guardas el inventario en el registro global
   if (!this.registry.get('inventario')) {
    const inventario = new Inventory();
    this.registry.set('inventario', inventario);
   }

        

        this.hamburguesa= new Item(this,'hamburguesa','Cura 3 de vida',1,50,50,3);//creamos item
        console.log(this.hamburguesa.name+this.hamburguesa.description);
        this.hamburguesa.setDisplaySize(50, 50);//ajustamos tam
        this.hamburguesa.setInteractive(); // Habilitar interactividad
        this.hamburguesa.on('pointerdown', () => { //evento para detectar el raton
            this.Pick(this.hamburguesa); 
        });

        this.hamburguesa2= new Item(this,'hamburguesa','Cura 3 de vida',1,150,50,3);//creamos item
        console.log(this.hamburguesa2.name+this.hamburguesa2.description);
        this.hamburguesa2.setDisplaySize(50, 50);//ajustamos tam
        this.hamburguesa2.setInteractive(); // Habilitar interactividad
        this.hamburguesa2.on('pointerdown', () => { //evento para detectar el raton
            this.Pick(this.hamburguesa2); 
        });

    this.patatas= new Item(this,'patatas','Quita 3 de ansiedad',1,100,50,3);//creamos item
    console.log(this.patatas.name+this.patatas.description);
    this.patatas.setDisplaySize(50, 50);//ajustamos tam
    this.patatas.setInteractive(); // Habilitar interactividad
    this.patatas.on('pointerdown', () => { //evento para detectar el raton
        this.Pick(this.patatas); 
    });

    
    this.patatas2= new Item(this,'patatas','Quita 3 de ansiedad',1,200,50,3);//creamos item
    console.log(this.patatas2.name+this.patatas2.description);
    this.patatas2.setDisplaySize(50, 50);//ajustamos tam
    this.patatas2.setInteractive(); // Habilitar interactividad
    this.patatas2.on('pointerdown', () => { //evento para detectar el raton
        this.Pick(this.patatas2); 
    });
       

    }

    update(){
        
    }

    Pick(item)
    {
        
        const inventario = this.registry.get('inventario');
        if (inventario) {
        inventario.AddItem(item); // Agregar el item al inventario
        item.setVisible(false);
    }
}

   
    
}