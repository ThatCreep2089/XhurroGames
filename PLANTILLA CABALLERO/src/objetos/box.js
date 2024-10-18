export default class Box extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Box, nuestras cajas destructibles
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 * @param {Group} colliderGroup - grupo de objetos con collider
	 */
	constructor(scene, x, y, colliderGroup) {
		super(scene, x, y, 'box');
		this.setScale(0.5,.5);
		this.scene.add.existing(this); //Lo añadimos en la escena, aunque no haría falta, ya que lo vamos a añadir luego con this.scene.physics.add.existing(this)

		/*
		 * Si la animación de la caja siendo destruida se completa 
		 * creamos una nueva caja y marcamos que la actual debe desaparecer
		 */
		this.on('animationcomplete', end => {
			if (this.anims.currentAnim.key === 'hit'){
				new Box(scene, Phaser.Math.Between(50, scene.sys.game.canvas.width-100),20, colliderGroup);
				this.setActive(false).setVisible(false);
				this.toDestroy = true;
			}
		})

		// Agregamos la caja a las físicas para que Phaser lo tenga en cuenta
		this.scene.physics.add.existing(this);

		// Decimos que la caja colisiona con los límites del mundo
		this.body.setCollideWorldBounds();
		this.body.setBounce(2,2);

		colliderGroup.add(this);
	}

	/**
	 * Bucle principal de la caja, comprobamos la velocidad para reducirla y setearla a 0 en ciertos umbrales
	 * Así no se movera de manera infinita cuando la golpeemos
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		super.preUpdate(t, dt);

		//En el motor arcade no hay rozamiento, así que lo "simularemos a mano como podamos"
		if(this.body.velocity.x > 5){
			this.body.velocity.x -= 5;
		} else if(this.body.velocity.x < -5){
			this.body.velocity.x += 5;
		}

		if(this.body.velocity.x <= 5 && this.body.velocity.x > 0 || this.body.velocity.x >= -5 && this.body.velocity.x < 0){
			 this.body.velocity.x = 0;
		}

		// Si es necesario, la caja la destruimos al final del update para evitar errores
		if(this.toDestroy){
			this.scene.score++;
			this.destroy();
		}

	}

	/**
	 * Ejecutamos la animación de la caja siendo destruida
	 * Se llama desde la escena cuando se detecta la colisión con el caballero atacando
	 */
	destroyMe(){
		this.play('hit');

	}
}