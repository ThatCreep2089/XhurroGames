
export default class Item extends Phaser.GameObjects.Sprite
{
  
constructor(scene,name,description,effect,posx,posy,amount)
{
    super(scene,posx,posy,name);
        this.amount = amount; // elle
        this.name=name;
        this.description=description;
        this.effect=effect;
        this.scene.add.existing(this); //Añadimos item a la escena
      this.ejemplar=1;//cauntos ejemplares del mismo elem hay

}




HealLife(num,player)
{

console.log("vida +"+ this.amount+num);
}

IncreaseLifeMax()
{
    console.log("vidamax +"+this.amount+num);
}

ReduceAnxiety()
{
    console.log("ansiedad -" +this.amount+num);
}

HealCuality()
{
    console.log("cualidad +"+this.amount+num);
}

}
