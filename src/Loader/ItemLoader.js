import { AttachmentPosition } from '../Item/Item'
import Ball from '../Item/Ball'
import Platform from '../Item/Platform'
import PlatformController from '../Controller/PlatformController'
import Brick from '../Item/Brick'
import Helper from '../Utility/Utility'

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

  loadLevel() {
    const offset = 10
    let offsetX = offset
    let offsetY = offset
    const margin = 3
    const bricksInRow = 12
    const canvasWidth = 1000
    const brickWidth = (canvasWidth / bricksInRow).toFixed() - margin - (bricksInRow / offsetX)
    const brickHeight = 40
    const brickAmount = 20

    for (let i = 0; i < brickAmount; i += 1) {
      const levelBrick = new Brick(
        [offsetX, offsetY],
        [brickWidth, brickHeight],
        'red',
        Helper.randomIntFromInterval(1, 5),
      )
      this.items.push(levelBrick)
      if (offsetX + brickWidth > canvasWidth - brickWidth) {
        offsetX = offset
        offsetY = offsetY + brickHeight + margin
      } else {
        offsetX = offsetX + brickWidth + margin
      }
    }
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
