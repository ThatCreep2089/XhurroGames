import PickScene from "./PickScene.js";
/*
import Maingame from './escenas/maingame.js';
import Title from './escenas/title.js';
import Gameover from './escenas/gameover.js'
/**
 * Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 * Doc: https://newdocs.phaser.io/docs/3.86.0/Phaser.Types.Core.GameConfig
 */
let config = {
    type: Phaser.AUTO,
    //parent: 'juego', //ID del elemento del DOM en el que se anidará el Canvas que genere Phaser, si no, por defecto, irá al final del body
    // type: Phaser.CANVAS,
    // canvas: document.getElementById("juego"), //Le dice a Phaser que use un canvas concreto ya creado en el DOM
    width:  656,
    height: 376,
    pixelArt: true,
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
    scene: [PickScene], //Aquí metemos todas las escenas que tendrá nuestro juego (su clase, luego cambiaremos de una a otra mediante el id)
    physics: {  
        default: 'arcade', //Tenemos físicas simple, arcade
        arcade: { 
            gravity: { y: 200 }, //Tenemos gravedad, podemos modificarla para aumentar su fuera o disminuirla
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
    parent: "individo 6" //para meter game en la web en la parte de individuo 6
};

/*
    Instanciamos Phaser con la configuración deseada, Phaser se encargará de lanzar la primera escena del array de escenas
*/
new Phaser.Game(config); 