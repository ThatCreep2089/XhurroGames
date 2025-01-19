
//Esta clase sirve para crear un item con varias propiedades que se describen a continuación
export default class Item extends Phaser.GameObjects.Image
{

constructor(scene,name,description,effect,posx,posy,amount)
{
    super(scene,posx,posy,name);
        this.amount = amount; // cantidad del efecto, p ej si cura 3 de vida amount seria 3 
        this.name=name; //nombre elem
        this.description=description;//que hace el objeto p ej "cura 3 de vida"
        this.effect=effect;//tipo efecto(si es para reducir ansiedad...) en int
        scene.add.existing(this); //Añadimos item a la escena
        

}

/*EFECTO
1-CURAR VIDA
2-MAX VIDA 
3-CURAR ANSIEDAD
4-CURAR CUALIDAD

AMOUNT
TAZA=10
BOTELLA=5
PORRO=10
IGUANA=40
ROCA PIJA=10
ROCA TRAVIESA=20
PRIVADA=20
PUBLICA=10
*/



}
