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
}
