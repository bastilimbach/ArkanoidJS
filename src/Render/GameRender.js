import { ItemType } from '../Item/Item'

export default class GameRender {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    this.canvas.width = 1000
    this.canvas.height = 500
    document.getElementsByClassName('app')[0].appendChild(this.canvas)
  }

  clearScreen() {
    this.context.fillStyle = '#e3e3e3'
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  renderItems(items) {
    for (let i = 0; i < items.length; i += 1) {
      this._drawShape(items[i])
      for (let j = 0; j < items[i].boundItems.length; j += 1) {
        this._drawShape(items[i].boundItems[j])
      }
    }
  }

  _drawShape(item) {
    switch (item.type) {
      case ItemType.RECTANGLE:
        this._drawRectangle(
          item.getXPosition(),
          item.getYPosition(),
          item.getWidth(),
          item.getHeight(),
          item.getColor(),
        )
        break
      case ItemType.CIRCLE:
        this._drawCircle(
          item.getXPosition(),
          item.getYPosition(),
          item.getWidth() / 2,
          item.getColor(),
        )
        break
      default:
        throw new TypeError('Couldn\'t render Item: Unknown item type.')
    }
  }

  _drawRectangle(x, y, width, height, color) {
    this.context.beginPath()
    this.context.rect(x, y, width, height)
    this.context.fillStyle = color
    this.context.fill()
  }

  _drawCircle(x, y, radius, color, stroke = null) {
    this.context.beginPath()
    this.context.arc(x, y, radius, 0, Math.PI * 2)
    this.context.fillStyle = color
    this.context.fill()
    if (stroke !== null) {
      this.context.strokeStyle = 'black'
      this.context.lineWidth = 1
      this.context.stroke()
    }
  }
}
