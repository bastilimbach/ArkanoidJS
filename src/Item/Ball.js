import Item, { ItemType, ItemShape, MovingDirection } from './Item'
import Helper from '../Utility/Utility'

export default class Ball extends Item {
  constructor(width, color, position = null) {
    let pos = position
    if (pos === null) {
      pos = [Helper.randomIntFromInterval(0, 1000), Helper.randomIntFromInterval(0, 500)]
    }
    super(
      pos,
      [width, width],
      color,
      ItemType.BALL,
      ItemShape.CIRCLE,
    )
  }

  moveFreely() {
    const newPos = this.getNextPosition()
    this.setPosition(newPos)
  }

  reactToCollision(collision) {
    let position
    if (collision.collider.type !== ItemType.POWERUP) {
      switch (collision.direction) {
        case 'horizontal':
          this.flipHorizontalDirection()
          position = collision.calculatedCollisionPosition
          break
        case 'vertical':
          if (collision.collider.type === ItemType.PLATFORM) {
            const leftPlatformSide = (
              (collision.collider.getWidth() / 3) + collision.collider.getXPosition()
            )
            const rightPlatformSide = (
              ((collision.collider.getWidth() / 3) * 2) + collision.collider.getXPosition()
            )
            if (collision.calculatedCollisionPosition[0] <= leftPlatformSide) {
              if (this.getDirection()[0] === MovingDirection.RIGHT) {
                this.flipHorizontalDirection()
              }
            }
            if (collision.calculatedCollisionPosition[0] >= rightPlatformSide) {
              if (this.getDirection()[0] === MovingDirection.LEFT) {
                this.flipHorizontalDirection()
              }
            }
          }
          this.flipVerticalDirection()
          position = collision.calculatedCollisionPosition
          break
        default:
          throw new TypeError('Unknown collision direction.')
      }
    }

    if (collision.collider.type === ItemType.BRICK) {
      if (collision.collider.life === 1) {
        for (let i = 0; i < collision.collider.boundItems.length; i += 1) {
          if (collision.collider.boundItems[i].getItemType() === ItemType.POWERUP) {
            collision.collider.boundItems[i].releaseFromBrick()
            collision.collider.detachItem(collision.collider.boundItems[i])
            break
          }
        }
      }
      collision.collider.decreaseLife()
    }

    if (collision.collider.type === ItemType.BOUNDARY) {
      if (collision.collider.life < this.life) {
        this.setLife(0)
      }
    }

    return position
  }
}
