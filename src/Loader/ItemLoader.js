import Ball from '../Item/Ball'
import Platform from '../Item/Platform'

export default class ItemLoader {
  constructor() {
    this.items = []
  }

  _loadInitialItems() {
    const ball = new Ball(20, '#FF0000')
    const platform = new Platform(100, 10, '#000')
    this.items = [ball, platform]
  }

  addItem(item) {
    this.items.push(item)
  }

  getItems() {
    // if (this.items.length === 0) {
    this._loadInitialItems()
    // }
    return this.items
  }
}
