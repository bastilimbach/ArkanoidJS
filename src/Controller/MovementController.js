export default class MovementController {
  constructor(item) {
    this.item = item
  }

  move(newPosition) {
    let x = this.item.position[0]
    let y = this.item.position[1]
    if (newPosition[0] !== null) {
      // console.log(newPosition[0])
      // if ((newPosition[0] - (this.item.getWidth() / 2)) <= 0) {
      //   x = 0
      // } else {
      //   x = newPosition[0] - (this.item.getWidth() / 2)
      // }

      // if () {

      // }
      x = newPosition[0] - (this.item.getWidth() / 2)
    }
    if (newPosition[1] !== null) {
      y = newPosition[1] - (this.item.getHeight() / 2)
    }
    this.item.setPosition([x, y])
  }
}
