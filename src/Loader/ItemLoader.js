import Item, { AttachmentPosition } from '../Item/Item'
import Ball from '../Item/Ball'
import Platform from '../Item/Platform'
import PlatformController from '../Controller/PlatformController'
import Brick from '../Item/Brick'
import Helper from '../Utility/Utility'
import CollisionManager from '../Collision/CollisionManager'

class ItemLoader {
  constructor() {
    this.items = []
    this.controllableItems = []
    this.movingItems = []
  }

  loadInitialItems() {
    const ball = new Ball(20, 'yellow')
    const platform = new Platform(100, 10, '#000')
    platform.attachItem(ball, AttachmentPosition.TOP)
    this.items = [platform]
    CollisionManager.addObservableItem(platform)
  }

  loadLevel() {
    const offset = 10
    let offsetX = offset
    let offsetY = offset
    const margin = 3
    const bricksInRow = 12
    const canvasWidth = 1000
    const brickWidth = (canvasWidth / bricksInRow).toFixed() - margin - (bricksInRow / offsetX)
    const brickHeight = 40
    const brickAmount = 20

    for (let i = 0; i < brickAmount; i += 1) {
      const levelBrick = new Brick(
        [offsetX, offsetY],
        [brickWidth, brickHeight],
        'red',
        Helper.randomIntFromInterval(1, 1),
      )
      this.items.push(levelBrick)
      CollisionManager.addObservableItem(levelBrick)
      if (offsetX + brickWidth > canvasWidth - brickWidth) {
        offsetX = offset
        offsetY = offsetY + brickHeight + margin
      } else {
        offsetX = offsetX + brickWidth + margin
      }
    }

    this._loadLevelBoundaries()
  }

  _loadLevelBoundaries() {
    const canvasWidth = 1000
    const canvasHeight = 500
    const boundariesWidth = 5
    const top = new Item([0, 0], [canvasWidth, boundariesWidth], 'blue')
    const right = new Item([canvasWidth - boundariesWidth, 0], [boundariesWidth, canvasHeight], 'blue')
    const bottom = new Item([0, canvasHeight - boundariesWidth], [canvasWidth, boundariesWidth], 'blue')
    const left = new Item([0, 0], [boundariesWidth, canvasWidth], 'blue')
    this.items.push(top, right, bottom, left)
    CollisionManager.addObservableItem(top)
    CollisionManager.addObservableItem(right)
    CollisionManager.addObservableItem(bottom)
    CollisionManager.addObservableItem(left)
  }

  addItem(item) {
    this.items.push(item)
  }

  addMovingItem(item) {
    this.movingItems.push(item)
  }

  getMovingItems() {
    return this.movingItems
  }

  getItems() {
    // TODO check item life and remove on 0
    this._purgeDeadItems()
    return this.items
  }

  getControllableItems() {
    this.controllableItems.push(new PlatformController(this.items[0]))
    return this.controllableItems
  }

  _purgeDeadItems() {
    for (let i = 0; i < this.items.length; i += 1) {
      if (this.items[i].life === 0) {
        this.items.splice(i, 1)
        CollisionManager.removeObservableItemAtIndex(i)
        break
      }
    }
  }
}

export default new ItemLoader()
