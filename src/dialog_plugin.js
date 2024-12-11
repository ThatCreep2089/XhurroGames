/*
 * Código extraído de https://gamedevacademy.org/create-a-dialog-modal-plugin-in-phaser-3-part-1/
 * Código extraído de https://gamedevacademy.org/create-a-dialog-modal-plugin-in-phaser-3-part-2/ 
 */

/**
 * Esta clase está pensada para crear cuadros de diálogo
 * Las funciones que empiezan por "_" no deberían llamarse nunca desde otras escenas. Pueden romer cosas.
 */
export default class DialogText extends Phaser.Events.EventEmitter{

	constructor(scene, opts){
		super();
		
		this.scene = scene;
		this.init(opts);
		
		this.dialogData = []; // Almacena las líneas de diálogo del JSON
		this.currentLineIndex = 0; // Línea actual que se está mostrando
		this.allowNextLine = false; // Controla si se puede pasar a la siguiente línea
	}

	init(opts) {
		// Mira si hay parámetros que se pasan, en caso de que no, se usan los por defecto
		if (!opts) opts = {};
		
		// set properties from opts object or use defaults
		this.borderThickness = opts.borderThickness || 3;
		this.borderColor = opts.borderColor || 0x907748;
		this.borderAlpha = opts.borderAlpha || 1;
		this.windowAlpha = opts.windowAlpha || 0.8;
		this.windowColor = opts.windowColor || 0x303030;
		this.windowHeight = opts.windowHeight || 150;
		this.padding = opts.padding || 32;
		this.closeBtnColor = opts.closeBtnColor || 'darkgoldenrod';
		this.dialogSpeed = opts.dialogSpeed || 3;
		this.fontSize = opts.fontSize || 24
		this.fontFamily = opts.fontFamily || undefined
		
		// se usa para animar el texto
		this.eventCounter = 0;
		
		// si la ventana de diálogo se muestra
		this.visible = true;
		
		// texto que hay en la ventana
		this.text;
		
		// texto que se renderizará en la ventana
		this.dialog;
		this.graphics;
		this.closeBtn;
		
		//Crea la ventana de dialogo
		this._createWindow();
	}

	// Método que cierra y abre la ventana de diálogo
	toggleWindow() {
		this.visible = !this.visible;
		if (this.text) 
			this.text.visible = this.visible;
		if (this.graphics) 
			this.graphics.visible = this.visible;
		if (this.closeBtn) 
			this.closeBtn.visible = this.visible;
	}

	// con esta función se nos permite añadir texto a la ventana
	// Este método se llamara desde la escena que corresponda
	setText(text, animate) {
		//el parametro animate nos permite saber si el texto sera animado o no
		this.eventCounter = 0;
		
		//se crea un array con cada caracter en la cadena de texto y se 
		// guarda en la propiedad diálogo
		this.dialog = text.split('');

		//se mira si hay otro evento de tiempo corriendo y lo elimina
		if (this.timedEvent) 
			this.timedEvent.remove();

		//esta variable es un string vacio si animate es true, de otra manera es la variable text
		var tempText = animate ? '' : text;
		
		//llama al metodo que calcula la pos del texto y lo crea
		this._setText(tempText); 

		if (animate) {
			//se crea un evento temporizado
			this.timedEvent = this.scene.time.addEvent({
				//delay indica el tiempo en ms hasta que se empieza el evento      
				delay: 150 - (this.dialogSpeed * 30),
				//se llama a la funcion de animar el texto
				//Cada vez que se llama a la funcion de animar se aumenta el eventCounter
				callback: this._animateText,
				//especifica en qué scope se muestra el texto
				callbackScope: this,
				//el evento se repite
				loop: true
			});
		}
		
	}

	// Consigue el ancho del juego (en funcion del tamaño en la escena) 
	_getGameWidth() {
		return this.scene.sys.game.config.width;
	}

	// Consigue el alto del juego (en funcion del tamaño de la escena) 
	_getGameHeight() {
		return this.scene.sys.game.config.height;
	}

	// Calcula las dimensiones y pos de la ventana en funcion del tamaño de la pantalla de juego
	_calculateWindowDimensions(width, height) {
		var x = this.padding + 40;
		
		// Calcular la altura como un tercio de la pantalla
		var rectHeight = height / 3;
	
		// Centrar la ventana verticalmente
		var y = (height - rectHeight) - 40;
	
		// Calcular el ancho (puedes ajustarlo según necesites)
		var rectWidth = width - (this.padding * 4);
	
		return {
			x,
			y,
			rectWidth,
			rectHeight
		};
	}
	

	// Crea la ventana interior, donde se muestra el texto 
	_createInnerWindow(x, y, rectWidth, rectHeight) {
		//rellena con el color y alpha especificados en las propiedades
		this.graphics.fillStyle(this.windowColor, this.windowAlpha);
		
		//Se crea el rectangulo pasandole las propiedades de posicion y dimensiones
		this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
	}

	// Creates the border rectangle of the dialog window
	_createOuterWindow(x, y, rectWidth, rectHeight) {
		//Se usa para especificar el estilo de la linea exterior: grosor, color...
		this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
		
		//permite dibujar un rectangulo sin darle relleno
		this.graphics.strokeRect(x, y, rectWidth, rectHeight);
	}

