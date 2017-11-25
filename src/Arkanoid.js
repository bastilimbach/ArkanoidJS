import GameRender from './Render/GameRender'
import ItemLoader from './Loader/ItemLoader'
import MouseController from './Controller/MouseController'

const GameState = {
  RUNNING: 'running',
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
  }

  update() {
    this._moveItems()
    this.render.clearScreen()
    this.render.renderItems(ItemLoader.getItems())
  }

  _moveItems() {
    this.movingItems = ItemLoader.getMovingItems()
    for (let i = 0; i < this.movingItems.length; i += 1) {
      this.movingItems[i].moveFreely()
    }
  }
}
