import Item, { MovingDirection, ItemType, AttachmentPosition } from './Item'
import Ball from './Ball'
import ItemLoader from '../Loader/ItemLoader'
import Helper from '../Utility/Utility'

export default class Platform extends Item {
  constructor(width, height, color) {
    super(
      [500 - (width / 2), 500 - height - 10],
      [width, height],
      color,
      ItemType.PLATFORM,
    )
  }

  bindBall() {
    const newBall = new Ball(20, '#DB162F')
    this.attachItem(newBall, AttachmentPosition.TOP)
  }

  unbindBall() {
    for (let i = 0; i < this.boundItems.length; i += 1) {
      if (this.boundItems[i] instanceof Ball) {
        const prevBoundPosition = this.boundItems[i].getPosition()
        const prevColor = this.boundItems[i].getColor()
        const prevWidth = this.boundItems[i].getWidth()
        this.detachItem(this.boundItems[i])
        const detachedBall = new Ball(prevWidth, prevColor, prevBoundPosition)
        const xDirections = [MovingDirection.LEFT, MovingDirection.RIGHT]
        const randomXDirection = xDirections[Math.floor(Math.random() * xDirections.length)]
        const randomSpeed = () => Helper.randomIntFromInterval(4, 8)
        detachedBall.setSpeed([0, randomSpeed()])
        detachedBall.setDirection([randomXDirection, MovingDirection.UP])
        ItemLoader.addItem(detachedBall)
        ItemLoader.addMovingItem(detachedBall)
      }
    }
  }
}
