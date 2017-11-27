import Item, { ItemType } from './Item'
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
      ItemType.CIRCLE,
    )
  }

  moveFreely() {
    const newPos = this.getNextPosition()
    this.setPosition(newPos)
  }
}
