# Arquitectura del Proyecto Yusoa es ley

El proyecto `Yusoa es ley` es un juego desarrollado con Phaser. La arquitectura del proyecto está organizada en varias escenas y objetos que interactúan entre sí para proporcionar la funcionalidad del juego.


## 1. Escenas del Juego

- **MainMenuScene**: Esta escena muestra el menú principal del juego.
  - Métodos: `preload()`, `create()`

- **LoadScene**: Esta escena se encarga de cargar todos los recursos del juego, como imágenes, sonidos, etc.
  - Métodos: `init()`, `preload()`, `create()`

- **CombatScene**: Esta es la escena principal de combate donde se lleva a cabo el combate del juego.
  - Métodos: `init()`, `create()`, `enemyDamageAnim()`, `playerDamageAnim()`, `changeTurns()`, `updateCombatStatus()`, `playerMakesDamage()`, `playerTurn()`, `cualidades()`, `enemyTurn()`, `generateCards()`, `updateHealthTexts()`, `updateCardsTexts()`, `updateTotalText()`, `checkGameOver()`, `changeCualidadesVisibility()`, `changeActiveButtons()`, `createText()`, `createButton()`, `setEntities()`, `createAttackButtons()`, `createStadisticsButtons()`, `createOtherText()`

- **EndCombatScene**: Esta escena se muestra al finalizar un combate, indicando si el jugador ganó o perdió.
  - Métodos: `init()`, `create()`

- **DialogueScene**: Esta escena maneja los diálogos entre el jugador y los NPCs.
  - Métodos: `preload()`, `init()`, `create()`, `addDialogue()`, `addButtonToScene()`, `addRecompensa()`, `fumarPorroAnsiedad()`, `fumarPorroVida()`, `mostrarCombate()`, `addItemToScene()`, `Pick()`, `update()`

- **InventoryScene**: Esta escena muestra el inventario del jugador.
  - Métodos: `init()`, `create()`, `Remove()`, `UseItem()`, `RenderizarItems()`

- **GeneralContactsScene**: Esta escena permite al jugador ver los contactos conocidos de todos los barrios.
  - Métodos: `init()`, `create()`

- **ContactScene**: Esta escena muestra los contactos en un barrio específico.
  - Métodos: `init()`, `create()`, `addContactToScene()`

- **LocalizationScene**: Esta escena maneja la interacción del jugador en diferentes localizaciones en el mapa.
  - Métodos: `init()`, `preload()`, `create()`, `addNPCToScene()`, `addItemToScene()`, `update()`, `acceptButton()`, `Pick()`, `requisitosGato()`, `mostrarPestana()`

- **StatsScene**: Esta escena muestra las estadísticas del jugador.
  - Métodos: `init()`, `create()`

- **TenfeScene**: Esta escena maneja la interacción del jugador con el sistema de Tenfe.
  - Métodos: `preload()`, `init()`, `create()`, `update()`, `createButton()`

- **EndGameScene**: Esta escena se muestra al finalizar el juego.
  - Métodos: `preload()`, `create()`

## 2. Clases Principales

- **Player**: Representa al jugador en el juego.
  - Atributos: `health`, `mana`, `humildad`, `trabajoDuro`, `agnosticismo`, `afecto`, `ansiedad`, `maxHealth`, `maxMana`, `maxAnsiedad`
  - Métodos: `init()`, `getConfigData()`, `HealPlayer()`, `MaxLife()`, `LessAnxiety()`, `IncreaseAnxiety()`, `HealQuality()`, `attackEnemy()`, `manaPerdido()`, `takeDamage()`, `preUpdate()`, `isInteractingPressed()`, `changeMove()`, `getCualidad()`, `mejorarCualidad()`

- **Enemy**: Representa a un enemigo en el juego.
  - Atributos: `health`, `weakness`
  - Métodos: `takeDamage()`, `attackPlayer()`, `getWeakness()`

- **Inventory**: Representa el inventario del jugador.
  - Atributos: `tam`, `elems`, `index`
  - Métodos: `init()`, `getConfigData()`, `AddItem()`, `RemoveItem()`, `logInventory()`, `GetItems()`, `GetTrozos()`

- **Item**: Representa un ítem en el juego.
  - Atributos: `name`, `description`, `effect`, `amount`
  - Métodos: `HealLife()`, `IncreaseLifeMax()`, `ReduceAnxiety()`, `HealCuality()`

- **Localization**: Representa una localización en el mapa.
  - Atributos: `scenario`
  - Métodos: `constructor()`

- **Flecha**: Representa una flecha en el juego.
  - Métodos: `updateCollider()`, `setScale()`

- **Box**: Representa un edificio en el juego.
  - Métodos: `constructor()`

- **DialogText**: Maneja los cuadros de diálogo en el juego.
  - Métodos: `constructor()`, `init()`, `toggleWindow()`, `setText()`, `_getGameWidth()`, `_getGameHeight()`, `_calculateWindowDimensions()`, `_createInnerWindow()`, `_createOuterWindow()`, `_createWindow()`, `_createSkipButton()`, `_skipDialog()`, `_animateText()`, `_setText()`, `_setAuthor()`, `startDialog()`, `_showCurrentLine()`, `nextLine()`, `_playVideo()`

## 3. Archivos de Configuración

- **map.json**: Contiene la configuración del mapa del juego.
  - Atributos: `botellin`

- **dialog.json**: Contiene los diálogos de los NPCs.

- **contacts.json**: Contiene la información de los contactos en diferentes barrios.
