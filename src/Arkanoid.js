import Player from './Player'
import GameRender from './Render/GameRender'
import ItemLoader from './Loader/ItemLoader'
import MouseController from './Controller/MouseController'
import KeyboardController from './Controller/KeyboardController'
import { ItemType } from './Item/Item'
import MusicManager from './Utility/Music'
import Helper from './Utility/Utility'

import backgroundMusic from '../public/sounds/backgroundMusic/1.wav'
import bgVideo1 from '../public/videos/background1.mp4'
import bgVideo2 from '../public/videos/background2.mp4'
import bgVideo3 from '../public/videos/background3.mp4'
import bgVideo4 from '../public/videos/background4.mp4'
import bgVideo5 from '../public/videos/background5.mp4'

export const GameState = {
  RUNNING: 'running',
  PAUSE: 'pause',
  STOPPED: 'stopped',
}

export default class Arkanoid {
  constructor() {
    this.state = GameState.RUNNING
    this.player = new Player(3)
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
    MusicManager.playMusic(backgroundMusic)
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
        this.player.decreaseLife()
        this.updateLifeCounter()
      }
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
      this.loadNextLevel()
    }
  }

  togglePause() {
    this.state = (this.state === GameState.RUNNING) ?
      GameState.PAUSE : GameState.RUNNING
  }

  loadNextLevel() {
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
    MusicManager.playMusic(backgroundMusic)
    const videos = [bgVideo1, bgVideo2, bgVideo3, bgVideo4, bgVideo5]
    const newBackgroundVideo = Helper.getRandomObjectFromArray(videos)
    document.querySelector('.backgroundVideo > video > source').src = newBackgroundVideo
    document.querySelector('.backgroundVideo > video').load()
    this.updateLevelCounter()
    this.updateLifeCounter()
  }

  gameOver() {
    this.togglePause()
    const gameOverScreen = document.querySelector('.gameOverScreen')
    gameOverScreen.className += ' show'
  }

  updateLevelCounter() {
    const el = document.querySelectorAll('.levelCounter')
    for (let i = 0; i < el.length; i += 1) {
      el[i].innerHTML = this.currentLevel
    }
  }

  updateLifeCounter() {
    const el = document.querySelector('.lifeCounter')
    el.innerHTML = this.player.getLife()
  }
}
