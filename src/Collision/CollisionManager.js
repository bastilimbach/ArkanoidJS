class CollisionManager {
  constructor() {
    this.observableItems = []
  }

  addObservableItem(item) {
    this.observableItems.push(item)
  }

  removeObservableItemAtIndex(index) {
    this.observableItems.splice(index, 1)
  }

  collisionAt(nextPosition) {
    for (let i = 0; i < this.observableItems.length; i += 1) {
      const e = this.observableItems[i]
      if (
        (
          nextPosition[0] >= e.getXPosition() - 20 - 1 &&
          nextPosition[0] <= e.getXPosition() + e.getWidth() + 20 + 1
        ) && (
          nextPosition[1] >= e.getYPosition() &&
          nextPosition[1] <= e.getYPosition() + e.getHeight()
        )
      ) {
        return {
          direction: 'horizontal',
          collider: e,
        }
      }

      if (
        (
          nextPosition[1] >= e.getYPosition() - 20 &&
          nextPosition[1] <= e.getYPosition() + e.getHeight() + 20
        ) && (
          nextPosition[0] >= e.getXPosition() - 20 &&
          nextPosition[0] <= e.getXPosition() + e.getWidth() + 20
        )
      ) {
        return {
          direction: 'vertical',
          collider: e,
        }
      }
    }
    return null
  }
}

export default new CollisionManager()
