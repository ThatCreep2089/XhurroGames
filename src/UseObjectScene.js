export default class ItemScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "ItemScene"});
    }


    init(){

    }

    preload()//cargar imagenes*
    {
this.load.image()
    }

    create(){ //instanciar cosas
        
    }

    update(){
        
    }

    Pick(item)
    {
        
        item.remove();
    }
    
}