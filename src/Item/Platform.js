import Item, { ItemType } from './Item'

export default class Platform extends Item {
  constructor(width, height, color) {
    super(
      [500 - (width / 2), 500 - height],
      [width, height],
      color,
      ItemType.RECTANGLE,
    )
  }
}
