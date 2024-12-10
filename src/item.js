
export default class Item extends Phaser.GameObjects.Image
{
  
constructor(scene,name,description,effect,posx,posy,amount)
{
    super(scene,posx,posy,name);
        this.amount = amount; // cantodad del efecto, pej si cuar 3 ese 3 que se 
        this.name=name; //nombre elem
        this.description=description;//que hace el objeto
        this.effect=effect;//tipo efecto(si es para reducir ansiedad...)
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


//curar vida
HealLife(num,player)
{
player.HealPlayer(num);

}

//incrementar vida max
IncreaseLifeMax(num,player)
{
    player.MaxLife(num)
   
}

//reducir ansiedad
ReduceAnxiety(num,player)
{
    player.LessAnxiety(num)
   
}

//cuara ptos cualidad
HealCuality(num,player)
{
    player.HealQuality(num)
    
}

}
