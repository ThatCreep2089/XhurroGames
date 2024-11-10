
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
player.HealPlayer(num);
console.log("vida +"+ this.amount+num);
}

IncreaseLifeMax(num,player)
{
    player.MaxLife(amount)
    console.log("vidamax +"+this.amount+num);
}

ReduceAnxiety(num,player)
{
    player.LessAnxiety(amount)
    console.log("ansiedad -" +this.amount+num);
}

HealCuality(num,player)
{
    player.HealQuality(amount)
    console.log("cualidad +"+this.amount+num);
}

}
