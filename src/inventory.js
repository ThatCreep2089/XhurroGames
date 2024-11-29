
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

        //mirar si ya tengo ese item lo añado al slot aumentando la cantidad
        var i=0;
        var encontrado=false;
        while(i<this.index &&!encontrado)
        {
             if(this.elems[i].name === item.name)//aumentamos el contador para aumentar la cantidad de elementos de ese tipo
            {
                this.elems[i].ejemplar++;
                console.log("aumento elem"+item.name+" "+item.ejemplar)
                console.log("Lista actual de elementos en el inventario:");
                for (let j = 0; j < this.elems.length; j++) {
                    console.log(this.elems[j].name + " (Cantidad: " + this.elems[j].ejemplar + ")");
                }
                encontrado=true;
            }
            i++;
        }
        if(!encontrado)//primera vez que metemos un item de ese tipo en el inventario
        {
            
            this.elems.push(item); // Añadir el nuevo item al inventario
            
            console.log("Lista actual de elementos en el inventario:");
            for (let j = 0; j < this.elems.length; j++) {
                console.log(this.elems[j].name + " (Cantidad: " + this.elems[j].ejemplar + ")");
            }
            
            this.index++;
            
    }
        }
        










    RemoveItem(item)
    {
        const pos = this.elems.findIndex(e => e.name === item.name); // Encontrar el índice del item
   
        // Verificar si el índice es válido (es decir, el item existe en el inventario)
    if (pos !== -1) {
        if (this.elems[pos].ejemplar > 1) {
            this.elems[pos].ejemplar--; // Decrementar la cantidad
        } else {
            this.elems.splice(pos, 1); // Eliminar el item
            this.index--;
        }

        console.log("Lista actual de elementos en el inventario:");
        for (let j = 0; j < this.elems.length; j++) {
            console.log(this.elems[j].name + " (Cantidad: " + this.elems[j].ejemplar + ")");
        }
    } else {
        // Si el índice no es válido, significa que el item no fue encontrado
        console.log("Item no encontrado en el inventario.");
    }

    }

    GetItems() {
        return this.elems; // Devuelve todos los ítems
    }

    //utilizar el item
    UseItem(effect,item,player)
    {
        this.RemoveItem(item);
        if(effect===1)
        {
            item.HealLife(item.amount,player);
        }
        else if(effect===2)
        {
            item.IncreaseLifeMax(item.amount,player);
        }
        else if(effect===3)
        {
            item.ReduceAnxiety(item.amount,player);
        }
        else
        {
            item.HealCuality(item.amount,player);
        }
       
    }
}