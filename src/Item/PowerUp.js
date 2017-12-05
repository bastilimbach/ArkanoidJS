import Item, { ItemType, ItemShape, MovingDirection } from './Item'
import Helper from '../Utility/Utility'
import ItemLoader from '../Loader/ItemLoader'
import Player from '../Player'

export const PowerUpType = {
  INCREASE_SIZE: 'increaseSize',
  DECREASE_SIZE: 'decreaseSize',
  INCREASE_MOVING_ITEMS_SIZE: 'increaseSizeOfMovingItems',
  DECREASE_MOVING_ITEMS_SIZE: 'decreaseSizeOfMovingItems',
  INCREASE_SPEED: 'increaseSpeed',
  DECREASE_SPEED: 'decreaseSpeed',
  INCREASE_PLAYER_LIFE: 'increasePlayerLife',
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
    const prevPower = this.powerUp
    const detachedPowerUp = new PowerUp(
      prevWidth,
      prevColor,
      prevPower,
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
        console.log('Increase size')
        if (item.getWidth() < 300) {
          item.increaseWidth(20)
        }
        break
      case PowerUpType.DECREASE_SIZE:
        console.log('Decrease size')
        if (item.getWidth() > 50) {
          item.decreaseWidth(20)
        }
        break
      case PowerUpType.INCREASE_SPEED: {
        console.log('Increase speed')
        const movingItems = ItemLoader.getMovingItems()
        for (let i = 0; i < movingItems.length; i += 1) {
          if (movingItems[i].getSpeed()[0] < 10 && movingItems[i].getSpeed()[1] < 10) {
            movingItems[i].increaseSpeed(3)
          }
        }
        break
      }
      case PowerUpType.DECREASE_SPEED: {
        console.log('Decrease speed')
        const movingItems = ItemLoader.getMovingItems()
        for (let i = 0; i < movingItems.length; i += 1) {
          if (movingItems[i].getSpeed()[0] > 4 && movingItems[i].getSpeed()[1] < 4) {
            movingItems[i].decreaseSpeed(3)
          }
        }
        break
      }
      case PowerUpType.INCREASE_MOVING_ITEMS_SIZE: {
        console.log('Increase ball size')
        const movingItems = ItemLoader.getMovingItems()
        for (let i = 0; i < movingItems.length; i += 1) {
          if (movingItems[i].getWidth() < 50) {
            movingItems[i].increaseSize([10, 10])
          }
        }
        break
      }
      case PowerUpType.DECREASE_MOVING_ITEMS_SIZE: {
        console.log('Decrease ball size')
        const movingItems = ItemLoader.getMovingItems()
        for (let i = 0; i < movingItems.length; i += 1) {
          if (movingItems[i].getWidth() > 10) {
            movingItems[i].decreaseSize([10, 10])
          }
        }
        break
      }
      case PowerUpType.INCREASE_PLAYER_LIFE:
        Player.increaseLife()
        break
      default:
        break
    }
  }
}
