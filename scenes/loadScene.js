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
    // Aquí se cargan los recursos del juego
    //this.load.image("logo", "assets/logo.png"); // Ejemplo
    //this.load.spritesheet("player", "assets/player.png", {
      //frameWidth: 32,
      //frameHeight: 48,
    //});
    //this.load.audio("theme", "assets/theme.mp3");
    this.player = new Player(this);
    this.Inventory = new Inventory(this);


  }

  create() {
    // Cambiar a la siguiente escena cuando todo esté listo
    this.scene.start("MainMenuScene", this.player.getConfigData()); // Cambia "MainMenuScene" por tu escena principal
  }

}