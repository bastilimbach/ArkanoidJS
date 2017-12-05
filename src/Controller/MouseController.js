export default class MouseController {
  constructor(game, canvas, controllableItems) {
    this.game = game
    this.items = controllableItems
    this.canvas = canvas
    canvas.addEventListener('mousemove', this.mouseMoved.bind(this))
    canvas.addEventListener('click', this.mouseClicked.bind(this))
  }

  mouseMoved(event) {
    const rect = this.canvas.getBoundingClientRect()
    const scaleX = this.canvas.width / rect.width
    const scaleY = this.canvas.height / rect.height
    const mousePosition = [
      (event.clientX - rect.left) * scaleX,
      (event.clientX - rect.top) * scaleY,
    ]
    for (let i = 0; i < this.items.length; i += 1) {
      this.items[i].move(mousePosition)
    }
  }

  mouseClicked() {
    for (let i = 0; i < this.items.length; i += 1) {
      this.items[i].handleClick()
    }
  }
}
