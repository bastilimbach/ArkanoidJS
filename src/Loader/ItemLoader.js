import { AttachmentPosition } from '../Item/Item'
import Ball from '../Item/Ball'
import Platform from '../Item/Platform'
import PlatformController from '../Controller/PlatformController'

export default class ItemLoader {
  constructor() {
    this.items = []
  }

  loadInitialItems() {
    const ball = new Ball(20, '#FF0000')
    const platform = new Platform(100, 10, '#000')
    platform.attachItem(ball, AttachmentPosition.TOP)
    console.log(platform)

    // setTimeout(() => {
    //   platform.detachItem(ball)
    // }, 3000)

    this.items = [platform]
  }

  addItem(item) {
    this.items.push(item)
  }

  getItems() {
    return this.items
  }

  getControllableItems() {
    const controllableItems = []
    controllableItems.push(new PlatformController(this.items[0]))
    return controllableItems
  }
}
