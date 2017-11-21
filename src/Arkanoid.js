import GameRender from './Render/GameRender'
import ItemLoader from './Loader/ItemLoader'

const GameState = {
  RUNNING: 'running',
}

export default class Arkanoid {
  constructor() {
    this.state = GameState.RUNNING
    this.render = new GameRender()
    this.loader = new ItemLoader()
  }

  update() {
    this.render.clearScreen()
    this.render.renderItems(this.loader.getItems())
  }
}
