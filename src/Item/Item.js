import CollisionManager from '../Collision/CollisionManager'
import Helper from '../Utility/Utility'
// import ItemLoader from '../Loader/ItemLoader'

export const ItemType = {
  BALL: 'ball',
  BRICK: 'brick',
  PLATFORM: 'platform',
  POWERUP: 'powerup',
  BOUNDARY: 'boundary',
}

export const ItemShape = {
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

export const MovingDirection = {
  UP: 'movingUp',
  RIGHT: 'movingRight',
  DOWN: 'movingDown',
  LEFT: 'movingLeft',
  NONE: 'notMoving',
}

export default class Item {
  constructor(
    position,
    size,
    color,
    type = ItemType.BRICK,
    shape = ItemShape.RECTANGLE,
    life = -1,
    direction = [MovingDirection.NONE, MovingDirection.NONE],
    speed = [0, 0],
  ) {
    this.id = Helper.createGuid()
    this.position = position
    this.size = size
    this.color = color
    this.type = type
    this.shape = shape
    this.life = life
    this.direction = direction
    this.speed = speed
    this.boundItems = []
    this.attachmentPosition = null
  }

  attachItem(item, position = AttachmentPosition.CENTER) {
    item.setAttachmentPosition(position)
    this.boundItems.push(item)
    this.setPosition(this.position)
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

  getNextPosition() {
    const axisCalculation = (direction) => {
      switch (direction) {
        case MovingDirection.UP:
        case MovingDirection.LEFT:
          return (axis, speed) => axis - speed
        case MovingDirection.RIGHT:
        case MovingDirection.DOWN:
          return (axis, speed) => axis + speed
        case MovingDirection.NONE:
          return axis => axis
        default:
          throw new TypeError('Unknown moving direction.')
      }
    }

    const calculateXAxis = axisCalculation(this.direction[0])
    const calculateYAxis = axisCalculation(this.direction[1])
    let nextPosition = [
      calculateXAxis(this.position[0], this.speed[0]),
      calculateYAxis(this.position[1], this.speed[1]),
    ]
    const collision = CollisionManager.collisionAt(nextPosition, this)
    if (collision !== null) {
      console.log(collision.collider)
      nextPosition = this.reactToCollision(collision)
    }
    return nextPosition
  }

  setAttachmentPosition(newPosition) {
    this.attachmentPosition = newPosition
  }

  getAttachmentPosition() {
    return this.attachmentPosition
  }

  getItemType() {
    return this.type
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed
  }

  increaseSpeed(speed) {
    this.speed[0] += speed[0]
    this.speed[1] += speed[1]
  }

  decreaseSpeed(speed) {
    this.speed[0] -= speed[0]
    this.speed[1] -= speed[1]
  }

  getSpeed() {
    return this.speed
  }

  setDirection(newDirection) {
    this.direction = newDirection
  }

  setLife(newLife) {
    this.life = newLife
    this._setColorBasedOnItemLife()
  }

  decreaseLife() {
    if (this.life > 0) {
      this.life -= 1
      this._setColorBasedOnItemLife()
    }
  }

  _setColorBasedOnItemLife() {
    const shadedColor = Helper.getColorLuminance(this.color, -(1 / this.life))
    this.color = shadedColor
  }

  getDirection() {
    return this.direction
  }

  getPosition() {
    return this.position
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

  increaseSize(newSize) {
    this.size[0] += newSize[0]
    this.size[1] += newSize[1]
  }

  decreaseSize(newSize) {
    this.size[0] -= newSize[0]
    this.size[1] -= newSize[1]
  }

  increaseWidth(width) {
    this.size[0] += width
  }

  decreaseWidth(width) {
    this.size[0] -= width
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
        return [parentItemCenter[0], this.position[1] - (attachment.getHeight() / 2) - 10]
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

  flipHorizontalDirection() {
    this.direction[0] = (this.direction[0] === MovingDirection.LEFT) ?
      MovingDirection.RIGHT : MovingDirection.LEFT
  }

  flipVerticalDirection() {
    this.direction[1] = (this.direction[1] === MovingDirection.UP) ?
      MovingDirection.DOWN : MovingDirection.UP
  }
}
