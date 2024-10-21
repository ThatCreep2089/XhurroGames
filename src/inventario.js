class Inventario
{
        constructor(tam) {
            this.cont = new Array(tam); //Array vacio de int
            this.elems = new Array(tam); //Array vacio de elems
            this.tam = tam;  //tama�o inventario
            this.index = 0;//indice de elems
        }
    //funcion a�adir elemento

   
    agregarItem(item) { //el tipo de item es el id
        //si ya hay un elemento de ese tipo aumento el numero de el contador;
        let encontrado = false
        let i = 0;

    while (i < this.index&&!encontrado)
    {
        if (item == this.elems[i])
        {
            this.cont[i] += 1;
            encontrado = true;
            this.elems[this.cont[i]] = item;
        }
            i++;
    }
    if (!encontrado)
    {
        this.elems[index] = item;
        index++;
    }
        console.log(`Item agregado: ${item}`);
        
    }
    

    //renderizado de a�adir objetos
    mostrarInventario()
    {
        console.log("Inventario:");
        for (let i = 0; i < this.index; i++) {
            console.log(`�tem: ${this.elems[i]}, Cantidad: ${this.cont[i]}`);
        }

    }
    class Inventario
    {
            constructor(tam) {
                this.cont = new Array(tam); //Array vacio de int
                this.elems = new Array(tam); //Array vacio de elems
                this.tam = tam;  //tamaño inventario
                this.index = 0;//indice de elems
            }
        //funcion añadir elemento
    
       
       function agregarItem(item) { //el tipo de item es el id
            //si ya hay un elemento de ese tipo aumento el numero de el contador;
            let encontrado = false
            let i = 0;
    
        while (i < this.index&&!encontrado)
        {
            if (item == this.elems[i])
            {
                this.cont[i] += 1;
                encontrado = true;
                this.elems[this.cont[i]] = item;
            }
                i++;
        }
        if (!encontrado)
        {
            this.elems[index] = item;
            index++;
        }
            console.log(`Item agregado: ${item}`);
            
        }
        
    
        //renderizado de añadir objetos
        function mostrarInventario()
        {
            console.log("Inventario:");
            for (let i = 0; i < this.index; i++) {
                console.log(`Ítem: ${this.elems[i]}, Cantidad: ${this.cont[i]}`);
            }
    
        }
    
        // Array que representa el inventario del jugador
        let inventario = [
        {nombre, icono,descripcion},
        ];
    
        // Función para renderizar el inventario visualmente
        function renderInventario(inventario) {
                const contenedorInventario = document.getElementById("inventario");
        contenedorInventario.innerHTML = "";  // Limpiar el contenido anterior
    
                // Iterar sobre cada ítem del inventario y agregarlo visualmente
                inventario.forEach(item => {
                    const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        itemDiv.innerHTML = `${item.icono} <br> ${item.nombre}`;
                    contenedorInventario.appendChild(itemDiv);
                });
            }
    
            // Función para agregar un nuevo ítem al inventario
            function agregarItemAlInventario(nombre, icono, descripcion) {
                
                    // Crear el nuevo ítem y agregarlo al array del inventario
                    const nuevoItem = { nombre: nombre, icono: icono };
                    inventario.push(nuevoItem);
    
                    // Volver a renderizar el inventario para reflejar los cambios
                    renderInventario(inventario);
                
            }
    
            // Al hacer clic en el botón "Agregar al inventario"
            document.getElementById("agregarItem").addEventListener("click", function() {
                const nombre = document.getElementById("nombreItem").value;
                const icono = document.getElementById("iconoItem").value;
    
                // Llamar a la función para agregar el ítem al inventario
                agregarItemAlInventario(nombre, icono);
    
                // Limpiar los campos de entrada
                document.getElementById("nombreItem").value = "";
                document.getElementById("iconoItem").value = "";
            });
    
            // Renderizar el inventario inicial al cargar la página
            renderInventario(inventario);</script>
    
    
    
    
    
    }






}