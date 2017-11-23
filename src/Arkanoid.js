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
    this.loader = new ItemLoader()
    this.loader.loadInitialItems()
    this.mouseController = new MouseController(this, this.render.canvas, this.loader.getControllableItems())
  }

  update() {
    this.render.clearScreen()
    this.render.renderItems(this.loader.getItems())
  }
}
