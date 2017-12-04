import Player from './Player'
import GameRender from './Render/GameRender'
import ItemLoader from './Loader/ItemLoader'
import MouseController from './Controller/MouseController'
import KeyboardController from './Controller/KeyboardController'
import { ItemType } from './Item/Item'

export const GameState = {
  RUNNING: 'running',
  PAUSE: 'pause',
  STOPPED: 'stopped',
}

export default class Arkanoid {
  constructor() {
    this.state = GameState.RUNNING
    this.player = new Player(2)
    this.currentLevel = 1
    this.render = new GameRender()
    ItemLoader.loadInitialItems()
    ItemLoader.loadLevel(this.currentLevel)
    this.items = ItemLoader.getItems()
    this.movingItems = ItemLoader.getMovingItems()
    this.mouseController = new MouseController(
      this,
      this.render.canvas,
      ItemLoader.getControllableItems(),
    )
    this.keyboardController = new KeyboardController(this)
  }

  update() {
    this.items = ItemLoader.getItems()
    if (this.state === GameState.RUNNING) {
      this._checkUserLife()
      this._checkRemainingBricks()
      this._moveItems()
    }
    this.render.clearScreen()
    this.render.renderItems(this.items)
  }

  _moveItems() {
    this.movingItems = ItemLoader.getMovingItems()
    for (let i = 0; i < this.movingItems.length; i += 1) {
      this.movingItems[i].moveFreely()
    }
  }

  _checkUserLife() {
    let allBallsDestroyed = true
    for (let i = 0; i < this.items.length; i += 1) {
      if (this.items[i].getItemType() === ItemType.BALL) {
        allBallsDestroyed = false
        break
      }
      for (let j = 0; j < this.items[i].boundItems.length; j += 1) {
        if (this.items[i].boundItems[j].getItemType() === ItemType.BALL) {
          allBallsDestroyed = false
          break
        }
      }
    }
    if (allBallsDestroyed) {
      if (this.player.getLife() <= 0) {
        this.gameOver()
      } else {
        for (let i = 0; i < this.items.length; i += 1) {
          if (this.items[i].getItemType() === ItemType.PLATFORM) {
            this.items[i].bindBall()
            break
          }
        }
      }
      this.player.decreaseLife()
    }
  }

  _checkRemainingBricks() {
    let bricksRemaining = false
    for (let i = 0; i < this.items.length; i += 1) {
      if (this.items[i].getItemType() === ItemType.BRICK) {
        bricksRemaining = true
      }
    }
    if (!bricksRemaining) {
      this.levelCleared()
    }
  }

  togglePause() {
    this.state = (this.state === GameState.RUNNING) ?
      GameState.PAUSE : GameState.RUNNING
  }

  levelCleared() {
    for (let i = 0; i < this.items.length; i += 1) {
      if (
        this.items[i].getItemType() !== ItemType.BOUNDARY &&
        this.items[i].getItemType() !== ItemType.PLATFORM
      ) {
        this.items[i].setLife(0)
      }
    }
    ItemLoader.loadLevel(this.currentLevel)
    this.player.increaseLife()
    this.currentLevel += 1
    console.log('Next level!')
  }

  gameOver() {
    this.togglePause()
    console.log('GameOver')
  }
}
