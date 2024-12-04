
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
        this.ejemplar=1;//cauntos ejemplares del mismo elem hay

}



//curar vida
HealLife(num,player)
{
player.HealPlayer(num);
console.log("vida +"+ this.amount+num);
}

//incrementar vida max
IncreaseLifeMax(num,player)
{
    player.MaxLife(amount)
    console.log("vidamax +"+this.amount+num);
}

//reducir ansiedad
ReduceAnxiety(num,player)
{
    player.LessAnxiety(amount)
    console.log("ansiedad -" +this.amount+num);
}

//cuara ptos cualidad
HealCuality(num,player)
{
    player.HealQuality(amount)
    console.log("cualidad +"+this.amount+num);
}

}
