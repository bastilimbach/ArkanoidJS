import Item, { ItemType } from './Item'
import Ball from './Ball'
import ItemLoader from '../Loader/ItemLoader'

export default class Platform extends Item {
  constructor(width, height, color) {
    super(
      [500 - (width / 2), 500 - height - 10],
      [width, height],
      color,
      ItemType.RECTANGLE,
    )
  }

  unbindBall() {
    for (let i = 0; i < this.boundItems.length; i += 1) {
      if (this.boundItems[i] instanceof Ball) {
        const boundPosition = this.boundItems[i].getPosition()
        this.detachItem(this.boundItems[i])
        const detachedBall = new Ball(20, 'yellow')
        detachedBall.setPosition(boundPosition)
        ItemLoader.addItem(detachedBall)
        ItemLoader.addMovingItem(detachedBall)
      }
    }
  }
}
