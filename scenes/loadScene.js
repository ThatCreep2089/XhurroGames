/*Escena que sirve para preecargar todas las imagenes del juego */
import Player from "../src/Player.js";
import Inventory from "../src/inventory.js";

export default class loadScene extends Phaser.Scene {
    constructor(){
        super({key: "loadScene"})
    }


  preload() {
    
   // Fondo o color de la escena de precarga
   //this.load.image('imLoad', 'assets/fondos/madrizzbn.png');// fondo load
   this.load.image('imLoad', 'assets/fondos/load screen.png');// fondo load
    //this.cameras.main.setBackgroundColor("#000000");

    // Texto de carga
    this.loadingText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2.4,
      "Cargando...",
      {
        font: "100px Arial",
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
      
    
      this.add.image(0, 0, 'imLoad').setOrigin(0, 0);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        width / 2 - 140,
        height / 2 + 10,
        280 * value,
        30
      );
    });

   

   
    //FONDO TENFE
    this.load.image('tenfeFondo', 'assets/fondos/tenfe.jpeg');// fondo tenfe
    this.load.image('vagon', 'assets/other/vagon.png');

    //FONDOS ZONA SCENE
    this.load.image('fondo1', 'assets/fondos/fondo1.jpeg'); //fondo 1 Zona scene
    this.load.image('fondo2', 'assets/fondos/fondo2.jpeg'); //fondo 2 Zona scene
    this.load.image('fondo3', 'assets/fondos/fondo3.jpeg'); //fondo 3 Zona scene
    
    this.load.image('fondo4', 'assets/fondos/fondoC1.png'); //fondo 3 Zona scene
    this.load.image('fondo5', 'assets/fondos/fondoC2.png'); //fondo 3 Zona scene
    this.load.image('fondo6', 'assets/fondos/fondoC3.jpeg'); //fondo 3 Zona scene

    this.load.image('fondo7', 'assets/fondos/fondoP1.jpeg'); //fondo 3 Zona scene
    this.load.image('fondo8', 'assets/fondos/fondoP2.jpeg'); //fondo 3 Zona scene
    this.load.image('fondo9', 'assets/fondos/fondoP3.jpeg'); //fondo 3 Zona scene

    this.load.image('fondo10', 'assets/fondos/fondoN1.jpeg'); //fondo 3 Zona scene
    this.load.image('fondo11', 'assets/fondos/fondoN2.jpeg'); //fondo 3 Zona scene
    this.load.image('fondo12', 'assets/fondos/fondoN3.jpeg'); //fondo 3 Zona scene

    this.load.image('fondo13', 'assets/fondos/diputadosZona.jpg'); //fondo 3 Zona scene

    //PLAYER
    this.load.image('player', 'assets/npc/elle.png'); //future elle
    this.load.image('playerCombat', 'assets/npc/fight_elle.png');//elle combate scene sprite

    //IMAGENES BUILDINGS ZONA SCENE
    this.load.image('building1', 'assets/edificios/building1.png'); //clarito
    this.load.image('building2', 'assets/edificios/building2.png'); //oscuro
    this.load.image('building3', 'assets/edificios/building3.png'); //mediano
    

    //IMAGENES LOCALIZATIONS
    this.load.image('tenfeRojo', 'assets/edificios/tenfe.png');
    this.load.image('pitiBancoLocalization', 'assets/edificios/pitiBanco.png');
    this.load.image('localization1', 'assets/edificios/parque.png');
    this.load.image('localization2', 'assets/edificios/puente.png');
    this.load.image('localization4', 'assets/edificios/cni.png');
    this.load.image('localization5', 'assets/edificios/bar.png');
    this.load.image('localization6', 'assets/edificios/hipodromo.png');
    this.load.image('localization7', 'assets/edificios/cruzRoja.png');
    this.load.image('localization8', 'assets/edificios/iglesia.png');

    this.load.image('tenfeAmarillo', 'assets/edificios/tenfeC.png');
    this.load.image('pitiBancoAmarillo', 'assets/edificios/pitiBancoC.png');
    this.load.image('localEdifFEO', 'assets/edificios/edificioFeo.png');
    this.load.image('localPlaza', 'assets/edificios/plaza.png');
    this.load.image('localEmbajada', 'assets/edificios/embajada.png');
    this.load.image('localTenis', 'assets/edificios/tenis.png');
    this.load.image('localIglesiaPeque', 'assets/edificios/iglesiaPeque.png');
    this.load.image('localColegio', 'assets/edificios/colegio.png');
    this.load.image('localGolf', 'assets/edificios/golf.png');

    this.load.image('tenfeVerde', 'assets/edificios/tenfeP.png');
    this.load.image('pitiBancoVerde', 'assets/edificios/pitiBancoP.png');
    this.load.image('localCafeteria', 'assets/edificios/cafeteria.png');
    this.load.image('localColegioP', 'assets/edificios/colegioP.png');
    this.load.image('localCtt', 'assets/edificios/ctt.png');
    this.load.image('localPanaderia', 'assets/edificios/panaderia.png');
    this.load.image('localParking', 'assets/edificios/parking.png');
    this.load.image('localPizzeria', 'assets/edificios/pizzeria.png');
    this.load.image('localZara', 'assets/edificios/zara.png');

    this.load.image('tenfeAzul', 'assets/edificios/tenfeN.png');
    this.load.image('pitiBancoAzul', 'assets/edificios/pitiBancoN.png');
    this.load.image('localCallejon', 'assets/edificios/callejon.png');
    this.load.image('localCarcel', 'assets/edificios/carcel.png');
    this.load.image('localComisaria', 'assets/edificios/comisaria.png');
    this.load.image('localDescampado', 'assets/edificios/descampado.png');
    this.load.image('localDiscoteca', 'assets/edificios/discoteca.png');
    this.load.image('localMercadona', 'assets/edificios/mercadona.png');
    this.load.image('localPlazaN', 'assets/edificios/plazaN.png');

    this.load.image('congresoLocalization', 'assets/edificios/congreso.png');
    
    //FLECHAS
    this.load.image('flecha', 'assets/other/flecha.png');
    this.load.image('flechaa', 'assets/other/flecha.png');
    this.load.image('flechaC', 'assets/other/flechaC.png');
    this.load.image('flechaP', 'assets/other/flechaP.png');
    this.load.image('flechaN', 'assets/other/flechaN.png');
    this.load.image('flechaM', 'assets/other/flechaMorada.png');
    this.load.image('flechaR', 'assets/other/flechaRotada.png');

    //ASSETS NOMBRES LOCALIZATIONS
    this.load.image('caja', 'assets/other/caja.png');
    this.load.image('maps', 'assets/other/maps.png');
    this.load.json("mapJason", 'src/map.json');

    this.load.image('cajaAmarillo', 'assets/other/cajaC.png');
    this.load.image('mapsAmarillo', 'assets/other/mapsC.png');

    this.load.image('cajaVerde', 'assets/other/cajaP.png');
    this.load.image('mapsVerde', 'assets/other/mapsP.png');

    this.load.image('cajaAzul', 'assets/other/cajaN.png');
    this.load.image('mapsAzul', 'assets/other/mapsN.png');

  
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

    this.load.image('edifFeo', 'assets/fondos/edifFeoFondo.jpg');
    this.load.image('plaza', 'assets/fondos/plazaFondo.jpg');
    this.load.image('embajada', 'assets/fondos/embajadaFondo.jpg');
    this.load.image('iglesiaPeque', 'assets/fondos/iglesiaPequeFondo.jpg');
    this.load.image('tenis', 'assets/fondos/tenisFondo.jpg');
    this.load.image('colegio', 'assets/fondos/colegioFondo.jpeg');
    this.load.image('golf', 'assets/fondos/golfFondo.jpg');

    this.load.image('cafeteria', 'assets/fondos/cafeteria.jpg');
    this.load.image('colegioP', 'assets/fondos/colegioP.jpeg');
    this.load.image('ctt', 'assets/fondos/ctt.jpg');
    this.load.image('panaderia', 'assets/fondos/panaderia.jpg');
    this.load.image('pizzeria', 'assets/fondos/pizzeria.jpg');
    this.load.image('zara', 'assets/fondos/zara.jpg');
    this.load.image('parking', 'assets/fondos/parking.jpeg');

    this.load.image('mercadona', 'assets/fondos/mercadona.jpg');
    this.load.image('plazaN', 'assets/fondos/plazaN.jpg');
    this.load.image('callejon', 'assets/fondos/callejon.jpg');
    this.load.image('carcel', 'assets/fondos/carcel.jpg');
    this.load.image('comisaria', 'assets/fondos/comisaria.jpg');
    this.load.image('descampado', 'assets/fondos/descampado.jpg');
    this.load.image('discoteca', 'assets/fondos/discoteca.jpg');

    this.load.image('congreso', 'assets/fondos/congresoFondo.jpg');
    

    //NPCS
    this.load.image('PACO', 'assets/npc/paco.png');
    this.load.image('HUMBERTO', 'assets/npc/humberto.png');
    this.load.image('MARÍA', 'assets/npc/maria.png');
    this.load.image('PITIBANCO ROJO', 'assets/npc/pitiBanco.png');
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
    this.load.image('COPAS', 'assets/npc/bossBotellin.png');
    this.load.image('YUSOA', 'assets/npc/yusoa.png');

    this.load.image('KAREN', 'assets/npc/karen.png');
    this.load.image('GREGORIO', 'assets/npc/gregorio.png');
    this.load.image('CAYETANA', 'assets/npc/cayetana.png');
    this.load.image('ADELINA', 'assets/npc/adelina.png');
    this.load.image('ALADIN', 'assets/npc/aladin.png');
    this.load.image('PELAYO', 'assets/npc/pelayo.png');

    this.load.image('HILARIO', 'assets/npc/hilario.png');
    this.load.image('JULIANA', 'assets/npc/juliana.png');
    this.load.image('MANOLO', 'assets/npc/manolo.png');
    this.load.image('MIHAI', 'assets/npc/mihai.png');
    this.load.image('NICOLETA', 'assets/npc/nicoleta.png');
    this.load.image('SUSANA', 'assets/npc/susana.png');

    this.load.image('JESSICA', 'assets/npc/jessica.png');
    this.load.image('JUANJO', 'assets/npc/juanjo.png');
    this.load.image('KOKE', 'assets/npc/koke.png');
    this.load.image('TONI', 'assets/npc/toni.png');
    this.load.image('VALENTINO', 'assets/npc/valentino.png');
    this.load.image('YONK', 'assets/npc/yonki.png');

    this.load.image('PITIBANCO AMARILLO', 'assets/npc/pitiBancoC.png');
    this.load.image('PITIBANCO AZUL', 'assets/npc/pitiBancoN.png');
    this.load.image('PITIBANCO VERDE', 'assets/npc/pitiBancoP.png');

    this.load.image('GATO EN CAJA AMARILLO', 'assets/npc/gatoC.png');
    this.load.image('GATO EN CAJA VERDE', 'assets/npc/gatoP.png');
    this.load.image('GATO EN CAJA AZUL', 'assets/npc/gatoN.png');


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
    this.load.image('inventory', 'assets/fondos/fondoInventario.png'); 

    //GENERAL CONTACTS
    this.load.image('fondoC', 'assets/contactos/fondoContactos.png');

    //DIALOGUE SCENE
     //NPCS
     this.load.image('ELLIE', 'assets/npc/ellie.png');


     //COMBATE
     this.load.image('cartaBotellin', 'assets/combate/botellin.png');
     this.load.image('cartaCalderilla', 'assets/combate/calderilla.png');
     this.load.image('cartaNavajas', 'assets/combate/navajas.jpg');
     this.load.image('cartaPorras', 'assets/combate/porras.jpg');
     this.load.image('cartaNormal', 'assets/combate/normal.jpg');
     this.load.image('botonDamageTotal', 'assets/combate/total.png');


     this.load.image('cartaAfecto', 'assets/combate/afecto.jpg');
     this.load.image('cartaAgnosticismo', 'assets/combate/agnosticismo.jpg');
     this.load.image('cartaTrabajoDuro', 'assets/combate/trabajoduro.jpg');
     this.load.image('cartaHumildad', 'assets/combate/humildad.jpg');

     this.load.image('fondoCombate', 'assets/combate/fondocombate.png');
     this.load.image('infoButton', 'assets/combate/infobutton.png');

     //VIDEO

     this.load.video('intro', 'assets/videos/manifestacion.mp4', false);
     this.load.video('resumen', 'assets/videos/resumen.mp4', false);
     this.load.video('victoria', 'assets/videos/victoria.mp4', false);

     //SOUND
     this.load.audio('zoneMusic', 'assets/videos/zoneMusic.mp3');
     this.load.audio('combatMusic', 'assets/videos/combat.mp3');
     this.load.audio('avisoMetro', 'assets/videos/Sonido_ Aviso Metro Madrid Parada.mp3');
     
    //CONTACT SCENE
  
      //CONTACTOS
      //ZONA BOTELLIN
      this.load.image('Consuelo', 'assets/contactos/consuelo.png'); 
      this.load.image('María Teresa', 'assets/contactos/mariaTeresa.png'); 
      this.load.image('Humberto', 'assets/contactos/humberto.png'); 
      this.load.image('José', 'assets/contactos/jose.png'); 
      this.load.image('María', 'assets/contactos/maria.png'); 
      this.load.image('Pedrito', 'assets/contactos/pedrito.png'); 
      this.load.image('Ali', 'assets/contactos/ali.png'); 
      this.load.image('Jesús', 'assets/contactos/jesus.png'); 
      this.load.image('Paco', 'assets/contactos/paco.png'); 
      this.load.image('Ángel', 'assets/contactos/angel.png'); 
      this.load.image('María José', 'assets/contactos/mariaJose.png'); 
      this.load.image('María del Carmen', 'assets/contactos/mariaDelCarmen.png'); 

     
        //ZONA PORRAS
      this.load.image('Nicoleta', 'assets/contactos/nicoleta.png'); 
      this.load.image('Juliana', 'assets/contactos/juliana.png'); 
      this.load.image('Mihai', 'assets/contactos/mihai.png'); 
      this.load.image('Susana', 'assets/contactos/susana.png'); 
      this.load.image('Hilario', 'assets/contactos/hilario.png'); 
      this.load.image('Manolo', 'assets/contactos/manolo.png');
       
       //ZONA CALDERILLA
       this.load.image('Gregorio', 'assets/contactos/gregorio.png');
       this.load.image('Aladin', 'assets/contactos/aladin.png');
       this.load.image('Pelayo', 'assets/contactos/pelayo.png');
       this.load.image('Karen', 'assets/contactos/karen.png');
       this.load.image('Cayetana', 'assets/contactos/cayetana.png');
       this.load.image('Adelina', 'assets/contactos/adelina.png');

      //ZONA NAVAJAS
      this.load.image('Jessica', 'assets/contactos/jessica.png');
      this.load.image('Koke', 'assets/contactos/koke.png');
      this.load.image('Valentino', 'assets/contactos/valentino.png');
      this.load.image('Yonk', 'assets/contactos/yonk.png');
      this.load.image('Toni', 'assets/contactos/toni.png');
      this.load.image('Juanjo', 'assets/contactos/juanjo.png');


      this.load.image('trozo', 'assets/recolectables/constitucion1.png'); 
      
      //COMBATE
      this.load.image('copas', "./assets/npc/bossBotellin.png") //enemigo
      this.load.image('yusoa', "./assets/npc/yusoa.png") //enemigo
      this.load.image('combat', "./assets/fondos/combate.jpg") //fondo
      //this.load.image('playerCombat', "./assets/stats/elle2.png") //player

    this.player = new Player(this);
    this.Inventory = new Inventory(this);

 // Evento para limpiar una vez que todo esté cargado
 this.load.on("complete", () => {
  progressBar.destroy();
  progressBox.destroy();
  this.loadingText.setText("¡Carga completa!");
});
  }

  create() {
    
    //Pintamos un fondo
    var back = this.add.image(0, 0, 'imLoad').setOrigin(0, 0);

    //escalar el fondo
    var scaleX = this.cameras.main.width / back.width;
    var scaleY = this.cameras.main.height / back.height;
    
    var scale = Math.min(scaleX, scaleY);
    
    back.setScale(scale);
    
    back.setPosition(
        this.cameras.main.width / 2 - back.displayWidth / 2,
        this.cameras.main.height / 2 - back.displayHeight / 2
    );
    
    // Cambiar a la siguiente escena cuando todo esté listo
    this.scene.start("MainMenuScene", this.player.getConfigData()); // Cambia "MainMenuScene" por escena principal
  }

}