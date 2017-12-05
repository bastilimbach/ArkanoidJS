class Player {
  constructor(life) {
    this.life = life
  }

  decreaseLife() {
    this.life -= 1
  }

  increaseLife() {
    this.life += 1
  }

  getLife() {
    return this.life
  }
}

export default new Player(3)
