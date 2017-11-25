import MovementController from './MovementController'

export default class PlatformController extends MovementController {
  constructor(platform) {
    super(platform)
    this.platform = platform
  }

  move(newPosition) {
    super.move([newPosition[0], null])
  }

  handleClick() {
    this.platform.unbindBall()
  }
}
