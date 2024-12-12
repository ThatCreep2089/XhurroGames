
export default class Inventory 
{
        constructor() {
            this.tam = 20; // Tamaño del inventario
            this.elems = []; // Array vacío de elems
           this.index=0;//indice de la pos hasta donde hay elems en el array
            
        }
   
        init (config)
        {
            this.elems= config.elems;
            this.tam= config.tam;
            this.index= config.index;
      
      
        }


        getConfigData()
        {
            return{
                elems: this.elems,
                tam: this.tam,
                index:this.index
            }

        }


    //Añadir item
    AddItem(item)
    {

        const existingItem = this.elems.find(i => i.name === item.name);//buscamos el item que tenga el nombre del que recibimos
        if (existingItem) {
            existingItem.cantidad++; // Incrementar la cantidad si ya existe
        } else {
            if (this.elems.length < this.tam) {
                this.elems.push({ ...item, cantidad: 1 }); 
                // Agregar el item con todas sus propiedades, con cantidad inicial 1
            
        }
        }

        //this.logInventory();
    }

    RemoveItem(item) {
        //buscamos el item que tenga el nombre del que recibimos
        const index = this.elems.findIndex(i => i.name === item.name);
        if (index !== -1) {
            if (this.elems[index].cantidad > 1) {
                this.elems[index].cantidad--; // Reducir la cantidad
            } else if(this.elems[index].cantidad = 1){
                this.elems.splice(index, 1); // Eliminar el ítem si la cantidad llega a 0
            }
            //this.logInventory();
        } 
    }

    //metodod para depurar y ver si se añaden bien las cantidades
    /*logInventory() {
        console.log("Inventario actualizado:");
        this.elems.forEach(item => {
            console.log(`${item.name} (Cantidad: ${item.cantidad})`);
        });
    }*/

    //devolvemos el array de elems
    GetItems() {
        return this.elems;
    }
    
    //devolvemos cuantos items que se llamen trozo hay
    GetTrozos()
    {
        const trozo = this.elems.find(i => i.name === "trozo");
        if (trozo==null||trozo==0){return 0}
        else{return trozo.cantidad}
    }
   
}