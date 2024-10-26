 import Item from "./item.js";
class Inventario
{
        constructor() {
            this.elems = new Array (tam); //Array vacio de elems
            this.tam = 20;  //tamaño inventario
            item.amount=0;//cantidad de items que hay con el mismo nombre
            
        }
   
    //Añadir item

    AddItem(item)
    {
        //mirar si ya tengo ese item lo añado al slot aumentando la cantidad
        var i=0;
        var encontrado=false;
        while(i<tam &&!encontrado)
        {
             if(this.elems[i].item.name==item.name)//aumentamos el contador para aumentar la cantidad de elementos de ese tipo
            {
                console.log("nuvevo array"+erase)
                item.amount++;
            }
        }
        if(!encontrado)//primera vez que metemos un item de ese tipo en el inventario
        {
            //Añadir item
            this.elems.push(item);
       
            console.log("lista actual"+this.elems);
    }
        }
        
  
    RemoveItem(item)
    {
        let pos = elems.indexOf(item); //encontar indice del array
        numElem = 1;//numero elems a eliminar
        let erase = item.splice(pos, numElemen);//eliminar
        console.log("lista actual"+this.elems);
    }



}