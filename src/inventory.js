
export default class Inventory 
{
        constructor() {
            this.tam = 20; // Tamaño del inventario
            this.elems = []; // Array vacío de elems
           this.index=0;//indeice de la pos hasta donde hay elems en el array
            
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
        console.log(item)
        const existingItem = this.elems.find(i => i.name === item.name);
        if (existingItem) {
            existingItem.cantidad++; // Incrementar la cantidad si ya existe
        } else {
            if (this.elems.length < this.tam) {
                this.elems.push({ ...item, cantidad: 1 }); // Agregar un nuevo ítem con cantidad inicial 1
            } else {
                console.log("Inventario lleno.");
            }
        }

        this.logInventory();
    }

    RemoveItem(item) {
        const index = this.elems.findIndex(i => i.name === item.name);
        if (index !== -1) {
            if (this.elems[index].cantidad > 1) {
                this.elems[index].cantidad--; // Reducir la cantidad
            } else if(this.elems[index].cantidad = 1){
                this.elems.splice(index, 1); // Eliminar el ítem si la cantidad llega a 0
            }
            this.logInventory();
        } else {
            console.log("El item no está en el inventario.");
        }
    }

    logInventory() {
        console.log("Inventario actualizado:");
        this.elems.forEach(item => {
            console.log(`${item.name} (Cantidad: ${item.cantidad})`);
        });
    }

    GetItems() {
        return this.elems;
    }
    
    GetTrozos()
    {
        const trozo = this.elems.find(i => i.name === "trozo");
        if (trozo==null||trozo==0){return 0}
        else{return trozo.cantidad}
    }
   
}