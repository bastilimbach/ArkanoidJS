export const ItemType = {
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
}

export default class Item {
  constructor(position, size, color, type = ItemType.RECTANGLE) {
    this.position = position
    this.size = size
    this.color = color
    this.type = type
  }

  getXPosition() {
    return this.position[0]
  }

  getYPosition() {
    return this.position[1]
  }

  getWidth() {
    return this.size[0]
  }

  getHeight() {
    return this.size[1]
  }

  getColor() {
    return this.color
  }
}
