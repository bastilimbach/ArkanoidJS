import Helper from '../Utility/Utility'

export const ItemType = {
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
}

export const AttachmentPosition = {
  TOP: 'attachTop',
  RIGHT: 'attachRight',
  BOTTOM: 'attachBottom',
  LEFT: 'attachLeft',
  CENTER: 'attachCenter',
}

export default class Item {
  constructor(position, size, color, type = ItemType.RECTANGLE) {
    this.id = Helper.createGuid()
    this.position = position
    this.size = size
    this.color = color
    this.type = type
    this.boundItems = []
    this.attachmentPosition = null
  }

  attachItem(item, position = AttachmentPosition.CENTER) {
    item.setAttachmentPosition(position)
    this.boundItems.push(item)
    this.setPosition(this.position)
    // const parentItemCenter = this.getCenterPosition()
    // switch (position) {
    //   case AttachmentPosition.CENTER:
    //     item.setPosition(parentItemCenter)
    //     break
    //   case AttachmentPosition.TOP:
    //     item.setPosition([
    //       parentItemCenter[0],
    //       this.position[1] - (item.getHeight() / 2),
    //     ])
    //     break
    //   case AttachmentPosition.RIGHT:
    //     throw new ReferenceError('This attachment position isn\'t implemented yet.')
    //   case AttachmentPosition.BOTTOM:
    //     // item.setPosition([
    //     //   parentItemCenter[0],
    //     //   this.position[1],
    //     // ])
    //     // break
    //     throw new ReferenceError('This attachment position isn\'t implemented yet.')
    //   case AttachmentPosition.LEFT:
    //     throw new ReferenceError('This attachment position isn\'t implemented yet.')
    //   default:
    //     throw new TypeError('Couldn\'t attach Item: Unknown attachment position.')
    // }
  }

  detachItem(item) {
    for (let i = 0; i < this.boundItems.length; i += 1) {
      if (item.id === this.boundItems[i].id) {
        this.boundItems.splice(i, 1)
        break
      }
    }
  }

  setPosition(newPosition) {
    for (let i = 0; i < this.boundItems.length; i += 1) {
      const calculatedPos = this.calculateAttachmentPosition(this.boundItems[i])
      this.boundItems[i].setPosition(calculatedPos)
    }
    this.position = newPosition
  }

  setAttachmentPosition(newPosition) {
    this.attachmentPosition = newPosition
  }

  getXPosition() {
    return this.position[0]
  }

  getYPosition() {
    return this.position[1]
  }

  getCenterPosition() {
    return [
      this.position[0] + (this.size[0] / 2),
      this.position[1] + (this.size[1] / 2),
    ]
  }

  getWidth() {
    return this.size[0]
  }

  getHeight() {
    return this.size[1]
  }

  getColor() {
    return this.color
  }

  calculateAttachmentPosition(attachment) {
    const parentItemCenter = this.getCenterPosition()
    switch (attachment.attachmentPosition) {
      case AttachmentPosition.CENTER:
        return parentItemCenter
      case AttachmentPosition.TOP:
        return [parentItemCenter[0], this.position[1] - (attachment.getHeight() / 2)]
      case AttachmentPosition.RIGHT:
        return new ReferenceError('This attachment position isn\'t implemented yet.')
      case AttachmentPosition.BOTTOM:
        return new ReferenceError('This attachment position isn\'t implemented yet.')
      case AttachmentPosition.LEFT:
        return new ReferenceError('This attachment position isn\'t implemented yet.')
      default:
        return new TypeError('Couldn\'t attach Item: Unknown attachment position.')
    }
  }
}
