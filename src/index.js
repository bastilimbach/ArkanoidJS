import '../public/app.scss'
import '../public/index.html'
import Arkanoid from './Arkanoid'
import MusicManager from './Utility/Music'

import backgroundMusic from '../public/sounds/backgroundMusic/1.wav'

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
  MusicManager.playMusic(backgroundMusic)

  const fbShareButton = document.querySelector('.facebookShare')
  const twShareButton = document.querySelector('.twitterShare')

  fbShareButton.addEventListener('click', () => {
    const facebookWindow = window.open(`https://www.facebook.com/sharer/sharer.php?u=${document.URL}`, 'facebook-popup', 'height=350,width=600')
    if (facebookWindow.focus) { facebookWindow.focus() }
    return false
  })

  twShareButton.addEventListener('click', () => {
    const level = document.querySelector('.levelCounter').innerHTML
    const tweet = `I reached level ${level} on ArkanoidJS!`
    const twitterWindow = window.open(`https://twitter.com/share?url=${document.URL};text=${tweet};hashtags=arkanoidjs`, 'twitter-popup', 'height=350,width=600')
    if (twitterWindow.focus) { twitterWindow.focus() }
    return false
  })

  const soundVolumeSlider = document.querySelector('.soundVolume')
  const musicVolumeSlider = document.querySelector('.musicVolume')

  soundVolumeSlider.addEventListener('change', () => {
    MusicManager.setSoundVolume(soundVolumeSlider.value / 100)
  })

  musicVolumeSlider.addEventListener('change', () => {
    MusicManager.setMusicVolume(musicVolumeSlider.value / 100)
  })
})
