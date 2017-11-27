import Item, { MovingDirection } from './Item'
import Ball from './Ball'
import ItemLoader from '../Loader/ItemLoader'

export default class Platform extends Item {
  constructor(width, height, color) {
    super(
      [500 - (width / 2), 500 - height - 10],
      [width, height],
      color,
    )
  }

  unbindBall() {
    for (let i = 0; i < this.boundItems.length; i += 1) {
      if (this.boundItems[i] instanceof Ball) {
        const prevBoundPosition = this.boundItems[i].getPosition()
        const prevColor = this.boundItems[i].getColor()
        const prevWidth = this.boundItems[i].getWidth()
        this.detachItem(this.boundItems[i])
        const detachedBall = new Ball(prevWidth, prevColor, prevBoundPosition)
        detachedBall.setSpeed([10, 8])
        detachedBall.setDirection([MovingDirection.LEFT, MovingDirection.UP])
        ItemLoader.addItem(detachedBall)
        ItemLoader.addMovingItem(detachedBall)
      }
    }
  }
}
