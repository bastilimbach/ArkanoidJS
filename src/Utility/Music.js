class MusicManager {
  constructor() {
    this.sound = new Audio()
    this.music = new Audio()
    this.soundVolume = 1
    this.musicVolume = 1
  }

  playSound(path) {
    this.sound = new Audio(path)
    this.sound.currentTime = 0
    this.sound.volume = this.soundVolume
    this.sound.play()
  }

  playMusic(path) {
    // const fadeOutMusic = setInterval(() => {
    //   this.music.volume -= 0.1
    //   if (this.music.volume <= 0.0) {
    //     clearInterval(fadeOutMusic)
    //   }
    // }, fadeDuration / 2)

    this.music = new Audio(path)
    this.music.currentTime = 0
    this.music.volume = 0
    this.music.play()

    // const fadeInMusic = setInterval(() => {
    //   this.music.volume += 0.1
    //   if (this.music.volume >= this.musicVolume) {
    //     clearInterval(fadeInMusic)
    //   }
    // }, fadeDuration / 2)
  }

  setSoundVolume(volume) {
    this.soundVolume = volume
  }

  setMusicVolume(volume) {
    this.musicVolume = volume
  }
}

export default new MusicManager()
