import Item, { ItemType } from './Item'

export default class Brick extends Item {
  constructor(position, size, color, life) {
    super(
      position,
      size,
      color,
      ItemType.RECTANGLE,
      life,
    )
  }
}
