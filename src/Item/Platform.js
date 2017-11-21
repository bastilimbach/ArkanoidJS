import Item, { ItemType } from './Item'
import Helper from '../Utility/Utility'

export default class Platform extends Item {
  constructor(width, height, color) {
    super(
      [Helper.randomIntFromInterval(0, 1000), Helper.randomIntFromInterval(0, 500)],
      [width, height],
      color,
      ItemType.RECTANGLE,
    )
  }
}
