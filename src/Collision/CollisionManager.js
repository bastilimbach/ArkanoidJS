import { MovingDirection } from '../Item/Item'

class CollisionManager {
  constructor() {
    this.observableItems = []
  }

  addObservableItem(item) {
    this.observableItems.push(item)
  }

  removeObservableItemWithID(itemID) {
    for (let i = 0; i < this.observableItems.length; i += 1) {
      if (this.observableItems[i].id === itemID) {
        this.observableItems.splice(i, 1)
      }
    }
  }

  removeObservableItemAtIndex(index) {
    this.observableItems.splice(index, 1)
  }

  getObservableItems() {
    return this.observableItems
  }

  collisionAt(nextPosition, item) {
    const collision = {
      direction: '',
      collider: '',
      calculatedCollisionPosition: [],
    }

    for (let i = 0; i < this.observableItems.length; i += 1) {
      const e = this.observableItems[i]
      if (
        (
          nextPosition[0] >= e.getXPosition() - (item.getWidth() / 2) &&
          nextPosition[0] <= e.getXPosition() + e.getWidth() + (item.getWidth() / 2)
        ) && (
          nextPosition[1] >= e.getYPosition() &&
          nextPosition[1] <= e.getYPosition() + e.getHeight()
        )
      ) {
        collision.direction = 'horizontal'
        collision.collider = e
        if (item.getDirection()[0] === MovingDirection.LEFT) {
          collision.calculatedCollisionPosition = [
            e.getXPosition() + e.getWidth() + (item.getWidth() / 2),
            nextPosition[1],
          ]
        } else if (item.getDirection()[0] === MovingDirection.RIGHT) {
          collision.calculatedCollisionPosition = [
            e.getXPosition() - (item.getWidth() / 2),
            nextPosition[1],
          ]
        }
        return collision
      }

      if (
        (
          nextPosition[1] >= e.getYPosition() - (item.getWidth() / 2) &&
          nextPosition[1] <= e.getYPosition() + e.getHeight() + (item.getWidth() / 2)
        ) && (
          nextPosition[0] >= e.getXPosition() - (item.getWidth() / 2) &&
          nextPosition[0] <= e.getXPosition() + e.getWidth() + (item.getWidth() / 2)
        )
      ) {
        collision.direction = 'vertical'
        collision.collider = e
        if (item.getDirection()[1] === MovingDirection.UP) {
          collision.calculatedCollisionPosition = [
            nextPosition[0],
            e.getYPosition() + e.getHeight() + (item.getHeight() / 2),
          ]
        } else if (item.getDirection()[1] === MovingDirection.DOWN) {
          collision.calculatedCollisionPosition = [
            nextPosition[0],
            e.getYPosition() - (item.getHeight() / 2),
          ]
        }
        return collision
      }
    }
    return null
  }
}

export default new CollisionManager()
