import Item, { ItemType, ItemShape } from './Item'

export default class Brick extends Item {
  constructor(position, size, color, life) {
    super(
      position,
      size,
      color,
      ItemType.BRICK,
      ItemShape.RECTANGLE,
      life,
    )
  }
}
