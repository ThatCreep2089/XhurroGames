import Player from "../src/Player.js";
import Inventory from "../src/inventory.js";

export default class loadScene extends Phaser.Scene {
    constructor(){
        super({key: "loadScene"})
    }

    
  preload() {
    // Fondo o color de la escena de precarga
    this.cameras.main.setBackgroundColor("#000000");

    // Texto de carga
    this.loadingText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 - 50,
      "Cargando...",
      {
        font: "20px Arial",
        fill: "#ffffff",
      }
    ).setOrigin(0.5);

    // Barra de progreso
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 150, height / 2, 300, 50);

    // Listener para actualizar la barra de progreso
    this.load.on("progress", (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        width / 2 - 140,
        height / 2 + 10,
        280 * value,
        30
      );
    });

    // Evento para limpiar una vez que todo esté cargado
    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      this.loadingText.setText("¡Carga completa!");
    });

    console.log("he cargado cosas xd")

    //FONDO TENFE
    this.load.image('tenfeFondo', 'assets/fondos/tenfe.jpeg');// fondo tenfe

    //FONDOS ZONA SCENE
    this.load.image('fondo1', 'assets/fondos/fondo1.jpeg'); //fondo 1 Zona scene
    this.load.image('fondo2', 'assets/fondos/fondo2.jpeg'); //fondo 2 Zona scene
    this.load.image('fondo3', 'assets/fondos/fondo3.jpeg'); //fondo 3 Zona scene

    //PLAYER
    this.load.image('player', 'assets/npc/elle.png'); //future elle

    //IMAGENES BUILDINGS ZONA SCENE
    this.load.image('building1', 'assets/edificios/building1.png'); //clarito
    this.load.image('building2', 'assets/edificios/building2.png'); //oscuro
    this.load.image('building3', 'assets/edificios/building3.png'); //mediano
    

    //IMAGENES LOCALIZATIONS
    this.load.image('tenfe', 'assets/edificios/tenfe.png');
    this.load.image('pitiBancoLocalization', 'assets/edificios/pitiBanco.png');
    this.load.image('localization1', 'assets/edificios/parque.png');
    this.load.image('localization2', 'assets/edificios/puente.png');
    this.load.image('localization4', 'assets/edificios/cni.png');
    this.load.image('localization5', 'assets/edificios/bar.png');
    this.load.image('localization6', 'assets/edificios/hipodromo.png');
    this.load.image('localization7', 'assets/edificios/cruzRoja.png');
    this.load.image('localization8', 'assets/edificios/iglesia.png');
    
    //FLECHAS
    this.load.image('flecha', 'assets/other/flecha.png');
    this.load.image('flechaa', 'assets/other/flecha.png');

    //ASSETS NOMBRES LOCALIZATIONS
    this.load.image('caja', 'assets/other/caja.png');
    this.load.image('maps', 'assets/other/maps.png');
    this.load.json("mapJason", 'src/map.json');

  
    //FONDO STATS
    this.load.image('fondoStats', 'assets/stats/fondoStats.png'); 
    this.load.image('elleRojo', 'assets/stats/elleRojo.png'); 
    this.load.image('elleVerde', 'assets/stats/elleVerde.png'); 
    this.load.image('elleAmarillo', 'assets/stats/elleAmarillo.png'); 
    this.load.image('elleAzul', 'assets/stats/elleAzul.png'); 
   
    //MAINMENU
    this.load.image('fondo', "./assets/web media/madrizzc.jpg") //fondo
    this.load.image('titulo', "./assets/web media/titulo.png") //titulo

    //LOCALIZACION
    //FONDOS
    this.load.image('parque', 'assets/fondos/parque.jpg');
    this.load.image('puente', 'assets/fondos/puente.jpg');
    this.load.image('bar', 'assets/fondos/barFondo.jpg');
    this.load.image('cni', 'assets/fondos/cniFondo.jpg');
    this.load.image('hipodromo', 'assets/fondos/hipodromoFondo.jpg');
    this.load.image('cruzRoja', 'assets/fondos/cruzRoja.jpg');
    this.load.image('iglesia', 'assets/fondos/iglesia.jpg');
    this.load.image('pitiBanco', 'assets/fondos/pitiBanco.jpg');

    //NPCS
    this.load.image('PACO', 'assets/npc/paco.png');
    this.load.image('HUMBERTO', 'assets/npc/humberto.png');
    this.load.image('MARÍA', 'assets/npc/maria.png');
    this.load.image('NPC', 'assets/npc/npc.png');
    this.load.image('PITIBANCO', 'assets/npc/pitiBanco.png');
    this.load.image('MARÍA JOSÉ', 'assets/npc/mariaJose.png');
    this.load.image('MARÍA DEL CARMEN', 'assets/npc/mariaDelCarmen.png');
    this.load.image('ALI', 'assets/npc/ali.png');
    this.load.image('JESÚS', 'assets/npc/jesus.png');
    this.load.image('PEDRITO', 'assets/npc/pedrito.png');
    this.load.image('ÁNGEL', 'assets/npc/angel.png');
    this.load.image('JOSÉ', 'assets/npc/jose.png');
    this.load.image('MARÍA TERESA', 'assets/npc/mariaTeresa.png');
    this.load.image('CONSUELO', 'assets/npc/consuelo.png');
    this.load.image('GATO EN CAJA', 'assets/npc/gato.png');
    this.load.image('BOSS', 'assets/npc/bossBotellin.png');

    this.load.image('arrow', 'assets/other/arrow.png');
    this.load.image('accept', 'assets/other/accept.png');

     //ITEMS
    this.load.image('taza', 'assets/recolectables/taza.png');
    this.load.image('botella', 'assets/recolectables/botella.png');
    this.load.image('roca pija', 'assets/recolectables/roca pija.png');
    this.load.image('roca traviesa', 'assets/recolectables/roca traviesa.png');
    this.load.image('porro', 'assets/recolectables/porro.png');
    this.load.image('mar_iguana', 'assets/recolectables/mar_iguana.png');
    this.load.image('sanidad privada', 'assets/recolectables/privada.png');
    this.load.image('sanidad pública', 'assets/recolectables/publica.png');

    //JSON
    this.load.json("localizationJson", 'src/localization.json');
    this.load.json("contactsJson", 'src/contacts.json');
    this.load.json("dialogueJson", 'src/dialog.json')

    //INVENTORY SCENE
    this.load.image('inventory', 'assets/fondos/FondoInventario.png'); 

    //GENERAL CONTACTS
    this.load.image('fondoC', 'assets/contactos/fondoContactos.png');

    //DIALOGUE SCENE
     //NPCS
     this.load.image('ELLIE', 'assets/npc/ellie.png');

     //VIDEO
     this.load.video('iguana', 'assets/videos/iguana.mp4', true);
     
    //CONTACT SCENE
  
      //CONTACTOS(de momento tienen el mismo sprite pero en un futuro cada uno tendra el suyo)
      //ZONA BOTELLIN
      this.load.image('Consuelo', 'assets/contactos/contacto.png'); 
      this.load.image('María Teresa', 'assets/contactos/contacto.png'); 
      this.load.image('Humberto', 'assets/contactos/contacto.png'); 
      this.load.image('José', 'assets/contactos/contacto.png'); 
      this.load.image('María', 'assets/contactos/contacto.png'); 
      this.load.image('Pedrito', 'assets/contactos/contacto.png'); 
      this.load.image('Ali', 'assets/contactos/contacto.png'); 
      this.load.image('Jesús', 'assets/contactos/contacto.png'); 
      this.load.image('Paco', 'assets/contactos/contacto.png'); 
      this.load.image('Agustín', 'assets/contactos/contacto.png'); 
      this.load.image('Ángel', 'assets/contactos/contacto.png'); 
      this.load.image('María José', 'assets/contactos/contacto.png'); 
      this.load.image('María del Carmen', 'assets/contactos/contacto.png'); 

      
      
    this.player = new Player(this);
    this.Inventory = new Inventory(this);


  }

  create() {
    // Cambiar a la siguiente escena cuando todo esté listo
    this.scene.start("MainMenuScene", this.player.getConfigData()); // Cambia "MainMenuScene" por tu escena principal
  }

}