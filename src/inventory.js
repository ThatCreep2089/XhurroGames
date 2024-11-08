
export default class Inventory 
{
        constructor() {
            this.tam = 20; // Tamaño del inventario
            this.elems = []; // Array vacío de elems
           this.index=0;//indeice de la pos hasta donde hay elems en el array
            
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
   
        if (this.elems[pos].ejemplar > 1) {
            this.elems[pos].ejemplar--; // Decrementar la cantidad
        } 
        else {
            this.elems.splice(pos, 1); // Eliminar el item
            this.index--;
        }
        console.log("Lista actual de elementos en el inventario:");
            for (let j = 0; j < this.elems.length; j++) {
                console.log(this.elems[j].name + " (Cantidad: " + this.elems[j].ejemplar + ")");
            }
    

    }


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