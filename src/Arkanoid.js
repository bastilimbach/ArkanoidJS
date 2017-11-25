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
    this.mouseController = new MouseController(
      this,
      this.render.canvas,
      ItemLoader.getControllableItems(),
    )
  }

  update() {
    this.render.clearScreen()
    this.render.renderItems(ItemLoader.getItems())
  }
}