	// Método que crea la ventana de diálogo
	_createWindow() {
		//Obtenemos las dimensiones del juego
		var gameHeight = this._getGameHeight();
		var gameWidth = this._getGameWidth();

		//Se calcula la dimension de la ventana de diálogo
		var dimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
		this.graphics = this.scene.add.graphics();
		
		//Se crean las ventanas interior y exterior
		this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
		this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
		
		this._createSkipButton();
		
	}

	_createSkipButton() {
		// Creamos un texto de botón que servirá para saltarse el diálogo
		this.skipButton = this.scene.add.text(this._getGameWidth() - 200, this._getGameHeight() - 100, 'Skip', {
			font: '50px Arial',
			fill: '#ffffff',
			backgroundColor: '#000000',
			padding: { x: 10, y: 5 }
		}).setOrigin(0.5);
	
		// Hacer que el botón sea interactivo
		this.skipButton.setInteractive();
	
		// Definir el comportamiento cuando el cursor pasa sobre el botón
		this.skipButton.on('pointerover', () => {
			this.skipButton.setStyle({ fill: '#ff0000' }); // Cambiar color cuando pasa el cursor
		});
	
		this.skipButton.on('pointerout', () => {
			this.skipButton.setStyle({ fill: '#ffffff' }); // Volver al color original
		});
	
		// Definir lo que pasa cuando el botón es presionado
		this.skipButton.on('pointerdown', () => {
			this._skipDialog(); // Llamar a la función para saltar el diálogo
		});
	}
	
	_skipDialog() {
		this.allowNextLine = false;
		const currentLine = this.dialogData[this.dialogData.length - 1];
		this.setText(currentLine.texto, true);
		this.emit('dialogComplete');
	}
	

	// Hace aparecer al texto lentamente en pantalla
	_animateText() {
		this.eventCounter++;
		
		//se va actualizando el texto de nuestro game object llamando a setText
		this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
		
		//Cuando eventCounter sea igual a la longitud del texto, se detiene el evento
		if (this.eventCounter === this.dialog.length) {
			this.timedEvent.remove();
			this.allowNextLine = true;
		}
	}

	// Calcula la pos del texto en la ventana
	_setText(text) {
		// Resetea el game object del texto si ya estaba seteada la propiedad del texto del plugin
		if (this.text) 
			this.text.destroy();

		var x = this.padding + 75;
		var y = this._getGameHeight() - this.windowHeight - this.padding - 100;

		//Crea un game object que sea texto
		this.text = this.scene.make.text({
			x,
			y,
			text,
			style: {
				//se obliga al texto a permanecer dentro de unos limites determinados
				wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 },
				fontSize: this.fontSize,
				fontFamily: this.fontFamily
			}
		});
	}

	_setAuthor(author) {
		if (this.authorText) this.authorText.destroy(); // Si existe, destruye el anterior
	
		const x = this.padding + 75;
		const y = this._getGameHeight() - this.windowHeight - this.padding - 190; // Más arriba del texto del diálogo
	
		this.authorText = this.scene.make.text({
			x,
			y,
			text: author,
			style: {
				fontSize: this.fontSize * 1.2, // Tamaño más pequeño que el texto principal
				fontFamily: this.fontFamily,
				color: '#FFD700' // Color dorado para diferenciar
			}
		});
	}

	startDialog(dialogData) {
		this.dialogData = dialogData; // Carga las líneas de diálogo
		this.currentLineIndex = 0; // Reinicia el índice
		this.allowNextLine = false; // Bloquea avanzar al principio
		this._showCurrentLine(); // Muestra la primera línea
	}

	_showCurrentLine() {
		if (this.currentLineIndex < this.dialogData.length) {
			const currentLine = this.dialogData[this.currentLineIndex];
			
			if (currentLine.texto) //linea de texto
			{
				this.setText(currentLine.texto, true);
				this._setAuthor(currentLine.author);
				this.allowNextLine = false;
			}
			else if (currentLine.video) //si es un video
			{
				this.allowNextLine = false;
				this._playVideo(currentLine.video);
			}
		} else {
			this.emit('dialogComplete'); // Lanza el evento al final del diálogo
		}
	}

	nextLine() {
		if (this.allowNextLine) {
			this.currentLineIndex++;
			this._showCurrentLine(); // Muestra la siguiente línea
		}
	}

	_playVideo(videoPath) {
		// Crear video
		const video = this.scene.add.video(this._getGameWidth() / 2, this._getGameHeight() / 2, videoPath);
		video.setOrigin(0.5);
		video.setVolume(1);
		video.play(); // Reproducir el video en bucle si es necesario
	
		video.setInteractive();

		video.on('pointerdown', () => {
			console.log("Video clickeado, se termina.");
			video.emit('complete'); // Emitir manualmente el evento 'complete'
		});

		// Detener el video cuando termine y continuar el diálogo
		video.on('complete', () => {
			console.log("ha terminado el video");
			video.destroy();
			this.allowNextLine = true;
			this.currentLineIndex++;
			this._showCurrentLine();
		});
	}
};