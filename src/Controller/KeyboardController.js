export default class KeyboardController {
  constructor(game) {
    this.game = game
    window.addEventListener('keydown', this.keydown.bind(this))
  }

  keydown(event) {
    switch (event.keyCode) {
      case 27: // ESC
      case 32: // Space
      case 80: // P
        this.game.togglePause()
        break
      default:
        break
    }
  }
}
