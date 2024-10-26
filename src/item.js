
export default class Item
{
  
constructor(name,description,effect,posx,posy)
{
this.name=name;
this.description=description;
this.effect=effect;
this.posx=posx;
this.posy=posy;

}



Use(effect,amount)
    {
        if(effect==1)
        {
            HealLife(amount);
        }
        else if(effecto==2)
        {
            IncreaseLifeMax(amount);
        }
        else if(effect==3)
        {
            ReduceAnxiety(amount);
        }
        else
        {
            HealCuality(amount);
        }
    
    }

HealLife(amount)
{
console.log("vida +"+ amount);
}

IncreaseLifeMax(amount)
{
    console.log("vidamax +"+amount);
}

ReduceAnxiety(amount)
{
    console.log("ansiedad -" +amount);
}

HealCuality(amount)
{
    console.log("cualidad +"+amount);
}

}
