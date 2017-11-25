import Item, { ItemType } from './Item'
import Helper from '../Utility/Utility'

export default class Ball extends Item {
  constructor(width, color) {
    super(
      [Helper.randomIntFromInterval(0, 1000), Helper.randomIntFromInterval(0, 500)],
      [width, width],
      color,
      ItemType.CIRCLE,
    )
  }

  moveFreely() {
    const newX = this.getXPosition() + 3
    const newY = this.getYPosition() - 1
    this.setPosition([newX, newY])
  }
}
