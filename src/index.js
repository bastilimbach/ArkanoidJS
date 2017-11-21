import '../public/app.scss'
import '../public/index.html'
import Arkanoid from './Arkanoid'

document.addEventListener('DOMContentLoaded', () => {
  window.requestAnimFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) { window.setTimeout(callback, 1000 / 60) }

  const game = new Arkanoid()
  function startGameLoop() {
    game.update()
    window.requestAnimFrame(startGameLoop)
  }
  startGameLoop()
})
