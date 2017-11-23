export default class MouseController {
  constructor(game, canvas, controllableItems) {
    this.game = game
    this.items = controllableItems
    canvas.addEventListener('mousemove', this.mouseMoved.bind(this))
  }

  mouseMoved(event) {
    const mousePosition = [event.layerX, event.layerY]
    for (let i = 0; i < this.items.length; i += 1) {
      this.items[i].move(mousePosition)
    }
  }
}
