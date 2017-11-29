import Item, { AttachmentPosition, ItemType, ItemShape } from '../Item/Item'
import Ball from '../Item/Ball'
import Platform from '../Item/Platform'
import PlatformController from '../Controller/PlatformController'
import CollisionManager from '../Collision/CollisionManager'
import LevelLoader from './LevelLoader'

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
    const difficulty = LevelLoader.getLevelDifficulty(1)
    const levelBricks = LevelLoader.getProceduralLevelBricks(difficulty)
    for (let i = 0; i < levelBricks.length; i += 1) {
      this.items.push(levelBricks[i])
      CollisionManager.addObservableItem(levelBricks[i])
    }
    this._loadLevelBoundaries()
  }

  _loadLevelBoundaries() {
    const canvasWidth = 1000
    const canvasHeight = 500
    const boundariesWidth = 5
    const top = new Item([0, 0], [canvasWidth, boundariesWidth], 'blue')
    const right = new Item([canvasWidth - boundariesWidth, 0], [boundariesWidth, canvasHeight], 'blue')
    const bottom = new Item([0, canvasHeight - boundariesWidth], [canvasWidth, boundariesWidth], 'blue', ItemType.BRICK, ItemShape.RECTANGLE, -2)
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

    for (let i = 0; i < this.movingItems.length; i += 1) {
      if (this.movingItems[i].life === 0) {
        this.movingItems.splice(i, 1)
        break
      }
    }

    for (let i = 0; i < this.controllableItems.length; i += 1) {
      if (this.controllableItems[i].life === 0) {
        this.controllableItems.splice(i, 1)
        break
      }
    }
  }
}

export default new ItemLoader()
