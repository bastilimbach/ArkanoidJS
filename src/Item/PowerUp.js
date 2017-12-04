import Item, { ItemType, ItemShape, MovingDirection } from './Item'
import Helper from '../Utility/Utility'
import ItemLoader from '../Loader/ItemLoader'

export const PowerUpType = {
  INCREASE_SIZE: 'increaseSize',
  INCREASE_SPEED: 'increaseSpeed',
}

export default class PowerUp extends Item {
  constructor(width, color, powerup, position = null) {
    let pos = position
    if (pos === null) {
      pos = [Helper.randomIntFromInterval(0, 1000), Helper.randomIntFromInterval(0, 500)]
    }
    super(
      pos,
      [width, width],
      color,
      ItemType.POWERUP,
      ItemShape.CIRCLE,
    )
    this.powerUp = powerup
  }

  getPowerUp() {
    return this.powerUp
  }

  setPowerUp(newPowerUp) {
    this.powerUp = newPowerUp
  }

  moveFreely() {
    const newPos = this.getNextPosition()
    this.setPosition(newPos)
  }

  releaseFromBrick() {
    const prevBoundPosition = this.position
    const prevColor = this.color
    const prevWidth = this.size[0]
    const detachedPowerUp = new PowerUp(
      prevWidth,
      prevColor,
      PowerUpType.INCREASE_SPEED,
      prevBoundPosition,
    )
    detachedPowerUp.setSpeed([0, 3])
    detachedPowerUp.setDirection([MovingDirection.NONE, MovingDirection.DOWN])
    ItemLoader.addItem(detachedPowerUp)
    ItemLoader.addMovingItem(detachedPowerUp)
  }

  reactToCollision(collision) {
    if (collision.collider.type === ItemType.PLATFORM) {
      this._applyPowerUp(collision.collider)
      this.setLife(0)
    }

    if (collision.collider.type === ItemType.BOUNDARY) {
      this.setLife(0)
    }
    return this.position
  }

  _applyPowerUp(item) {
    switch (this.powerUp) {
      case PowerUpType.INCREASE_SIZE:
        item.increaseWidth(5)
        break
      case PowerUpType.INCREASE_SPEED: {
        const movingItems = ItemLoader.getMovingItems()
        for (let i = 0; i < movingItems.length; i += 1) {
          movingItems[i].increaseSpeed(3)
        }
        break
      }
      default:
        break
    }
  }
}
