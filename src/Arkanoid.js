import GameRender from './Render/GameRender'
import ItemLoader from './Loader/ItemLoader'
import MouseController from './Controller/MouseController'
import KeyboardController from './Controller/KeyboardController'

export const GameState = {
  RUNNING: 'running',
  PAUSE: 'pause',
}

export default class Arkanoid {
  constructor() {
    this.state = GameState.RUNNING
    this.render = new GameRender()
    ItemLoader.loadInitialItems()
    ItemLoader.loadLevel()
    this.movingItems = ItemLoader.getMovingItems()
    this.mouseController = new MouseController(
      this,
      this.render.canvas,
      ItemLoader.getControllableItems(),
    )
    this.keyboardController = new KeyboardController(this)
  }

  update() {
    if (this.state === GameState.RUNNING) {
      this._moveItems()
    }
    this.render.clearScreen()
    this.render.renderItems(ItemLoader.getItems())
  }

  _moveItems() {
    this.movingItems = ItemLoader.getMovingItems()
    for (let i = 0; i < this.movingItems.length; i += 1) {
      this.movingItems[i].moveFreely()
    }
  }

  togglePause() {
    this.state = (this.state === GameState.RUNNING) ?
      GameState.PAUSE : GameState.RUNNING
  }
}
