//import googleMaps from "./googleMaps.js";
import loadScene from "../scenes/loadScene.js";
import MainMenuScene from "../scenes/MainMenuScene.js";
import localizationScene from "../scenes/localizationScene.js";
import ZonaScene from "../scenes/zonaScene.js";
import CombatScene from '../scenes/CombatScene.js';
import LoseScene from '../scenes/LoseScene.js';
import VictoryScene from '../scenes/VictoryScene.js';
import PickScene from '../scenes/PickScene.js';
import InventoryScene from '../scenes/InventoryScene.js';
import Player from "./Player.js";
import TenfeScene from "../scenes/tenfeScene.js";
import DialogueScene from "../scenes/dialogueScene.js";
import ContactScene from "../scenes/ContactScene.js";
import GeneralContactsScene from "../scenes/GeneralContactsScene.js";
import StatsScene from "../scenes/StatsScene.js";
/*


/**
 * Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 * Doc: https://newdocs.phaser.io/docs/3.86.0/Phaser.Types.Core.GameConfig
 */

// Define el objeto global en la parte superior del archivo principal
window.gameState = {
    playerPosition: { x: 1000, y: 330 } // Posición inicial predeterminada
};

let config = {
    type: Phaser.AUTO,
    //parent: 'juego', //ID del elemento del DOM en el que se anidará el Canvas que genere Phaser, si no, por defecto, irá al final del body
    // type: Phaser.CANVAS,
    // canvas: document.getElementById("juego"), //Le dice a Phaser que use un canvas concreto ya creado en el DOM
    width:  1920,
    height: 1080,
    //pixelArt: true,
    resolution: window.devicePixelRatio, //ajusta la resolucion
    pixelArt: false, // Desactiva el modo pixelArt
    antialias: true,  // Activa el suavizado de la imagen
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY, //Le decimos que se centre en pantalla
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		min: {
            width: 328,
            height: 188
        },
		max: {
            width: 1312,
            height: 752
        },
		zoom: 1
    },
   scene: [loadScene,MainMenuScene,ZonaScene, localizationScene, CombatScene, VictoryScene, LoseScene,InventoryScene,PickScene, TenfeScene, DialogueScene, GeneralContactsScene,ContactScene], //Aquí metemos todas las escenas que tendrá nuestro juego (su clase, luego cambiaremos de una a otra mediante el id)
    //scene: [localizationScene, ZonaScene], //debug
    //scene: [CombatScene, VictoryScene, LoseScene], //debug
   //scene :[GeneralContactsScene,ContactScene],
    physics: {  
        default: 'arcade', //Tenemos físicas simple, arcade
        arcade: { 
            fps: 60,         // Ajusta esto a 60 o más para mayor fluidez
            timeScale: 0.5,
            debug: true // Aquí indicamos si queremos que Phaser pinte los cuerpos y fuerzas de los objetos con físicas
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
    title: "Prueba de concepto",
    version: "1.0.2",
    parent: "individo 6"
};

/*
    Instanciamos Phaser con la configuración deseada, Phaser se encargará de lanzar la primera escena del array de escenas
*/
/*function startGame() {
    if (!window.game) {  // Evita inicializar varias veces
        window.game = new Phaser.Game(config);
    }
}*/
new Phaser.Game(config); 